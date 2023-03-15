import collections
import json

class InvalidRequestObject:
    def __init__(self) -> None:
        self.errors = []

    def add_error(self, parameter: str, message: str) -> None:
        self.errors.append({"parameter": parameter, "message": message})

    def has_errors(self) -> bool:
        return len(self.errors) > 0

    def __bool__(self) -> bool:
        return False


class ValidRequestObject:
    @classmethod
    def from_dict(cls, adict: dict):
        raise NotImplementedError

    def __bool__(self) -> bool:
        return True





class ResponseFailure:
    RESOURCE_ERROR = "400"
    PARAMETERS_ERROR = "400"
    SYSTEM_ERROR = "400"

    def __init__(self, type_: str, message: str) -> None:
        self.type = type_  # type 이 예약어라 끝에 _를 붙임
        self.message = self._format_message(message)

    def _format_message(self, msg: str) -> str:
        if isinstance(msg, Exception):
            return "{}: {}".format(msg.__class__.__name__, "{}".format(msg))
        return msg

    @property
    def value(self) -> dict:
        return {"type": self.type, "message": self.message}

    def __bool__(self) -> bool:
        return False

    @classmethod
    def build_from_invalid_request_object(cls, invalid_request_object: InvalidRequestObject):
        message = "\n".join(
            ["{}: {}".format(err["parameter"], err["message"]) for err in invalid_request_object.errors]
        )

        return cls(cls.PARAMETERS_ERROR, message)

    @classmethod
    def build_resource_error(cls, message: str = None):
        return cls(cls.RESOURCE_ERROR, message)

    @classmethod
    def build_system_error(cls, message: str = None):
        return cls(cls.SYSTEM_ERROR, message)

    @classmethod
    def build_parameters_error(cls, message: str = None):
        return cls(cls.PARAMETERS_ERROR, message)


class ResponseSuccess:
    SUCCESS = "200"

    def __init__(self, value=None) -> None:
        self.type = self.SUCCESS
        self.value = value

    def __bool__(self) -> bool:
        return True




class MountainJsonEncoder(json.JSONEncoder):
    def default(self, o: object):
        try:
            to_serialize = {
                "name": o.name,
                "seq":o.mountain_seq
            }
            return to_serialize
        except AttributeError:
            return super().default(o)