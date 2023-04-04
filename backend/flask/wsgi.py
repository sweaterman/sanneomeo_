from flask import Flask, request
from DBInfo import DBInfo
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from sklearn.preprocessing import MinMaxScaler


app = Flask(__name__)


# 설문 기반 필터링, 협업 필터링으로 등산로 한개 추출
@app.route('/targetCourse', methods=['GET'])
def target_course():

    try:
        # MySQL 데이터베이스 연결 설정
        mydb = DBInfo.mydb()
        with mydb.cursor() as curs:
            sql = "select c.course_seq , c.mountain_seq, c.difficulty_mean, c.time, m.si from tbl_course c left join tbl_mountain m on c.mountain_seq = m.mountain_seq"
            curs.execute(sql)
            result = curs.fetchall()
    finally:
        mydb.close();
        

    difficulty = request.args.get('level')
    location = request.args.get('region')
    purpose = request.args.get('purpose')
    time = request.args.get('time')
    userseq = request.args.get('userseq')


    # 데이터프레임 생성 및 필터링
    df = pd.DataFrame(result)
    df.columns = ['course_seq', 'mountain_seq', 'difficulty_mean', 'time', 'si']

    # 난이도 필터링
    if difficulty == '1' : #쉬움
        df = df[df['difficulty_mean'] <= 1.0]
    elif difficulty == '2': #중간
        df = df[(df['difficulty_mean'] > 1.0) & (df['difficulty_mean'] < 1.3)]
    elif difficulty == '3': #어려움
        df = df[(df['difficulty_mean'] >= 1.3)]
        
    print("난이도 필터링")
    print(df)

    # 지역 필터링
    df = df[df['si'].str.contains(location)]

    print("지역 필터링")
    print(df)

    # 시간 필터링
    if time == '1': # 30분 미만
        df = df[df['time'] < 30]
    elif time == '2': # 30분 이상 1시간 미만
        df = df[(df['time'] >= 30 ) & (df['time'] < 60)]
    elif time == '3': # 1시간 이상 2시간 미만
        df = df[(df['time'] >= 60) & (df['time'] < 120)]
    elif time == '4': # 2시간 이상 3시간 미만
        df = df[(df['time'] >= 120) & (df['time'] < 180)]
    elif time == '5': # 3시간 이상
        df = df[(df['time'] >= 180) ]

    print("시간 필터링")
    print(df)

    #협업 필터링
    if userseq != '0':

        # 리뷰 리스트 기반 협업 필터링
        try:
            # MySQL 데이터베이스 연결 설정
            mydb = DBInfo.mydb()
            with mydb.cursor() as curs:
                sql = f'SELECT c.course_seq, r.rate FROM tbl_course c JOIN tbl_mountain m ON c.mountain_seq = m.mountain_seq JOIN tbl_review r ON m.mountain_seq = r.mountain_seq WHERE r.user_seq = {userseq}'
                curs.execute(sql)
                review_result = curs.fetchall()
                if len(review_result) > 0:
                    # keep_result가 비어있지 않은 경우에만 데이터프레임을 생성
                    review_df = pd.DataFrame(review_result, columns=['course_seq', 'rate'])
                else:
                    # keep_result가 비어있는 경우 빈 데이터프레임을 생성
                    review_df = pd.DataFrame()
        finally:
            mydb.close();


        # 찜 리스트 기반 협업 필터링
        try:
            # MySQL 데이터베이스 연결 설정
            mydb = DBInfo.mydb()
            with mydb.cursor() as curs:
                sql = f'SELECT course_seq FROM tbl_keep WHERE user_seq = {userseq} AND is_keep = 1'
                curs.execute(sql)
                keep_result = curs.fetchall()
                if len(keep_result) > 0:
                    # keep_result가 비어있지 않은 경우에만 데이터프레임을 생성
                    keep_df = pd.DataFrame(keep_result, columns=['course_seq'])
                else:
                    # keep_result가 비어있는 경우 빈 데이터프레임을 생성
                    keep_df = pd.DataFrame()
        finally:
            mydb.close();

        if len(review_df) != 0 and len(keep_df) != 0:
            # 리뷰 리스트와 찜 리스트를 합친 데이터프레임 생성
            collab_df = pd.concat([review_df, keep_df], ignore_index=True)

            # 협업 필터링을 위한 pivot table 생성
            pivot_table = collab_df.pivot_table(index=['course_seq'], aggfunc='mean')
            pivot_table.columns = ['collaborative_rate']

            # 데이터프레임에 협업 필터링 결과를 추가
            df = df.join(pivot_table, on='course_seq', how='left')

            # 협업 필터링 결과에 따라 추천 결과 필터링
            if 'collaborative_rate' in df.columns:
                df = df[(df['collaborative_rate'] > 4.0) | (df['collaborative_rate'].isna())]

        print("협업필터링 결과")
        print(df)



    # 목적 필터링
    df['sum'] = df['difficulty_mean'] + df['time']

    if purpose == '1':  # 힐링
        result_course_seq = df.loc[df['sum'].astype(int).idxmin()]

    elif purpose == '2':  # 도전
        result_course_seq = df.loc[df['sum'].astype(int).idxmax()]

    print("목적 필터링")
    print(df)

    return str(result_course_seq['course_seq'])

