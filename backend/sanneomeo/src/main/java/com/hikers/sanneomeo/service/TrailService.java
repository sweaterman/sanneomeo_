package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.*;

import java.math.BigDecimal;
import java.util.List;

public interface TrailService {

  // 등산로 찜하기
  boolean keep(Long userSeq, Long trailSeq);

  TrailDetailResponseDto getTrailDetail(Long sequence);

  List<PathResponseDto> getPathsBySequence(Long sequence);

  List<TrailListResponseDto> getTrailsBySequence(String sequence);

  NearTrailResponseDto getNearTrailByDistance(String sequence,
      BigDecimal latitude, BigDecimal longitude);

  String getTargetCourseSeqFlask(int level, String region, int purpose, int time);

  List<GetRecommendCourseResponseDto> getRecommendCoursesFlask(String targetCourseSeq);


}
