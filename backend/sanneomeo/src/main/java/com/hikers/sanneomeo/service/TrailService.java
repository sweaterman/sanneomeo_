package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import java.util.List;

public interface TrailService {

  // 등산로 찜하기
  boolean createKeep(Long userSeq, Long trailSeq);

  // 찜삭제
  boolean removeKeep(Long keepSeq);

  TrailDetailResponseDto getTrailDetail(Long sequence);

  List<TrailListResponseDto> getTrailsBySequence(String sequence);


}
