package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.MountainDetailResponseDto;
import java.util.Optional;

public interface MountainRepositoryCustom {
  Optional<MountainDetailResponseDto> findMountainBySequence(String sequence);
}
