package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.SpotResponseDto;
import java.math.BigDecimal;
import java.util.List;

public interface MountainSpotRepositoryCustom {

  List<SpotResponseDto> findSpotsByMountainSequence(String sequence);

  List<SpotResponseDto> findSpotsByMountainSequenceAndCoordinate(String sequence,
      BigDecimal latitude,BigDecimal longitude);

}
