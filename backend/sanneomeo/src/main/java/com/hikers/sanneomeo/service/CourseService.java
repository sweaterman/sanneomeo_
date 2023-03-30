package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.NearTrailResponseDto;
import java.math.BigDecimal;

public interface CourseService {
  NearTrailResponseDto getNearTrailByDistance(String sequence,
      BigDecimal latitude, BigDecimal longitude);
}
