package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Trail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrailRepository extends JpaRepository<Trail, Long> {
}
