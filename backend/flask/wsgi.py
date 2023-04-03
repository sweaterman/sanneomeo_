from flask import Flask, request
from DBInfo import DBInfo
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from sklearn.preprocessing import MinMaxScaler


app = Flask(__name__)



# Flask API
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


    # 데이터프레임 생성 및 필터링
    df = pd.DataFrame(result)
    df.columns = ['course_seq', 'mountain_seq', 'difficulty_mean', 'time', 'si']

    # 난이도 필터링
    if difficulty == 1 : #쉬움
        df = df[df['difficulty_mean'] <= 1.0]
    elif difficulty == 2: #중간
        df = df[(df['difficulty_mean'] > 1.0) & (df['difficulty_mean'] < 1.3)]
    elif difficulty == 3: #어려움
        df = df[(df['difficulty_mean'] >= 1.3) ]

    # 지역 필터링
    df = df[df['si'].str.contains(location)]

    # 시간 필터링
    if time == 1: # 30분 미만
        df = df[df['time'] < 30]
    elif time == 2: # 30분 이상 1시간 미만
        df = df[(df['time'] >= 30 ) & (df['time'] < 60)]
    elif time == 3: # 1시간 이상 2시간 미만
        df = df[(df['time'] >= 60) & (df['time'] < 120)]
    elif time == 4: # 2시간 이상 3시간 미만
        df = df[(df['time'] >= 120) & (df['time'] < 180)]
    elif time == 5: # 3시간 이상
        df = df[(df['time'] >= 180) ]

    # 목적 필터링
    df['sum'] = df['difficulty_mean'] + df['time']
    if purpose == 1: #힐링
        result_course_seq = df.loc[df['sum'].astype(int).idxmin()]
    elif purpose == 2: #도전
        result_course_seq = df.loc[df['sum'].astype(int).idxmax()]


    return str(result_course_seq['course_seq'])

if __name__ == '__main__':
    app.run(debug=True)