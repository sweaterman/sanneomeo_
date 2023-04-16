package com.example.mountain;

import com.example.mountain.entity.CourseTrail;
import com.example.mountain.entity.Trail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourseTrailRepository extends JpaRepository<CourseTrail, Long> {

  @Query("select ct from CourseTrail ct where ct.courseSeq = :courseSeq")
  List<CourseTrail> findCourseTrailByCourseSeq(@Param("courseSeq") Long courseSeq);
//
//  @Query("select ct from CourseTrail ct where ct.courseSeq = :courseSeq and ct.trailSeq= :trailSeq")
//  CourseTrail findCourseTrailByCourseSeqAndTrailSeq(@Param("courseSeq") Long courseSeq,
//                                               @Param("trailSeq") Long trailSeq);
}
