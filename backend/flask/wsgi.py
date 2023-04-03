from flask import Flask, request
from DBInfo import DBInfo
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from sklearn.preprocessing import MinMaxScaler


app = Flask(__name__)

# MySQL 데이터베이스 연결 설정
mydb = DBInfo.mydb()



curs = mydb.cursor()
sql = "select * from tbl_course"
curs.execute(sql)
result = curs.fetchall()
mydb.close()

df = pd.DataFrame(result)
df.columns = ['course_seq', 'mountain_seq', 'name', 'introduction', 'length', 'time', 'difficulty_mean', 'review_cnt', 'review_mean', 'slope_mean', 'altitude', 'recommend', 'best_trail']


features = ['length', 'time', 'altitude']


# 정규화
scaler = MinMaxScaler()
df[features] = scaler.fit_transform(df[features])

X = df[features].values



# Flask API
@app.route('/course/recommendations/<int:course_seq>', methods=['GET'])
def recommend_course(course_seq):

    target_trail = df[df['course_seq'] == course_seq][features].to_dict(orient='records')[0]
    target_trail['course_seq'] = course_seq;  # 북악산 나오는지 보려고 이름암거나씀

    y = np.array([[target_trail[feature] for feature in features]])

    distances = euclidean_distances(X, y)

    ranked_trails = sorted(zip(df['course_seq'], distances), key=lambda x: x[1])
    recommended_trails = [trail[0] for trail in ranked_trails if trail[0] != target_trail['course_seq']][:10]

    recommended_result = {"recommended_result" : recommended_trails}

    return recommended_result


# Flask API
@app.route('/recommendCourse/<int:course_seq>', methods=['GET'])
def recommend_course(course_seq):

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
    data = request.json
    #isLogin이 참이면
    isLogin = data.get('isLogin')
    # 이거로 유사도 뽑고
    level = data.get('level')
    region = data.get('region') # mountain 데이터로 시구동
    time = data.get('time')


    # 시간 기준으로 필터링

    # 집주변 필터링

    # 리스트 중에 힐링이면 유사도 제일 높은거 도전이면 유사도 낮은거 -> 하나 결과로 return


    return

if __name__ == '__main__':
    app.run(debug=True)

