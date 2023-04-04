package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.domain.Keep;
import com.hikers.sanneomeo.dto.response.NearTrailResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.CourseRepository;
import com.hikers.sanneomeo.repository.KeepRepository;
import com.hikers.sanneomeo.repository.KeepRepositoryCustom;
import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService{
private final CourseRepository courseRepository;
private final KeepRepository keepRepository;

  @Override
  public NearTrailResponseDto getNearTrailByDistance(String sequence, BigDecimal latitude,
      BigDecimal longitude) {
    return courseRepository.findNearTrailByMountainSequence(sequence,latitude,longitude).orElseThrow(()->new BaseException(
        BaseResponseStatus.FAIL, "해당산의 코스가 없습니다."));
  }

  @Override
  public List<TrailListResponseDto> getTrailsBySequence(String sequence) {
    return courseRepository.findTrailsByMountainSequence(sequence);
  }

  @Override
  public List<TrailListResponseDto> getTrailsBySequence(String sequence, Long userSeq) {
    List<TrailListResponseDto> trailListResponseDtoList = courseRepository.findTrailsByMountainSequence(sequence);

    trailListResponseDtoList.stream()
        .forEach(trailListResponseDto -> {
          try{
            Keep userKeep = keepRepository.findFirstByUserSeqAndCourseSeq(userSeq, trailListResponseDto.getSequence()).get();
            trailListResponseDto.setIsLike(userKeep.isKeep());
          } catch(NoSuchElementException nee){
          }
        });

    return trailListResponseDtoList;
  }
}
