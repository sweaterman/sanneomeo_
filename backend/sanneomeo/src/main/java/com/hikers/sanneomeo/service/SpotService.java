package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.SpotResponseDto;
import java.math.BigDecimal;
import java.util.List;

public interface SpotService {
  List<SpotResponseDto> getSpotsByMountainSequence(String sequence);

  List<SpotResponseDto> getSpotsByMountainSequenceAndCoordinate(String sequence,
      BigDecimal latitude,BigDecimal longitude);
}
