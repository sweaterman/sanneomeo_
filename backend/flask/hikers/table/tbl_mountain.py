from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# It is important to understand that this is not the class we are using in the business logic,
# but the class that we want to map into the SQL database.
# The structure of this class is thus dictated by the needs of the storage layer, and not by the use cases.

# Obviously, this means that you have to keep the storage
# and the domain levels in sync and that you need to manage migrations on your own.


class Mountain(Base):
    __tablename__ = "tbl_mountain"
    mountain_seq = Column(String(10), primary_key=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    altitude = Column(Float, nullable=True)
    si = Column(String(20), nullable=True)
    gu = Column(String(20), nullable=True)
    dong = Column(String(20), nullable=True)
    name = Column(String(50), nullable=True)
    img = Column(String(30), nullable=True)
    introduction = Column(String(1500), nullable=True)
    difficulty = Column(String(8), nullable=True)
