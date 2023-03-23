package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Review;
import com.hikers.sanneomeo.dto.response.ReviewResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepositoryCustom {

    List<ReviewResponseDto> getReview (String mountainIdx);

}
