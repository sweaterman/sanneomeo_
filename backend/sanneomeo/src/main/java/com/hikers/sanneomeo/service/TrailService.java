package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;

public interface TrailService {
  // 등산로 찜하기
  boolean keep(Long userSeq, Long trailSeq);


  TrailDetailResponseDto getTrailDetail(Long sequence);
}
