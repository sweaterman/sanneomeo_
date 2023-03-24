package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.MountainDetailResponseDto;
import com.hikers.sanneomeo.dto.response.MountainSimpleInfoResponseDto;

import java.util.List;
import java.util.Optional;

public interface MountainRepositoryCustom {
  Optional<MountainDetailResponseDto> findMountainBySequence(String sequence);

  //계절별 산 리스트
  List<MountainSimpleInfoResponseDto> seasonMountainList(String season);
}
