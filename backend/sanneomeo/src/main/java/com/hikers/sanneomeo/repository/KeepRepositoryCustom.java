package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.GetTrailLikeResponseDto;
import com.hikers.sanneomeo.dto.response.MountainDetailResponseDto;
import com.hikers.sanneomeo.dto.response.MountainSimpleInfoResponseDto;
import com.hikers.sanneomeo.dto.response.NearMountainResponseDto;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface KeepRepositoryCustom {

  List<GetTrailLikeResponseDto> findLikeByUserWithTrail (Long userSeq);

}
