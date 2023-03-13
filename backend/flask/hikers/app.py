from flask import Flask

from hikers.controller import mountain
from hikers.settings import DevConfig


def create_app(config_object=DevConfig):
    app = Flask(__name__)
    app.config.from_object(config_object)
    app.register_blueprint(mountain.blueprint)

    return app
