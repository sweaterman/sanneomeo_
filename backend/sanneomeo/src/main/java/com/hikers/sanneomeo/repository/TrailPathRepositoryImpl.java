package com.hikers.sanneomeo.repository;

import static com.hikers.sanneomeo.domain.QMountain.mountain;
import static com.hikers.sanneomeo.domain.QTrailPath.trailPath;
import static com.hikers.sanneomeo.domain.QTrail.trail;
import static com.querydsl.core.types.dsl.MathExpressions.acos;
import static com.querydsl.core.types.dsl.MathExpressions.cos;
import static com.querydsl.core.types.dsl.MathExpressions.radians;
import static com.querydsl.core.types.dsl.MathExpressions.sin;

import com.hikers.sanneomeo.dto.response.NearTrailResponseDto;
import com.hikers.sanneomeo.dto.response.PathResponseDto;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

/**
 * packageName    : com.hikers.sanneomeo.repository
 * fileName       : TrailPathRepositoryImpl
 * author         : SSAFY
 * date           : 2023-03-23
 * description    : good
 * ===========================================================
 * DATE              AUTHOR      NOTE
 * -----------------------------------------------------------
 * 2023-03-23        SSAFY       최초 생성
 */
@RequiredArgsConstructor
public class TrailPathRepositoryImpl implements TrailPathRepositoryCustom {

  private final JPAQueryFactory queryFactory;

  @Override
  public List<PathResponseDto> findPathsBySequence(Long sequence) {
    return queryFactory
        .select(
            Projections.constructor(PathResponseDto.class, trailPath.latitude, trailPath.longitude,
                trailPath.altitude)
        )
        .from(trailPath)
        .where(trailPath.trailSeq.eq(sequence))
        .fetch();
  }

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
               Projections.constructor(NearTrailResponseDto.class,trailPath.trailSeq,trailPath.latitude,trailPath.longitude
                   , Expressions.as(distanceExpression, distancePath))
            )
            .from(trailPath)
            .where(trailPath.trailSeq.in(
                JPAExpressions.select(trail.trailSeq)
                    .from(trail)
                    .where(trail.mountainSeq.eq(sequence))
            ))
            .fetchFirst()
    );
  }
}
