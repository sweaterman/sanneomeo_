package com.hikers.sanneomeo.repository;

import static com.hikers.sanneomeo.domain.QCourse.course;
import static com.hikers.sanneomeo.domain.QMountain.mountain;
import static com.hikers.sanneomeo.domain.QMountainSpot.mountainSpot;
import static com.querydsl.core.types.dsl.MathExpressions.acos;
import static com.querydsl.core.types.dsl.MathExpressions.cos;
import static com.querydsl.core.types.dsl.MathExpressions.radians;
import static com.querydsl.core.types.dsl.MathExpressions.sin;

import com.hikers.sanneomeo.dto.response.LocationResponseDto;
import com.hikers.sanneomeo.dto.response.SpotResponseDto;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MountainSpotRepositoryImpl implements MountainSpotRepositoryCustom {

  private final JPAQueryFactory jpaQueryFactory;

  @Override
  public List<SpotResponseDto> findSpotsByMountainSequence(Long sequence) {//trail -> course seq
    return jpaQueryFactory
        .select(
            Projections.constructor(SpotResponseDto.class, mountainSpot.spotSeq,mountainSpot.mountainSeq,
                mountainSpot.name, mountainSpot.code, mountainSpot.introduction, mountainSpot.etc,
                mountainSpot.latitude, mountainSpot.longitude)
        )
        .from(course)
        .rightJoin(mountain)
        .on(course.mountainSeq.eq(mountain.mountainSeq))
        .leftJoin(mountainSpot)
        .on(mountain.mountainSeq.eq(mountainSpot.mountainSeq))
        .where(course.courseSeq.eq(sequence))
        .fetch();

  }

  @Override
  public List<SpotResponseDto> findSpotsByMountainSequenceAndCoordinate(Long sequence,
      BigDecimal latitude, BigDecimal longitude) {//trail -> course seq

    NumberExpression<Double> distanceExpression = acos(sin(radians(Expressions.constant(latitude)))
        .multiply(sin(radians(mountainSpot.latitude)))
        .add(cos(radians(Expressions.constant(latitude)))
            .multiply(cos(radians(mountainSpot.latitude)))
            .multiply(cos(radians(Expressions.constant(longitude)).subtract(
                radians(mountainSpot.longitude))))
        )).multiply(6371000);
    Path<Double> distancePath = Expressions.numberPath(Double.class, "distance");

//    return jpaQueryFactory
//        .select(
//            Projections.constructor(SpotResponseDto.class, mountainSpot.mountainSeq,
//                mountainSpot.name, mountainSpot.code, mountainSpot.introduction, mountainSpot.etc,
//                mountainSpot.latitude, mountainSpot.longitude
//                , Expressions.as(distanceExpression, distancePath))
//        )
//        .from(trail)
//        .leftJoin(mountain)
//        .on(trail.mountainSeq.eq(mountain.mountainSeq))
//        .leftJoin(mountainSpot)
//        .on(trail.mountainSeq.eq(mountainSpot.mountainSeq))
//        .where(trail.trailSeq.eq(sequence))
//        .orderBy(((ComparableExpressionBase<Double>) distancePath).asc())
//        .fetch();

    return jpaQueryFactory
        .select(
            Projections.constructor(SpotResponseDto.class,mountainSpot.spotSeq, mountainSpot.mountainSeq,
                mountainSpot.name, mountainSpot.code, mountainSpot.introduction, mountainSpot.etc,
                mountainSpot.latitude, mountainSpot.longitude
                , Expressions.as(distanceExpression, distancePath))
        )
        .from(course)
        .rightJoin(mountain)
        .on(course.mountainSeq.eq(mountain.mountainSeq))
        .leftJoin(mountainSpot)
        .on(mountain.mountainSeq.eq(mountainSpot.mountainSeq))
        .where(course.courseSeq.eq(sequence))
        .orderBy(((ComparableExpressionBase<Double>) distancePath).asc())
        .fetch();
  }

  @Override
  public Optional<LocationResponseDto> getSpotInfo(Long spotSeq) {
    return Optional.ofNullable(
        jpaQueryFactory
            .select(
                Projections.constructor(LocationResponseDto.class,mountainSpot.latitude,mountainSpot.longitude)
            )
            .from(mountainSpot)
            .where(mountainSpot.spotSeq.eq(spotSeq))
            .fetchFirst()
    );
  }


}
