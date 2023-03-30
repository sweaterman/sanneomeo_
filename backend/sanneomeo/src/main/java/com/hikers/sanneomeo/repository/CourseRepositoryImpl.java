package com.hikers.sanneomeo.repository;

import static com.querydsl.core.types.dsl.MathExpressions.acos;
import static com.querydsl.core.types.dsl.MathExpressions.cos;
import static com.querydsl.core.types.dsl.MathExpressions.radians;
import static com.querydsl.core.types.dsl.MathExpressions.sin;

import com.hikers.sanneomeo.dto.response.NearTrailResponseDto;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.math.BigDecimal;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import static com.hikers.sanneomeo.domain.QMountain.mountain;
import static com.hikers.sanneomeo.domain.QCourse.course;
import static com.hikers.sanneomeo.domain.QCourseTrails.courseTrails;
import static com.hikers.sanneomeo.domain.QTrail.trail;
import static com.hikers.sanneomeo.domain.QTrailPath.trailPath;

@RequiredArgsConstructor
public class CourseRepositoryImpl implements CourseRepositoryCustom {
  private final JPAQueryFactory queryFactory;
  @Override
  public Optional<NearTrailResponseDto> findNearTrailByMountainSequence(String sequence,
      BigDecimal latitude, BigDecimal longitude) {

    NumberExpression<Double> distanceExpression = acos(sin(radians(Expressions.constant(latitude)))
        .multiply(sin(radians(trailPath.latitude)))
        .add(cos(radians(Expressions.constant(latitude)))
            .multiply(cos(radians(trailPath.latitude)))
            .multiply(cos(radians(Expressions.constant(longitude)).subtract(
                radians(trailPath.longitude))))
        )).multiply(6371000);
    Path<Double> distancePath = Expressions.numberPath(Double.class, "distance");

    return Optional.ofNullable(
        queryFactory
            .select(
                Projections.constructor(NearTrailResponseDto.class,course.courseSeq,trailPath.latitude,trailPath.longitude
                    , Expressions.as(distanceExpression, distancePath))
            )
            .from(mountain)
            .leftJoin(course)
            .on(mountain.mountainSeq.eq(course.mountainSeq))
            .leftJoin(courseTrails)
            .on(course.courseSeq.eq(courseTrails.courseSeq))
            .leftJoin(trail)
            .on(courseTrails.trailSeq.eq(trail.trailSeq))
            .leftJoin(trailPath)
            .on(trail.trailSeq.eq(trailPath.trailSeq))
            .where(mountain.mountainSeq.eq(sequence))
            .groupBy(course.courseSeq)
            .orderBy(((ComparableExpressionBase<Double>) distancePath).asc())
            .fetchFirst()
    );
  }
}
