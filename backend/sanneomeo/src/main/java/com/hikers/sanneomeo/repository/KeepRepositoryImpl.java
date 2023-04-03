package com.hikers.sanneomeo.repository;

import static com.hikers.sanneomeo.domain.QCourse.course;
import static com.hikers.sanneomeo.domain.QKeep.keep;
import static com.hikers.sanneomeo.domain.QMountain.mountain;
import static com.hikers.sanneomeo.domain.QTrail.trail;
import static com.hikers.sanneomeo.domain.QUser.user;

import com.hikers.sanneomeo.domain.User;
import com.hikers.sanneomeo.dto.response.GetTrailLikeResponseDto;
import com.hikers.sanneomeo.dto.response.MountainSimpleInfoResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class KeepRepositoryImpl implements KeepRepositoryCustom{

  private final JPAQueryFactory query;

  @Override
  public List<GetTrailLikeResponseDto> findLikeByUserWithTrail(Long userSeq) {
    return query
            .select(Projections.fields(GetTrailLikeResponseDto.class,
                    course.courseSeq.as("trailSeq"), course.name, course.mountainSeq,
                    new CaseBuilder()
                            .when(course.difficultyMean.goe(BigDecimal.valueOf(1.3))).then("어려움")
                            .when(course.difficultyMean.lt(BigDecimal.valueOf(1.3)).and(course.difficultyMean.gt(BigDecimal.valueOf(1.0)))).then("중간")
                            .otherwise("쉬움")
                            .as("difficulty"),
                    course.time, course.length, keep.isKeep))
            .from(keep)
            .join(course).on(keep.courseSeq.eq(course.courseSeq))
            .where(keep.userSeq.eq(userSeq).and(keep.isKeep.eq(true)))
            .fetch();
  }


  public Optional<User> findUserBySocialId(String social, String socialId) {

    return Optional.ofNullable(query
        .select(Projections.fields(User.class,
            user.userSeq, user.level))
        .from(user)
        .where(user.social.eq(social).and(user.socialId.eq(socialId)))
        .fetchOne());

  }

}
