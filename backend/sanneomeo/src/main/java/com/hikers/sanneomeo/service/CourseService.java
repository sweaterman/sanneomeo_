package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.NearTrailResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import java.math.BigDecimal;
import java.util.List;

public interface CourseService {
  NearTrailResponseDto getNearTrailByDistance(String sequence,
      BigDecimal latitude, BigDecimal longitude);
  List<TrailListResponseDto> getTrailsBySequence(String sequence);

  List<TrailListResponseDto> getTrailsBySequence(String sequence, Long userSeq);
}

