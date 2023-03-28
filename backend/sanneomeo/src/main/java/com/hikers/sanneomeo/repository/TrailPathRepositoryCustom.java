package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.NearTrailResponseDto;
import com.hikers.sanneomeo.dto.response.PathResponseDto;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface TrailPathRepositoryCustom {

  List<PathResponseDto> findPathsBySequence(Long sequence);
  Optional<NearTrailResponseDto> findNearTrailByMountainSequence(String sequence,
      BigDecimal latitude, BigDecimal longitude);
}
