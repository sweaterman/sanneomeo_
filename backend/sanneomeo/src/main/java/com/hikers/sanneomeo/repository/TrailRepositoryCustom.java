package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import java.util.List;
import java.util.Optional;

public interface TrailRepositoryCustom {

  Optional<TrailDetailResponseDto> findDetailBySequence(Long sequence);
  List<TrailListResponseDto> findTrailsByMountainSequence(String sequence);

}
