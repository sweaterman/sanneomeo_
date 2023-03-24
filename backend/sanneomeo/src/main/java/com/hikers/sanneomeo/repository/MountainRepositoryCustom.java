package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.MountainDetailResponseDto;
import com.hikers.sanneomeo.dto.response.MountainSimpleInfoResponseDto;

import com.hikers.sanneomeo.dto.response.NearMountainResponseDto;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface MountainRepositoryCustom {
  Optional<MountainDetailResponseDto> findMountainBySequence(String sequence);

  //계절별 산 리스트
  List<MountainSimpleInfoResponseDto> seasonMountainList(String season);
  //가장 가까운 산 뽑기
  Optional<NearMountainResponseDto> findMountainSequenceByDistance(BigDecimal latitude, BigDecimal longitude);
}
