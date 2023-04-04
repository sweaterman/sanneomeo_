package com.hikers.sanneomeo.service;


import com.hikers.sanneomeo.dto.response.PathResponseDto;
import com.hikers.sanneomeo.dto.response.SpotResponseDto;
import java.math.BigDecimal;
import java.util.List;

public interface SpotService {
  List<SpotResponseDto> getSpotsByMountainSequence(Long sequence);

  List<SpotResponseDto> getSpotsByMountainSequenceAndCoordinate(Long sequence,
      BigDecimal latitude,BigDecimal longitude);

  List<PathResponseDto> getRouteFromCurToSpot(BigDecimal lat,BigDecimal lon,Long course,Long spot);
}
