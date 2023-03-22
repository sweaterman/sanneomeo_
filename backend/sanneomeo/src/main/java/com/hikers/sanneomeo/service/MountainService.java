package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.request.UploadImagesRequestDto;
import com.hikers.sanneomeo.dto.response.MountainPosResponseDto;

import java.util.List;
import java.util.Optional;

public interface MountainService {

    Optional<MountainPosResponseDto> getPos(String mountainIdx);

    boolean createRecordPhotos(UploadImagesRequestDto uploadImagesRequestDto, List<String> uploadImgUrls, Long mountainSeq);
}
