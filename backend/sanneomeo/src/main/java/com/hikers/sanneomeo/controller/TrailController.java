package com.hikers.sanneomeo.controller;

import com.hikers.sanneomeo.dto.request.KeepTrailRequestDto;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.dto.response.RecommendCourseDto;
import com.hikers.sanneomeo.dto.response.RecommendResultResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.TrailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/trail")
@RequiredArgsConstructor
public class TrailController {

    private final TrailService trailService;

    @GetMapping("/info/{trailIdx}")
    public BaseResponseDto<?> getTrailInfo(@PathVariable("trailIdx") Long seq) {
        return new BaseResponseDto<>(trailService.getPathsBySequence(seq));
    }


    @PostMapping("/keep")
    public BaseResponseDto<Boolean> keepTrail(@RequestBody KeepTrailRequestDto keepTrailRequestDto) {
        try {
            Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            //유저가 해당 trailSeq에 대한 찜 데이터 있다면 get -> true/false 토글
            //없다면 post
            Long courseSeq = keepTrailRequestDto.getCourseSeq();
            boolean result = trailService.keep(authUserSeq, courseSeq);
            return new BaseResponseDto<>(result);
        } catch (Exception e) {
            if (e instanceof BaseException) {
                throw e;
            } else {
                throw new BaseException(BaseResponseStatus.FAIL);
            }

        }
    }

    @GetMapping("/recommend/survey")
    public BaseResponseDto<?> getRecommendTrails(@RequestParam(value = "level", required = false) int level,
                                                                        @RequestParam(value = "region", required = false) int region,
                                                                        @RequestParam(value = "purpose", required = false) int purpose,
                                                                        @RequestParam(value = "time", required = false) int time) {
        // level : 1/2/3, region : 1~8, purpose : 1/2, time : 1/2/3/4/5

        try {
            RecommendResultResponseDto result = new RecommendResultResponseDto();
            Optional<RecommendCourseDto> target = trailService.getTargetCourseFlask(level, region, purpose, time);
            if(target.isEmpty()) {
                return new BaseResponseDto<>(BaseResponseStatus.SUCCESS.getStatus());
            }
            target.ifPresent(result::setTarget);
            List<RecommendCourseDto> recommends = trailService.getRecommendCoursesFlask(result.getTarget().getSequence());
            result.setResult(recommends);
            return new BaseResponseDto<>(result); // 처리 결과에 맞게 반환값 설정
        } catch (Exception e) {
            if (e instanceof BaseException) {
                throw e;
            } else {
                e.printStackTrace();
                throw new BaseException(BaseResponseStatus.FAIL);
            }
        }
    }

}
