package com.hikers.sanneomeo.controller;

import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.service.SpotService;
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

  @GetMapping("trail/{trailIdx}")
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

}
