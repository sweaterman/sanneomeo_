package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.MountainSpotResponseDto;
import com.hikers.sanneomeo.dto.response.RecommendCourseDto;
import com.hikers.sanneomeo.dto.response.NearTrailResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface CourseRepositoryCustom {
  Optional<NearTrailResponseDto> findNearTrailByMountainSequence(String sequence,
      BigDecimal latitude, BigDecimal longitude);
  List<TrailListResponseDto> findTrailsByMountainSequence(String sequence);

  Optional<RecommendCourseDto> findCourseByCourseSequenceAndUserSeq(Long courseSeq, Long userSeq);
  Optional<RecommendCourseDto> findCourseByCourseSequence(Long courseSeq);

  Optional<MountainSpotResponseDto> findMountainAndCourseNameBySequence(Long courseSeq);
}
