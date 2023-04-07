package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface TrailService {

  // 등산로 찜하기
  boolean keep(Long userSeq, Long trailSeq);

  TrailDetailResponseDto getTrailDetail(Long sequence);

  List<PathResponseDto> getPathsBySequence(Long sequence);

  List<TrailListResponseDto> getTrailsBySequence(String sequence);

  NearTrailResponseDto getNearTrailByDistance(String sequence,
      BigDecimal latitude, BigDecimal longitude);

  Optional<RecommendCourseDto> getTargetCourseFlask(int level, int region, int purpose, int time);

  List<RecommendCourseDto> getRecommendCoursesFlask(Long targetCourseSeq);


}
