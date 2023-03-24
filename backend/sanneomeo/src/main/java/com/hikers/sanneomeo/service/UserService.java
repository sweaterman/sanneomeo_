package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.ChallengeResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface UserService {

  Map<String, Object> challengeInfo();
  boolean updatePhotoStatus(Long authUserSeq, Long photoSeq);
  boolean deletePhoto(Long authUserSeq, Long photoSeq);
}
