from abc import ABCMeta, abstractmethod
from typing import List

from hikers.domain.mountain import Mountain


class Repository(metaclass=ABCMeta):
    @abstractmethod
    def list(self, filters: dict = None) -> List[Mountain]:
        pass
