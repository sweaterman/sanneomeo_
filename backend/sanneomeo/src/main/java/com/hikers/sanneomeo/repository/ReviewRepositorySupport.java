package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.dto.response.ReviewResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import static com.hikers.sanneomeo.domain.QReview.review;
import static com.hikers.sanneomeo.domain.QUser.user;

import java.util.List;

@Repository
public class ReviewRepositorySupport {

    @Autowired
    private JPAQueryFactory query;

    public List<ReviewResponseDto> getReview (String mountainIdx){

        return query
                .select(Projections.fields(ReviewResponseDto.class,
                        user.userSeq, user.nickname, user.profileImage, review.reviewSeq, review.rate, review.content, review.createdAt ))
                .from(review)
                .join(user).on(review.userSeq.eq(user.userSeq))
                .where(review.mountainSeq.eq(mountainIdx))
                .orderBy(review.createdAt.desc())
                .fetch();

    }
}
