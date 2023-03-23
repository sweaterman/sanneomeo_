package com.hikers.sanneomeo.controller;


import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.TrailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
      Long authUserSeq = Long.parseLong(
          SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
      boolean result = trailService.createKeep(authUserSeq, trailSeq);
      return new BaseResponseDto<>(result);
    } catch (Exception e) {
      if (e instanceof BaseException) {
        throw e;
      } else {
        throw new BaseException(BaseResponseStatus.FAIL);
      }

    }
  }
}
