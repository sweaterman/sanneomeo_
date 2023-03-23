package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.domain.Keep;
import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.KeepRepository;
import com.hikers.sanneomeo.repository.TrailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TrailServiceImpl implements TrailService {
    private final KeepRepository keepRepository;
    private final TrailRepository trailRepository;

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
}
