package com.hikers.sanneomeo.controller;

import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.service.CourseService;
import com.hikers.sanneomeo.service.MountainService;
import com.hikers.sanneomeo.service.SpotService;
import com.hikers.sanneomeo.service.TrailService;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/spot")
@RequiredArgsConstructor
public class SpotController {

  private final SpotService spotService;
  private final MountainService mountainService;
  private final TrailService trailService;
  private final CourseService courseService;

  @GetMapping("/trail/{trailIdx}")
  public BaseResponseDto<?> getSpots(@PathVariable("trailIdx") Long sequence,
      @RequestParam(required = false, value = "longitude") BigDecimal longitude,
      @RequestParam(required = false, value = "latitude") BigDecimal latitude) {
    if (latitude != null && longitude != null) {
      return new BaseResponseDto<>(
          spotService.getSpotsByMountainSequenceAndCoordinate(sequence, latitude, longitude));
    } else {
      return new BaseResponseDto<>(spotService.getSpotsByMountainSequence(sequence));
    }
  }

  @GetMapping("/main")
  public BaseResponseDto<?> getNearTrail(
      @RequestParam(required = true, value = "longitude") BigDecimal longitude,
      @RequestParam(required = true, value = "latitude") BigDecimal latitude) {
    String sequence = mountainService.getMountainSeqByDistance(latitude, longitude)
        .getMountainSeq();
    return new BaseResponseDto<>(courseService.getNearTrailByDistance(sequence,latitude,longitude));

  }
}
