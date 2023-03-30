package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.request.UpdateUserSurveyRequestDto;
import com.hikers.sanneomeo.dto.response.ChallengeResponseDto;
import com.hikers.sanneomeo.dto.response.GetTrailLikeResponseDto;
import com.hikers.sanneomeo.dto.response.GetUserPhotosByDateResponseDto;
import com.hikers.sanneomeo.dto.response.GetUserSurveyResponseDto;
import java.util.Date;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface UserService {

  Map<String, Object> challengeInfo();

  boolean updatePhotoStatus(Long authUserSeq, Long photoSeq);
  boolean deletePhoto(Long authUserSeq, Long photoSeq);
  Map<String, Map<String, List<String>>> getUserPhotos(Long userSeq, Integer month);

  List<GetTrailLikeResponseDto> getTrailLike(Long userSeq);

  boolean updateUserSurvey(Long userSeq, UpdateUserSurveyRequestDto updateUserSurveyRequestDto);

  GetUserSurveyResponseDto getUserSurveyResponseDto(Long userSeq);

}
