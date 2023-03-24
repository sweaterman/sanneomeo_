package com.hikers.sanneomeo.controller;

import static com.hikers.sanneomeo.exception.BaseResponseStatus.UNAUTHORIZED_USER;

import com.hikers.sanneomeo.dto.request.UploadImagesRequestDto;
import com.hikers.sanneomeo.dto.request.WriteReviewRequestDto;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.dto.response.MountainDetailResponseDto;
import com.hikers.sanneomeo.dto.response.PhotoResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import com.hikers.sanneomeo.dto.response.ReviewResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.MountainService;
import com.hikers.sanneomeo.service.PhotoService;
import com.hikers.sanneomeo.service.S3UploadService;
import com.hikers.sanneomeo.service.SpotService;
import com.hikers.sanneomeo.service.TrailService;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/mountain")
public class MountainController {

    @Autowired
    private S3UploadService s3UploadService;
    @Autowired
    private MountainService mountainService;

    @Autowired
    private TrailService trailService;
    @Autowired
    private PhotoService photoService;
    @Autowired
    private SpotService spotService;

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

    @PostMapping("/review")
    public BaseResponseDto<?> writeReview(@RequestBody WriteReviewRequestDto writeReviewRequestDto){
        try{

            //요청 내부의 userSeq와 인증된 userSeq가 다를 경우
            Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            if (authUserSeq != writeReviewRequestDto.getUserSeq()) {
                throw new BaseException(UNAUTHORIZED_USER);
            }

            boolean result = mountainService.writeReview(writeReviewRequestDto);
            return new BaseResponseDto<>(result);
        }catch (Exception e){
            if(e instanceof BaseException){
                throw e;
            }else{

                throw new BaseException(BaseResponseStatus.FAIL);
            }
        }
    }

    @GetMapping("/position/{mountainIdx}")
    public BaseResponseDto<?> mountainPos(@PathVariable String mountainIdx) {
        try{
            return new BaseResponseDto<>(mountainService.getPos(mountainIdx));

        }catch(Exception e){
            if (e instanceof BaseException){
                throw e;
            }else{
                throw new BaseException(BaseResponseStatus.FAIL);
            }
        }
    }

    @GetMapping("/review/{mountainIdx}")
    public BaseResponseDto<?> reviewList(@PathVariable String mountainIdx){
        try{
            Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            Map<String, Object> reviewMap = new HashMap<>();

            List<ReviewResponseDto> reviews = mountainService.reviewList(mountainIdx, authUserSeq);
            reviewMap.put("count", reviews.size());
            reviewMap.put("reviewList", reviews);
            return new BaseResponseDto<>(reviewMap);
        }catch (Exception e){
            if (e instanceof BaseException){
                throw e;
            }else{
                throw new BaseException(BaseResponseStatus.FAIL);
            }
        }
    }

    @DeleteMapping("/review/{reviewIdx}")
    public BaseResponseDto<Boolean> deleteReview(@PathVariable Long reviewIdx){
        try {
            mountainService.deleteReview(reviewIdx);
            return new BaseResponseDto<Boolean>(true);

        }catch(Exception e){
            if (e instanceof BaseException){
                throw e;
            }else{
                throw new BaseException(BaseResponseStatus.FAIL);
            }
        }
    }

    @GetMapping("/trail/{mountainIdx}")
    public List<TrailListResponseDto> getTrailsByMountainSequence(@PathVariable("mountainIdx") String sequence){
        return trailService.getTrailsBySequence(sequence);
    }
    @GetMapping("/photo/{mountainIdx}")
    public List<PhotoResponseDto> getTrailsByMountainSequence(@PathVariable("mountainIdx") Long sequence){
        return photoService.getPhotosBymountainSequence(sequence);
    }
    @GetMapping("/info/{mountainIdx}")
    public MountainDetailResponseDto getMountainInfo(@PathVariable("mountainIdx") String sequence,
     @RequestParam(required = false, value = "latitude")BigDecimal latitude,@RequestParam(required = false, value = "longitude")BigDecimal longitude){
        MountainDetailResponseDto dto = mountainService.getMountainInfoBysequence(sequence);
        if(latitude!=null && longitude!=null)
            dto.setSpots(spotService.getSpotsByMountainSequenceAndCoordinate(sequence,latitude,longitude));
        else
            dto.setSpots(spotService.getSpotsByMountainSequence(sequence));
        return dto;
    }
}
