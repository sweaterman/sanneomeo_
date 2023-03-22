package com.hikers.sanneomeo.service;

import org.springframework.stereotype.Service;

@Service
public interface UserService {
  boolean updatePhotoStatus(Long authUserSeq, Long photoSeq);
  boolean deletePhoto(Long authUserSeq, Long photoSeq);
}
