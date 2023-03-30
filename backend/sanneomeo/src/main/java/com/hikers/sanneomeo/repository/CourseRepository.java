package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Course;
import com.hikers.sanneomeo.domain.Keep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository  extends JpaRepository<Course, Long>, CourseRepositoryCustom{

}
