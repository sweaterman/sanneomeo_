from typing import Union

from hikers.repository.mountainRepository import Repository
from hikers.dto.request import mountainRequset as req
from hikers.dto.response import mountainResponse as res
from hikers.dto.response.mountainResponse import ResponseFailure, ResponseSuccess


class MountainList:
    def __init__(self, repo: Repository):
        self.repo = repo

    def execute(
        self, requestDto: Union[req.ValidRequestObject, req.InvalidRequestObject]) -> Union[ResponseSuccess, ResponseFailure]:
        if not requestDto:
            return res.ResponseFailure.build_from_invalid_request_object(requestDto)

        try:
            datas = self.repo.list(filters=requestDto.filters)
            return res.ResponseSuccess(datas)
        except Exception as exc:
            return res.ResponseFailure.build_system_error("{}: {}".format(exc.__class__.__name__, "{}".format(exc)))
