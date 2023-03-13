from flask import Flask, url_for, request, jsonify

from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy import text
import pandas as df

# 팩토리 구조로 설정

engine = create_engine('mysql+mysqlconnector://root:root@localhost:3306/test?charset=utf8', encoding = 'utf-8', max_overflow = 0)


def create_app():
    app = Flask(__name__)

    @app.route('/', methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            return "test"
        else:
            return "testtest"

    @app.route('/mountain/<string:mountain_name>', methods=['GET'])
    def get_email(mountain_name):
        conn = engine.connect()
        # result = conn.execute(text("select * from tbl_mountain where name = :data"),{ "data" : mountain_name })
        result = conn.execute(text("select * from tbl_mountain"))
        print(result.all())
        return ""

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)