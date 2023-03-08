package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Mountain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MountainRepository extends JpaRepository<Mountain, Long> {
}
