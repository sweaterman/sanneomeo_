package com.hikers.sanneomeo.controller;

import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.service.TrailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
}
