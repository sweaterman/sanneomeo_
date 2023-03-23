package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.domain.Keep;
import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.KeepRepository;
import com.hikers.sanneomeo.repository.TrailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TrailServiceImpl implements TrailService {
    private final KeepRepository keepRepository;
    private final TrailRepository trailRepository;

    @Override
    public boolean keep(Long userSeq, Long trailSeq) {
        Optional<Keep> keep = keepRepository.findFirstByUserSeqAndTrailSeq(userSeq, trailSeq);
        if (keep.isPresent()) { // 레코드가 있으면
            keep.get().updateIsKeep();
        }
        else { // 레코드가 없으면
            //to entity
            Keep keepEntity= Keep.builder()
                    .userSeq(userSeq)
                    .trailSeq(trailSeq)
                    .build();

            keepRepository.save(keepEntity);
        }
        return true;
    }

    @Override
    public TrailDetailResponseDto getTrailDetail(Long sequence) {
        return trailRepository.findDetailBySequence(sequence).orElseThrow(() -> new BaseException(
                BaseResponseStatus.FAIL, ""));
    }
}
