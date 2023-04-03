from flask import Flask, request
from DBInfo import DBInfo
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from sklearn.preprocessing import MinMaxScaler


app = Flask(__name__)

# MySQL 데이터베이스 연결 설정
mydb = DBInfo.mydb()


# Flask API
@app.route('/recommendCourse/<int:course_seq>', methods=['GET'])
def recommend_course(course_seq):
    curs = mydb.cursor()
    sql = "select * from tbl_course"
    curs.execute(sql)
    result = curs.fetchall()
    mydb.close()

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
    data = request.args

    # 이거로 유사도 뽑고
    difficulty = data.get('level')
    location = data.get('si')
    time = data.get('time')


    # 입력으로 들어온 문제 정보
    difficulty = '쉬움'
    location = '서울'
    time = 30

    # 입력된 난이도를 범위 값으로 변환합니다.
    difficulty_ranges = {
        '쉬움': [1, 1.3],
        '중간': [1.3, 2.0],
        '어려움': [2.0, 3.0]
    }
    for key, value in difficulty_ranges.items():
        if value[0] <= difficulty <= value[1]:
            difficulty = key
            break

    # 데이터베이스에서 모든 문제 정보를 가져옵니다.
    conn = sqlite3.connect('problems.db')
    cur = conn.cursor()
    cur.execute("SELECT difficulty, location, time FROM problems")
    problems = cur.fetchall()
    conn.close()

    # 각 문제의 난이도, 지역, 시간 정보를 벡터로 변환합니다.
    def convert_difficulty_to_range(difficulty):
        for key, value in difficulty_ranges.items():
            if value[0] <= difficulty <= value[1]:
                return key
        return None

    vectors = []
    for problem in problems:
        problem_difficulty = convert_difficulty_to_range(problem[0])
        problem_location = problem[1]
        problem_time = problem[2]
        vectors.append(np.array([problem_difficulty, problem_location, problem_time]))

    # 입력된 문제 정보도 벡터로 변환합니다.
    new_problem = np.array([difficulty, location, time])
    new_problem[0] = convert_difficulty_to_range(new_problem[0])

    # 각 문제와 새로운 문제 간의 코사인 유사도를 계산합니다.
    similarities = []
    for i, vector in enumerate(vectors):
        if vector[1] == new_problem[1]:
            # 지역이 같을 경우, 난이도와 시간 정보만을 이용하여 유사도를 계산합니다.
            weight = np.array([1, 0, 1])
            problem_difficulty = difficulty_ranges[vector[0]]
            new_problem_difficulty = difficulty_ranges[new_problem[0]]
            vector[0] = np.mean(problem_difficulty)
            new_problem[0] = np.mean(new_problem_difficulty)
            sim = cosine_similarity(vector[[0, 2]].reshape(1, -1), new_problem[[0, 2]].reshape(1, -1))
            similarities.append((i, sim[0][0]))
        else:
            # 지역이 다를 경우, 모든 정보를 이용하여 유사도를 계산합니다.
            weight = np.array([1, 1, 1])
            sim = cosine_similarity(vector.reshape(1, -1), new_problem.reshape(1, -1))
            similarities.append((i, sim[0][0]))

    # 유사도가 가장 높은 문제의 지역 정보를 반환합니다.
    most_similar = max(similarities, key=lambda x: x[1])
    location = vectors[most_similar[0]][1]
    print
















    #유사도 뽑기
    curs = mydb.cursor()
    sql = "select c.course_seq, c.mountain_seq,  c.difficulty_mean, c.time, m.gu, m.dong  from tbl_course c left join tbl_mountain m on c.mountain_seq = m.mountain_seq"
    curs.execute(sql)
    result = curs.fetchall()
    mydb.close()

    df = pd.DataFrame(result)
    df.columns = ['course_seq', 'mountain_seq', 'difficulty_mean', 'time', 'gu', 'dong']

    features = ['difficulty_mean', 'time', 'gu','dong']
    # 정규화
    scaler = MinMaxScaler()
    df[features] = scaler.fit_transform(df[features])

    X = df[features].values

    target_trail = {feature: X[0, i] for i, feature in enumerate(features)}

    y = np.array([[target_trail[feature] for feature in features]])

    distances = euclidean_distances(X, y)

    ranked_trails = sorted(zip(df['course_seq'], distances), key=lambda x: x[1])
    recommended_trails = [trail[0] for trail in ranked_trails if trail[0] != target_trail['course_seq']][:10]

    recommended_result = {"recommended_result": recommended_trails}

    print(recommended_result)





    # 시간 기준으로 필터링


    # 집주변 필터링

    # 리스트 중에 힐링이면 유사도 제일 높은거 도전이면 유사도 낮은거 -> 하나 결과로 return


    return "성공"

if __name__ == '__main__':
    app.run(debug=True)
