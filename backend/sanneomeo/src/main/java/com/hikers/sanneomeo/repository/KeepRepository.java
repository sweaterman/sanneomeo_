package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Keep;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeepRepository extends JpaRepository<Keep, Long> {
}
