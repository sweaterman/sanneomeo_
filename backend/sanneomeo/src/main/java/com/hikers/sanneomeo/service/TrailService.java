package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.PathResponseDto;
import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import java.util.List;

public interface TrailService {

  // 등산로 찜하기
  boolean keep(Long userSeq, Long trailSeq);

  TrailDetailResponseDto getTrailDetail(Long sequence);

  List<PathResponseDto> getPathsBySequence(Long sequence);

  List<TrailListResponseDto> getTrailsBySequence(String sequence);


}
