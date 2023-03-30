package com.example.mountain;

import com.example.mountain.entity.Course;
import com.example.mountain.entity.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CourseRepository extends JpaRepository<Course, Long> {


}
