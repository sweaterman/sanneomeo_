package com.hikers.sanneomeo.controller;

import static com.hikers.sanneomeo.exception.BaseResponseStatus.UNAUTHORIZED_USER;

import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.domain.MountainDocument;
import com.hikers.sanneomeo.dto.request.UploadImagesRequestDto;
import com.hikers.sanneomeo.dto.request.WriteReviewRequestDto;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.dto.response.GetUserSurveyResponseDto;
import com.hikers.sanneomeo.dto.response.MountainDetailResponseDto;
import com.hikers.sanneomeo.dto.response.MountainSearchResponseDto;
import com.hikers.sanneomeo.dto.response.PhotoResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import com.hikers.sanneomeo.dto.response.ReviewResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.TrailPathRepository;
import com.hikers.sanneomeo.service.CourseService;
import com.hikers.sanneomeo.service.MountainService;
import com.hikers.sanneomeo.service.PhotoService;
import com.hikers.sanneomeo.service.S3UploadService;
import com.hikers.sanneomeo.service.SpotService;
import com.hikers.sanneomeo.service.TrailService;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
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
    private CourseService courseService;

    @Autowired
    private YmlConfig ymlConfig;
    @Autowired
    private TrailPathRepository trailPathRepository;


    @PostMapping("/{mountainSeq}/photo")
    public BaseResponseDto<Boolean> uploadImages(@ModelAttribute UploadImagesRequestDto uploadImagesRequestDto,
                                                 @PathVariable Long mountainSeq) {
        try {
            //요청 내부의 userSeq와 인증된 userSeq가 다를 경우
            Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            if (authUserSeq != uploadImagesRequestDto.getUserSeq()) {
                throw new BaseException(UNAUTHORIZED_USER);
            }

            //이미지 업로드 후 링크 가져오기
            List<String> uploadUrls = s3UploadService.upload(uploadImagesRequestDto.getPhotos(), "record");

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

            Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            writeReviewRequestDto.setUserSeq(authUserSeq);
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
            Long authUserSeq = 0L;
            if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
                authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            }
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
    public BaseResponseDto<?> getTrailsByMountainSequence(@PathVariable("mountainIdx") String sequence){

            Object principal = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
            if (principal.toString().equals("anonymousUser")) {
                GetUserSurveyResponseDto getUserSurveyResponseDto = new GetUserSurveyResponseDto();
                getUserSurveyResponseDto.setLogin(false);
                return new BaseResponseDto<>(courseService.getTrailsBySequence(sequence));
            }
            Long userSeq = Long.parseLong(principal.toString());

            String userSeqSting = principal.toString();
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder().url(
                ymlConfig.getFlaskEndPoint() + "/mountainRecommendCourse?userseq=" + userSeqSting + "&mountainIdx="
                    + sequence).build();
            try{
                Response response = client.newCall(request).execute();
                JSONObject message = new JSONObject(response.body().string());
                List<Object> courses = message.getJSONArray("course_seq_list").toList();

                return new BaseResponseDto<>(courseService.getTrailsBySequence(sequence, userSeq)
                    .stream().map(trail -> recommendCheck(trail,courses)).collect(Collectors.toList()));

            }
            catch (Exception e){
                return new BaseResponseDto<>(courseService.getTrailsBySequence(sequence, userSeq));
            }




    }
    @GetMapping("/photo/{mountainIdx}")
    public BaseResponseDto<?> getTrailsByMountainSequence(@PathVariable("mountainIdx") Long sequence){
        return  new BaseResponseDto<>(photoService.getPhotosBymountainSequence(sequence));
    }
    @GetMapping("/info/{mountainIdx}")
    public BaseResponseDto<?> getMountainInfo(@PathVariable("mountainIdx") String sequence){
        return  new BaseResponseDto<>(mountainService.getMountainInfoBysequence(sequence));

    }

    @GetMapping("/search")
    public BaseResponseDto<List<MountainDocument>> searchMountain(@RequestParam("key") String key){
        return new BaseResponseDto<>(mountainService.search(key));

    }

    public TrailListResponseDto recommendCheck(TrailListResponseDto trail,List<Object> courses){
        for(Object obj : courses){
            if(trail.getSequence().equals((Long)obj)) {
                trail.setRecommend(true);
                break;
            }
        }
        return trail;
    }


}
