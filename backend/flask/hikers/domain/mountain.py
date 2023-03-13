class Mountain:
    def __init__(self, mountain_seq: str, latitude: float, longitude: float, altitude: float, si: str, gu: str, dong: str, name: str, img: str, introduction: str, difficulty: str):
        self.mountain_seq = mountain_seq
        self.latitude = latitude
        self.longitude = longitude
        self.altitude = altitude
        self.si = si
        self.gu = gu
        self.dong = dong
        self.name = name
        self.img = img
        self.introduction = introduction
        self.difficulty = difficulty

    @classmethod
    def from_dict(cls, adict: dict):
        return cls(
            mountain_seq=adict["mountain_seq"],
            latitude=adict["latitude"],
            longitude=adict["longitude"],
            altitude=adict["altitude"],
            si=adict["si"],
            gu=adict["gu"],
            dong=adict["dong"],
            name=adict["name"],
            img=adict["img"],
            introduction=adict["introduction"],
            difficulty=adict["difficulty"],
        )

    def to_dict(self):
        return {
            "mountain_seq": self.mountain_seq,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "altitude": self.altitude,
            "si": self.si,
            "gu": self.gu,
            "dong": self.dong,
            "name": self.name,
            "img": self.img,
            "introduction": self.introduction,
            "difficulty": self.difficulty,
        }

    def __eq__(self, other):
        return self.to_dict() == other.to_dict()
