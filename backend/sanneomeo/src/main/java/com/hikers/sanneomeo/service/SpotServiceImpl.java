package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.SpotResponseDto;
import com.hikers.sanneomeo.repository.MountainSpotRepository;
import java.math.BigDecimal;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * packageName    : com.hikers.sanneomeo.service fileName       : SpotServiceImpl author         :
 * SSAFY date           : 2023-03-24 description    :
 * <p>
 * =========================================================== DATE              AUTHOR
 * NOTE -----------------------------------------------------------
 * <p>
 * 2023-03-24        SSAFY       최초 생성
 */
@Service
@Transactional
@RequiredArgsConstructor
public class SpotServiceImpl implements SpotService{

  private final MountainSpotRepository mountainSpotRepository;
  @Override
  public List<SpotResponseDto> getSpotsByMountainSequence(String sequence) {
    return mountainSpotRepository.findSpotsByMountainSequence(sequence);
  }

  @Override
  public List<SpotResponseDto> getSpotsByMountainSequenceAndCoordinate(String sequence,
      BigDecimal latitude, BigDecimal longitude) {
    return mountainSpotRepository.findSpotsByMountainSequenceAndCoordinate(sequence,latitude,longitude);
  }
}
