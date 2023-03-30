package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.NearTrailResponseDto;
import java.math.BigDecimal;
import java.util.Optional;

public interface CourseRepositoryCustom {
  Optional<NearTrailResponseDto> findNearTrailByMountainSequence(String sequence,
      BigDecimal latitude, BigDecimal longitude);
}
