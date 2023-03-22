package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Mountain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MountainRepository extends JpaRepository<Mountain, String> {

    Optional<Mountain> findByMountainSeq(String mountainIdx);
}
