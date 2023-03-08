package com.example.mountain;

import com.example.mountain.entity.Mountain;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MountainRepository extends JpaRepository<Mountain, Long> {

  @Query(value = "select m from Mountain m where m.mountainSeq=:mountainSeq")
  Mountain findBySeq(String mountainSeq);

}
