import pymysql

def mydb():
    return pymysql.connect(
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