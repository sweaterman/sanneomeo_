from flask import Flask, request
from DBInfo import DBInfo
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from sklearn.preprocessing import MinMaxScaler
import decimal


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
    print(userseq)

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

        ## 리뷰 데이터
        try:
            mydb = DBInfo.mydb()
            with mydb.cursor() as curs:
                # review_table에는 mountain_seq만 있어서 join 사용해 mountain_seq에 포함되어있는 course_seq 전부 가져오고 mountain_seq rate 사용
                sql = "SELECT r.user_seq, c.course_seq, r.rate FROM tbl_course c JOIN tbl_mountain m ON c.mountain_seq = m.mountain_seq JOIN tbl_review r ON m.mountain_seq = r.mountain_seq"
                curs.execute(sql)
                review_result = curs.fetchall()
                if len(review_result) > 0:
                    # review_result가 비어있지 않은 경우에만 데이터프레임을 생성
                    review_df = pd.DataFrame(review_result, columns=['user_seq', 'course_seq', 'rate'])
                else:
                    # review_result가 비어있는 경우 빈 데이터프레임을 생성
                    review_df = pd.DataFrame()
        finally:
            mydb.close();

        ## 찜 데이터
        try:
            # MySQL 데이터베이스 연결 설정
            mydb = DBInfo.mydb()
            with mydb.cursor() as curs:
                sql = "SELECT user_seq, course_seq FROM tbl_keep WHERE is_keep = 1"
                curs.execute(sql)
                keep_result = curs.fetchall()
                if len(keep_result) > 0:
                    # keep_result가 비어있지 않은 경우에만 데이터프레임을 생성
                    keep_df = pd.DataFrame(keep_result, columns=['user_seq', 'course_seq'])
                else:
                    # keep_result가 비어있는 경우 빈 데이터프레임을 생성
                    keep_df = pd.DataFrame()
        finally:
            mydb.close();

        ## 리뷰와 찜 데이터 합치기
        keep_df['rate'] = 5  # 찜한 course에 5점 부여
        collab_df = pd.concat([review_df, keep_df], ignore_index=True)

        ## 사용자별 평점 행렬 만들기
        user_rate_matrix = collab_df.pivot_table(index=['user_seq'], columns=['course_seq'], values='rate')

        ## 사용자 간 유사도 계산
        user_similarity = cosine_similarity(user_rate_matrix.fillna(0))
        user_similarity_df = pd.DataFrame(user_similarity, index=user_rate_matrix.index, columns=user_rate_matrix.index)
        print(user_similarity_df)

        if userseq in user_rate_matrix.index:

            ## 로그인한 사용자와 유사한 사용자 찾기
            top_similar_users = user_similarity_df[userseq].sort_values(ascending=False).head(6).index.tolist()
            top_similar_users = [x for x in top_similar_users if isinstance(x, str)]  # 리스트에서 문자열만 추출
            top_similar_users.remove(userseq)  # 로그인한 사용자 제거

            ## 유사한 사용자의 평점을 바탕으로 로그인한 사용자에게 추천하기
            similar_users_ratings = user_rate_matrix.loc[top_similar_users].mean()
            recommended_courses = similar_users_ratings.sort_values(ascending=False).head(10).index.tolist()

            ## 추천된 코스를 기반으로 데이터프레임 필터링
            df_collab = df[df['course_seq'].isin(recommended_courses)]

            if not df_collab.empty:
                df = df_collab

    # 지역 필터링
    location_dict = {
        "1": "서울특별시",
        "2": "인천광역시|경기도",
        "3": "강원도",
        "4": "충청남도|충청북도|대전광역시|세종특별자치시",
        "5": "전라남도|전라북도|광주광역시",
        "6": "경상남도|경상북도|울산광역시|부산광역시|대구광역시",
        "7": "제주특별자치도"
    }

    region = location_dict.get(location)
    print(location)
    print(region)
    df = df[df['si'].str.contains(region)]

    print("지역 필터링")
    print(df)

    if df.empty: return ""

    # 목적 필터링
    df['time'] = df['time'].apply(decimal.Decimal)
    df['sum'] = df['difficulty_mean'] + df['time']


    if purpose == '1' :  # 힐링
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

    print(course_seq)

    df = pd.DataFrame(result)
    df.columns = ['course_seq', 'mountain_seq', 'name', 'introduction', 'length', 'time', 'difficulty_mean',
                  'review_cnt', 'review_mean', 'slope_mean', 'altitude', 'recommend', 'best_trail']

    features = ['length', 'time', 'difficulty_mean', 'slope_mean','altitude']

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
    print(recommended_result)

    return recommended_result


