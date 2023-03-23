package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.PathResponseDto;
import java.util.List;

public interface TrailPathRepositoryCustom {

  List<PathResponseDto> findPathsBySequence(Long sequence);
}
