package com.hikers.sanneomeo.controller;

import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.TrailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trail")
@RequiredArgsConstructor
public class TrailController {

  private final TrailService trailService;

  @GetMapping("/info/{trailIdx}")
  public TrailDetailResponseDto getTrailInfo(@PathVariable("trailIdx") Long seq) {
    return trailService.getTrailDetail(seq);
  }


    @PostMapping("/keep")
    public BaseResponseDto<Boolean> keepTrail(@RequestBody Long trailSeq) {
        try {
            Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            //유저가 해당 trailSeq에 대한 찜 데이터 있다면 get -> true/false 토글

            //없다면 post

            boolean result = trailService.createKeep(authUserSeq, trailSeq);
            return new BaseResponseDto<>(result);
        } catch(Exception e) {
            if(e instanceof BaseException) {
                throw e;
            } else {
                throw new BaseException(BaseResponseStatus.FAIL);
            }

        }
    }
}