# 해당 산 등산로 추천
@app.route('/mountainRecommendCourse', methods=['GET'])
def mountain_recommend_course():
    mountainIdx = request.args.get('mountainIdx')
    userseq = request.args.get('userseq')

    if userseq != '0':
        # 설문조사 결과 쿼리
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
        print("df")
        print(df)


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

        ## 리뷰 데이터
        try:
            mydb = DBInfo.mydb()
            with mydb.cursor() as curs:
                # review_table에는 mountain_seq만 있어서 join 사용해 mountain_seq에 포함되어있는 course_seq 전부 가져오고 mountain_seq rate 사용
                sql = "SELECT r.user_seq, c.course_seq, r.rate FROM tbl_course c JOIN tbl_mountain m ON c.mountain_seq = m.mountain_seq JOIN tbl_review r ON m.mountain_seq = r.mountain_seq"
                curs.execute(sql)
                review_result = curs.fetchall()
                if len(review_result) > 0:
                    # review_result가 비어있지 않은 경우에만 데이터프레임을 생성
                    review_df = pd.DataFrame(review_result, columns=['user_seq', 'course_seq', 'rate'])
                else:
                    # review_result가 비어있는 경우 빈 데이터프레임을 생성
                    review_df = pd.DataFrame()
        finally:
            mydb.close();

        ## 찜 데이터
        try:
            # MySQL 데이터베이스 연결 설정
            mydb = DBInfo.mydb()
            with mydb.cursor() as curs:
                sql = "SELECT user_seq, course_seq FROM tbl_keep WHERE is_keep = 1"
                curs.execute(sql)
                keep_result = curs.fetchall()
                if len(keep_result) > 0:
                    # keep_result가 비어있지 않은 경우에만 데이터프레임을 생성
                    keep_df = pd.DataFrame(keep_result, columns=['user_seq','course_seq'])
                else:
                    # keep_result가 비어있는 경우 빈 데이터프레임을 생성
                    keep_df = pd.DataFrame()
        finally:
            mydb.close();

        ## 리뷰와 찜 데이터 합치기
        keep_df['rate'] = 5  # 찜한 course에 5점 부여
        collab_df = pd.concat([review_df, keep_df], ignore_index=True)

        ## 사용자별 평점 행렬 만들기
        user_rate_matrix = collab_df.pivot_table(index=['user_seq'], columns=['course_seq'], values='rate')

        ## 사용자 간 유사도 계산
        user_similarity = cosine_similarity(user_rate_matrix.fillna(0))
        user_similarity_df = pd.DataFrame(user_similarity, index=user_rate_matrix.index, columns=user_rate_matrix.index)

        ## 로그인한 사용자와 유사한 사용자 찾기
        top_similar_users = user_similarity_df[userseq].sort_values(ascending=False).head(6).index.tolist()
        top_similar_users = [x for x in top_similar_users if isinstance(x, str)] # 리스트에서 문자열만 추출
        top_similar_users.remove(userseq)  # 로그인한 사용자 제거

        ## 유사한 사용자의 평점을 바탕으로 로그인한 사용자에게 추천하기
        similar_users_ratings = user_rate_matrix.loc[top_similar_users].mean()
        recommended_courses = similar_users_ratings.sort_values(ascending=False).head(10).index.tolist()

        ## 추천된 코스를 기반으로 데이터프레임 필터링
        df = df[df['course_seq'].isin(recommended_courses)]


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
    app.run(host='0.0.0.0')
