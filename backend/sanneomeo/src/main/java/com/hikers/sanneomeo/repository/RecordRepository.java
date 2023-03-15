package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
}
