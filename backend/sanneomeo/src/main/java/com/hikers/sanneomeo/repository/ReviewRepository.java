package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
