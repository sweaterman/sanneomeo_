package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.TrailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TrailService {

  private final TrailRepository trailRepository;


  /**
   * Gets trail detail.
   *
   * @param sequence the sequence
   * @return the trail detail
   */
  public TrailDetailResponseDto getTrailDetail(Long sequence) {
    return trailRepository.findDetailBySequence(sequence).orElseThrow(() -> new BaseException(
        BaseResponseStatus.OAUTH_SETTING_ERROR, ""));
  }


}