# target 등산로와 비슷한 등산로 list 10개 추출 : 컨텐츠 기반 추천
@app.route('/recommendCourse/<int:course_seq>', methods=['GET'])
def recommend_course(course_seq):
    try:
        # MySQL 데이터베이스 연결 설정
        mydb = DBInfo.mydb()
        with mydb.cursor() as curs:
            sql = "select * from tbl_course"
            curs.execute(sql)
            result = curs.fetchall()
    finally:
        mydb.close();


    df = pd.DataFrame(result)
    df.columns = ['course_seq', 'mountain_seq', 'name', 'introduction', 'length', 'time', 'difficulty_mean',
                  'review_cnt', 'review_mean', 'slope_mean', 'altitude', 'recommend', 'best_trail']

    features = ['length', 'time', 'altitude']

    # 정규화
    scaler = MinMaxScaler()
    df[features] = scaler.fit_transform(df[features])

    X = df[features].values


    target_trail = df[df['course_seq'] == course_seq][features].to_dict(orient='records')[0]
    target_trail['course_seq'] = course_seq;  # 북악산 나오는지 보려고 이름암거나씀

    y = np.array([[target_trail[feature] for feature in features]])

    distances = euclidean_distances(X, y)

    ranked_trails = sorted(zip(df['course_seq'], distances), key=lambda x: x[1])
    recommended_trails = [trail[0] for trail in ranked_trails if trail[0] != target_trail['course_seq']][:10]

    recommended_result = {"recommended_result" : recommended_trails}

    return recommended_result


