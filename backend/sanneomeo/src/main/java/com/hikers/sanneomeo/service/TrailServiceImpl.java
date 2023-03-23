package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.domain.Keep;
import com.hikers.sanneomeo.dto.response.PathResponseDto;
import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.KeepRepository;
import com.hikers.sanneomeo.repository.TrailPathRepository;
import com.hikers.sanneomeo.repository.TrailRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@Transactional
@RequiredArgsConstructor
public class TrailServiceImpl implements TrailService {

  private final KeepRepository keepRepository;
  private final TrailRepository trailRepository;
  private final TrailPathRepository trailPathRepository;


  @Override
  public TrailDetailResponseDto getTrailDetail(Long sequence) {
    return trailRepository.findDetailBySequence(sequence).orElseThrow(() -> new BaseException(
        BaseResponseStatus.FAIL, ""));
  }

  @Override
  public List<PathResponseDto> getPathsBySequence(Long sequence) {
    return trailPathRepository.findPathsBySequence(sequence);
  }

  @Override
  public List<TrailListResponseDto> getTrailsBySequence(String sequence) {
    return trailRepository.findTrailsByMountainSequence(sequence);
  }


  @Override
  public boolean keep(Long userSeq, Long trailSeq) {
    Optional<Keep> keep = keepRepository.findFirstByUserSeqAndTrailSeq(userSeq, trailSeq);
    if (keep.isPresent()) { // 레코드가 있으면
      keep.get().updateIsKeep();
    } else { // 레코드가 없으면
      //to entity
      Keep keepEntity = Keep.builder()
          .userSeq(userSeq)
          .trailSeq(trailSeq)
          .build();

      keepRepository.save(keepEntity);
    }
    return true;
  }

}
