from flask import Flask, request
import pymysql
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances



app = Flask(__name__)

# MySQL 데이터베이스 연결 설정
mydb = pymysql.connect(
  # MySQL 로컬 연결 정보 입력
  host="localhost",
  port=3306,
  user="ssafy",
  password="ssafy",
  database="sanneomeo"

    # # MySQL 서버 연결 정보 입력
    # host = "13.124.170.93",
    # port = 3306,
    # user = "ssafy",
    # password = "hikers",
    # database = "sanneomeo",
    # charset = "utf8"
)

print(mydb)

curs = mydb.cursor()
sql = "select * from tbl_course"
curs.execute(sql)
result = curs.fetchall()
mydb.close()

df = pd.DataFrame(result)
df.columns = ['course_seq', 'mountain_seq', 'name', 'introduction', 'length', 'time', 'difficulty_mean', 'review_cnt', 'review_mean', 'slope_mean', 'altitude', 'recommend', 'best_trail']
print(df)

features = ['length', 'time', 'altitude']
# # 정규화
# scaler = MinMaxScaler()
# df[features] = scaler.fit_transform(df[features])

X = df[features].values
print(X)


target_trail = {'name': "북한산",'length': 5.43, 'time': 95, 'altitude': 128.4807300000}
y = np.array([[target_trail[feature] for feature in features]])
print("이거")
print(y)
distances = cosine_similarity(X, y)
#distances = euclidean_distances(X, y)

def cosine_similarity(x, y):
  dot_product = np.dot(x, y)
  norm_x = np.linalg.norm(x)
  norm_y = np.linalg.norm(y)
  similarity_score = dot_product / (norm_x * norm_y)
  return similarity_score

print(distances.shape)

ranked_trails = sorted(zip(df['name'], distances), key=lambda x: x[1])
recommended_trails = [trail[0] for trail in ranked_trails if trail[0] != target_trail['name']][:10]

print(recommended_trails)

# Flask API
@app.route('/course/recommendations/<string:course_seq>', methods=['GET'])
def recommend_course(course_seq):
    print("이거")
    print(df)
    return df['course_seq'] == course_seq

if __name__ == '__main__':
    app.run(debug=True)