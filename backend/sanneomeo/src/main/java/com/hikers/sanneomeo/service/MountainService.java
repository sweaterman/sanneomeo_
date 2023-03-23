package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.request.UploadImagesRequestDto;
import com.hikers.sanneomeo.dto.request.WriteReviewRequestDto;
import com.hikers.sanneomeo.dto.response.MountainPosResponseDto;

import java.util.List;
import java.util.Optional;

public interface MountainService {

    //사진 등록
    boolean createRecordPhotos(UploadImagesRequestDto uploadImagesRequestDto, List<String> uploadImgUrls, Long mountainSeq);

    //산 후기 작성
    boolean writeReview(WriteReviewRequestDto writeReviewRequestDto);

    //산 위치 정보
    Optional<MountainPosResponseDto> getPos(String mountainIdx);

}
