package com.hikers.sanneomeo.service;

public interface TrailService {
    // 등산로 찜 등록
    boolean createKeep(Long userSeq, Long trailSeq);
    // 찜 삭제
    boolean removeKeep(Long keepSeq);
}
