package com.hikers.sanneomeo.controller;

import static com.hikers.sanneomeo.exception.BaseResponseStatus.UNAUTHORIZED_USER;

import com.hikers.sanneomeo.dto.request.UploadImagesRequestDto;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.MountainService;
import com.hikers.sanneomeo.service.S3UploadService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/mountain")
public class MountainController {

    @Autowired
    private S3UploadService s3UploadService;
    @Autowired
    private MountainService mountainService;

    @PostMapping("/image/{mountainSeq}")
    public BaseResponseDto<Boolean> uploadImages(@ModelAttribute UploadImagesRequestDto uploadImagesRequestDto,
                                                 @PathVariable Long mountainSeq) {
        try {
            //요청 내부의 userSeq와 인증된 userSeq가 다를 경우
            Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            if (authUserSeq != uploadImagesRequestDto.getUserSeq()) {
                throw new BaseException(UNAUTHORIZED_USER);
            }

            //이미지 업로드 후 링크 가져오기
            List<String> uploadUrls = s3UploadService.upload(uploadImagesRequestDto.getImages(), "record");

            //db 접근해서 dto 생성해오기
            boolean result = mountainService.createRecordPhotos(uploadImagesRequestDto, uploadUrls, mountainSeq);

            return new BaseResponseDto<>(result);

        } catch (Exception e) {
            if (e instanceof BaseException) {
                throw e;
            } else {
                throw new BaseException(BaseResponseStatus.FAIL);
            }
        }
    }


    @GetMapping("/position/{mountainIdx}")
    public BaseResponseDto<?> mountainPos(@PathVariable String mountainIdx) {

        return new BaseResponseDto<>(mountainService.getPos(mountainIdx));
    }
}
