package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Keep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface KeepRepository extends JpaRepository<Keep, Long>, KeepRepositoryCustom {
    Optional<Keep> findFirstByUserSeqAndCourseSeq(Long userSeq, Long courseSeq);
}
