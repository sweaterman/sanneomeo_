package com.hikers.sanneomeo.service;


import com.hikers.sanneomeo.dto.response.MountainSpotResponseDto;
import com.hikers.sanneomeo.dto.response.PathResponseDto;
import com.hikers.sanneomeo.dto.response.SpotResponseDto;
import java.math.BigDecimal;
import java.util.List;

public interface SpotService {
  MountainSpotResponseDto getSpotsByMountainSequence(Long sequence);

  MountainSpotResponseDto getSpotsByMountainSequenceAndCoordinate(Long sequence,
      BigDecimal latitude,BigDecimal longitude);

  List<PathResponseDto> getRouteFromCurToSpot(BigDecimal lat,BigDecimal lon,Long course,Long spot);
}
