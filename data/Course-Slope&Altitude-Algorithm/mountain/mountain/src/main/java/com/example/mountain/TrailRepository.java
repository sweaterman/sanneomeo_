package com.example.mountain;

import com.example.mountain.entity.Course;
import com.example.mountain.entity.Trail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TrailRepository extends JpaRepository<Trail, Long> {
}
