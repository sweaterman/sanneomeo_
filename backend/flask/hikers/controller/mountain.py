import json

from flask import Blueprint, Response, request

from hikers.dto.request import mountainRequset
from hikers.repository import mountainRepositoryImpl
from hikers.service import mountainService
from hikers.dto.response.mountainResponse import MountainJsonEncoder

blueprint = Blueprint("mountain", __name__)
# STATUS_CODES = {
#     res.ResponseSuccess.SUCCESS: 200,
#     res.ResponseFailure.RESOURCE_ERROR: 404,
#     res.ResponseFailure.PARAMETERS_ERROR: 400,
#     res.ResponseFailure.SYSTEM_ERROR: 500,
# }

@blueprint.route("/mountain", methods=["GET"])
def listMountain():
    qrystr_params = {
        "filters": {},
    }
    for arg, values in request.args.items():
        if arg.startswith("filter_"):
            qrystr_params["filters"][arg.replace("filter_", "")] = values

    requestDto = mountainRequset.MountainListRequestObject.from_dict(qrystr_params)
    print(requestDto.filters)
    repo = mountainRepositoryImpl.Repo()
    service = mountainService.MountainList(repo)
    response = service.execute(requestDto)
    # print(response.value[0].name)

    return Response(
        json.dumps(response.value,cls=MountainJsonEncoder, ensure_ascii=False).encode('utf8'),
        mimetype="application/json",
        status=int(response.type),
    )
