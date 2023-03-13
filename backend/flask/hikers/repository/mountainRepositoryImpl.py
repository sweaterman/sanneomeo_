
from typing import List

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from hikers.config.source import connection_data
from hikers.domain import mountain
from hikers.repository.mountainRepository import Repository
from hikers.table import tbl_mountain


class Repo(Repository):
    def __init__(self) -> None:
        connection_string = "{}://{}:{}@{}:{}/{}?charset=utf8mb4".format(
            connection_data["database"],connection_data["user"], connection_data["password"], connection_data["host"], connection_data["port"], connection_data["dbname"]
        )
        self.engine = create_engine(connection_string)
        tbl_mountain.Base.metadata.bind = self.engine

    def _create_room_objects(self, results: List[tbl_mountain.Mountain]) -> List[mountain.Mountain]:
        return [
            mountain.Mountain(mountain_seq=q.mountain_seq,latitude=q.latitude,longitude=q.longitude,altitude=q.altitude,si=q.si,gu=q.gu,dong=q.dong,name=q.name,img=q.img,introduction=q.introduction,difficulty=q.difficulty)
            for q in results
        ]

    def list(self, filters: dict = None) -> List[mountain.Mountain]:
        DBSession = sessionmaker(bind=self.engine)

        session = DBSession()
        query = session.query(tbl_mountain.Mountain)
        if filters is None:
            return self._create_room_objects(query.all())
        if "mountainSeq" in filters:
            query = query.filter(tbl_mountain.Mountain.mountain_seq == filters["mountainSeq"])
        if "name" in filters:
            query = query.filter(tbl_mountain.Mountain.name == filters["name"])
        if "difficulty" in filters:
            query = query.filter(tbl_mountain.Mountain.difficulty == filters["difficulty"])
        if "si" in filters:
            query = query.filter(tbl_mountain.Mountain.si == filters["si"])
        if "gu" in filters:
            query = query.filter(tbl_mountain.Mountain.gu == filters["gu"])
        if "dong" in filters:
            query = query.filter(tbl_mountain.Mountain.dong == filters["dong"])
        return self._create_room_objects(query.all())

