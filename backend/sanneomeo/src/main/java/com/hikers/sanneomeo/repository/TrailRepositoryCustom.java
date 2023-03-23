package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import java.util.Optional;

public interface TrailRepositoryCustom {

  Optional<TrailDetailResponseDto> findDetailBySequence(Long sequence);

}
