package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.PathResponseDto;
import com.hikers.sanneomeo.domain.Keep;
import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.KeepRepository;
import com.hikers.sanneomeo.repository.TrailPathRepository;
import com.hikers.sanneomeo.repository.TrailRepository;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TrailServiceImpl implements TrailService {

  private final KeepRepository keepRepository;
  private final TrailRepository trailRepository;
  private final TrailPathRepository trailPathRepository;

  @Override
  public boolean createKeep(Long userSeq, Long trailSeq) {
    //to entity
    Keep keep = Keep.builder()
        .userSeq(userSeq)
        .trailSeq(trailSeq)
        .build();

    keepRepository.save(keep);
    return true;
  }

  @Override
  public boolean removeKeep(Long keepSeq) {
    keepRepository.deleteById(keepSeq);
    return true;
  }

  @Override
  public TrailDetailResponseDto getTrailDetail(Long sequence) {
    return trailRepository.findDetailBySequence(sequence).orElseThrow(() -> new BaseException(
        BaseResponseStatus.FAIL, ""));
  }

  @Override
  public List<PathResponseDto> getPathsBySequence(Long sequence) {
    return trailPathRepository.findPathsBySequence(sequence);
  }

}
