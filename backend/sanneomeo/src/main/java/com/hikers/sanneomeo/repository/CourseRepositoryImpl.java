package com.hikers.sanneomeo.repository;

import static com.hikers.sanneomeo.domain.QKeep.keep;
import static com.querydsl.core.types.dsl.MathExpressions.acos;
import static com.querydsl.core.types.dsl.MathExpressions.cos;
import static com.querydsl.core.types.dsl.MathExpressions.radians;
import static com.querydsl.core.types.dsl.MathExpressions.sin;

import com.hikers.sanneomeo.dto.response.MountainDetailResponseDto;
import com.hikers.sanneomeo.dto.response.MountainSpotResponseDto;
import com.hikers.sanneomeo.dto.response.RecommendCourseDto;
import com.hikers.sanneomeo.dto.response.NearTrailResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.math.BigDecimal;
import java.util.List;
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

  @Override
  public List<TrailListResponseDto> findTrailsByMountainSequence(String sequence) {
    return queryFactory.select(
          Projections.constructor(TrailListResponseDto.class, course.courseSeq, course.name,
              course.length,
              new CaseBuilder()
                  .when(course.difficultyMean.goe(new BigDecimal("1.3"))).then("어려움")
                  .when(course.difficultyMean.gt(new BigDecimal("1.0"))).then("중간")
                  .otherwise("쉬움")
              ,
              new CaseBuilder()
                  .when(keep.isKeep.eq(true)).then(keep.courseSeq).otherwise(Expressions.nullExpression()).count()
              ,course.time)
          )
        .from(course)
        .leftJoin(keep)
        .on(course.courseSeq.eq(keep.courseSeq))
        .where(course.mountainSeq.eq(sequence))
        .groupBy(course.courseSeq)
        .fetch();
  }

    @Override
    public Optional<RecommendCourseDto> findCourseByCourseSequenceAndUserSeq(Long courseSeq, Long userSeq) {
        return Optional.ofNullable(queryFactory
                .select(Projections.constructor(RecommendCourseDto.class,
                        course.courseSeq, course.name, course.mountainSeq,
                        new CaseBuilder()
                                .when(course.difficultyMean.goe(BigDecimal.valueOf(1.3))).then("어려움")
                                .when(course.difficultyMean.lt(BigDecimal.valueOf(1.3)).and(course.difficultyMean.gt(BigDecimal.valueOf(1.0)))).then("중간")
                                .otherwise("쉬움")
                                .as("difficulty"),
                        course.time, course.length, keep.isKeep.as("isLike")))
                .from(course)
                .leftJoin(keep).on(course.courseSeq.eq(keep.courseSeq).and(keep.userSeq.eq(userSeq)))
                .where(course.courseSeq.eq(courseSeq))
                .fetchOne());

    }

    @Override
    public Optional<RecommendCourseDto> findCourseByCourseSequence(Long courseSeq) {
        return Optional.ofNullable(queryFactory
                .select(Projections.constructor(RecommendCourseDto.class,
                        course.courseSeq, course.name, course.mountainSeq,
                        new CaseBuilder()
                                .when(course.difficultyMean.goe(BigDecimal.valueOf(1.3))).then("어려움")
                                .when(course.difficultyMean.lt(BigDecimal.valueOf(1.3)).and(course.difficultyMean.gt(BigDecimal.valueOf(1.0)))).then("중간")
                                .otherwise("쉬움"),

                        course.time, course.length))
                .from(course)
                .where(course.courseSeq.eq(courseSeq))
                .fetchOne());
    }

  @Override
  public Optional<MountainSpotResponseDto> findMountainAndCourseNameBySequence(Long courseSeq) {
    return Optional.ofNullable(
        queryFactory
            .select(
                Projections.constructor(MountainSpotResponseDto.class,mountain.name,course.name)
            )
            .from(course)
            .leftJoin(mountain)
            .on(course.mountainSeq.eq(mountain.mountainSeq))
            .where(course.courseSeq.eq(courseSeq))
            .fetchFirst()
    );
  }
}
