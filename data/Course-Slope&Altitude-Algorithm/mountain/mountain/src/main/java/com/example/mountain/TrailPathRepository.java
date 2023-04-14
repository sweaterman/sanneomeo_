package com.example.mountain;

import com.example.mountain.entity.Course;
import com.example.mountain.entity.CourseTrail;
import com.example.mountain.entity.TrailPath;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TrailPathRepository extends JpaRepository<TrailPath, Long> {

//  @Query("select tp from TrailPath tp where tp.trailSeq = :trailSeq")
//  List<TrailPath> findTrailPatyByTrailSeq(@Param("trailSeq") Long trailSeq);
}
