package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Keep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KeepRepository extends JpaRepository<Keep, Long> {
    Optional<Keep> findFirstByUserSeqAndTrailSeq(Long userSeq, Long trailSeq);
}
