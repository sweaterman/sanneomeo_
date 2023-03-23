package com.hikers.sanneomeo.service;

public interface TrailService {

  // 등산로 찜하기
  boolean createKeep(Long userSeq, Long trailSeq);

  // 찜삭제
  boolean removeKeep(Long keepSeq);

  TrailDetailResponseDto getTrailDetail(Long sequence);
}
