package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.LocationResponseDto;
import com.hikers.sanneomeo.dto.response.SpotResponseDto;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface MountainSpotRepositoryCustom {

  List<SpotResponseDto> findSpotsByMountainSequence(Long sequence);

  List<SpotResponseDto> findSpotsByMountainSequenceAndCoordinate(Long sequence,
      BigDecimal latitude,BigDecimal longitude);

  Optional<LocationResponseDto> getSpotInfo(Long spotSeq);

}