# 해당 산 등산로 추천
@app.route('/mountainRecommendCourse', methods=['GET'])
def mountain_recommend_course():
    mountainIdx = request.args.get('mountainIdx')
    userseq = request.args.get('userseq')

    if userseq != '0':
        try:
            # MySQL 데이터베이스 연결 설정
            mydb = DBInfo.mydb()
            with mydb.cursor() as curs:
                sql =f"SELECT difficulty, purpose, prefer_climb_duration FROM sanneomeo.tbl_user where user_seq = {userseq}"
                curs.execute(sql)
                result = curs.fetchall()

        finally:
            mydb.close();



        # 설문조사 결과
        data = pd.DataFrame(result)
        data.columns = ['difficulty', 'purpose', 'prefer_climb_duration']

        difficulty = data.loc[0, 'difficulty']
        purpose = data.loc[0, 'purpose']
        time = data.loc[0, 'prefer_climb_duration']


        try:
            # MySQL 데이터베이스 연결 설정
            mydb = DBInfo.mydb()
            with mydb.cursor() as curs:
                sql = f"select c.course_seq , c.difficulty_mean, c.time from tbl_course c left join tbl_mountain m on c.mountain_seq = m.mountain_seq where c.mountain_seq = {mountainIdx}"
                curs.execute(sql)
                result = curs.fetchall()
        finally:
            mydb.close();

        df = pd.DataFrame(result)
        df.columns = ['course_seq', 'difficulty_mean', 'time']

        # 난이도 필터링
        if difficulty == 1:  # 쉬움
            df = df[df['difficulty_mean'] <= 1.0]
        elif difficulty == 2:  # 중간
            df = df[(df['difficulty_mean'] > 1.0) & (df['difficulty_mean'] < 1.3)]
        elif difficulty == 3:  # 어려움
            df = df[(df['difficulty_mean'] >= 1.3)]

        print("난이도 필터링")
        print(df)

        # 시간 필터링
        if time == 1:  # 30분 미만
            df = df[df['time'] < 30]
        elif time == 2:  # 30분 이상 1시간 미만
            df = df[(df['time'] >= 30) & (df['time'] < 60)]
        elif time == 3:  # 1시간 이상 2시간 미만
            df = df[(df['time'] >= 60) & (df['time'] < 120)]
        elif time == 4:  # 2시간 이상 3시간 미만
            df = df[(df['time'] >= 120) & (df['time'] < 180)]
        elif time == 5:  # 3시간 이상
            df = df[(df['time'] >= 180)]

        print("시간 필터링")
        print(df)

        # 협업 필터링
        # 리뷰 리스트 기반 협업 필터링
        try:
            # MySQL 데이터베이스 연결 설정
            mydb = DBInfo.mydb()
            with mydb.cursor() as curs:
                sql = f'SELECT c.course_seq, r.rate FROM tbl_course c JOIN tbl_mountain m ON c.mountain_seq = m.mountain_seq JOIN tbl_review r ON m.mountain_seq = r.mountain_seq WHERE r.user_seq = {userseq}'
                curs.execute(sql)
                review_result = curs.fetchall()
                if len(review_result) > 0:
                    # keep_result가 비어있지 않은 경우에만 데이터프레임을 생성
                    review_df = pd.DataFrame(review_result, columns=['course_seq', 'rate'])
                else:
                    # keep_result가 비어있는 경우 빈 데이터프레임을 생성
                    review_df = pd.DataFrame()
        finally:
            mydb.close();


        # 찜 리스트 기반 협업 필터링
        try:
            # MySQL 데이터베이스 연결 설정
            mydb = DBInfo.mydb()
            with mydb.cursor() as curs:
                sql = f'SELECT course_seq FROM tbl_keep WHERE user_seq = {userseq} AND is_keep = 1'
                curs.execute(sql)
                keep_result = curs.fetchall()
                if len(keep_result) > 0:
                    # keep_result가 비어있지 않은 경우에만 데이터프레임을 생성
                    keep_df = pd.DataFrame(keep_result, columns=['course_seq'])
                else:
                    # keep_result가 비어있는 경우 빈 데이터프레임을 생성
                    keep_df = pd.DataFrame()
        finally:
            mydb.close();


        if len(review_df) != 0 and len(keep_df) != 0 :
            # 리뷰 리스트와 찜 리스트를 합친 데이터프레임 생성
            collab_df = pd.concat([review_df, keep_df], ignore_index=True)

            # 협업 필터링을 위한 pivot table 생성
            pivot_table = collab_df.pivot_table(index=['course_seq'], aggfunc='mean')
            pivot_table.columns = ['collaborative_rate']

            # 데이터프레임에 협업 필터링 결과를 추가
            df = df.join(pivot_table, on='course_seq', how='left')
            print(df)

            # 협업 필터링 결과에 따라 추천 결과 필터링
            if 'collaborative_rate' in df.columns:
                df = df[((df['collaborative_rate'].isna()) | (df['collaborative_rate'].fillna(0.0) == 0.0)) | (df['collaborative_rate'] >= 4.0)]



            print("협업필터링 결과")
            print(df)

        # 목적 필터링
        df['sum'] = df['difficulty_mean'] + df['time']

        if purpose == 1:  # 힐링
            # 'sum' 열을 기준으로 오름차순 정렬
            df_sorted = df.sort_values(by='sum')
            # 'sum' 열 값이 작은 2개의 행 선택
            df = df_sorted.head(2)

        elif purpose == 2:  # 도전
            # 'sum' 열을 기준으로 내림차순 정렬
            df_sorted = df.sort_values(by='sum', ascending=False)
            # 'sum' 열 값이 큰 2개의 행 선택
            df = df_sorted.head(2)

        print("목적 필터링")
        print(df)

        seq_list = df['course_seq'].tolist()
        return {'course_seq_list': seq_list}
    else:
        return {'course_seq_list': []}

if __name__ == '__main__':
    app.run(debug=True)