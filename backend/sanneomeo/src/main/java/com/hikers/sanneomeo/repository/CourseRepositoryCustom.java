package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.GetRecommendCourseResponseDto;
import com.hikers.sanneomeo.dto.response.NearTrailResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface CourseRepositoryCustom {
  Optional<NearTrailResponseDto> findNearTrailByMountainSequence(String sequence,
      BigDecimal latitude, BigDecimal longitude);
  List<TrailListResponseDto> findTrailsByMountainSequence(String sequence);

  Optional<GetRecommendCourseResponseDto> findCourseByCourseSequenceAndUserSeq(Long courseSeq, Long userSeq);
  Optional<GetRecommendCourseResponseDto> findCourseByCourseSequence(Long courseSeq);

}
