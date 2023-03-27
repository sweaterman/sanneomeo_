package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Mountain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface MountainRepository extends JpaRepository<Mountain, String>
,MountainRepositoryCustom{

    Optional<Mountain> findByMountainSeq(String mountainIdx);
}
