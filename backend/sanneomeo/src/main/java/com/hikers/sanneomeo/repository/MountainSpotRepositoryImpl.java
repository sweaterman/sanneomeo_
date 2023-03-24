package com.hikers.sanneomeo.repository;

import static com.hikers.sanneomeo.domain.QMountain.mountain;
import static com.hikers.sanneomeo.domain.QMountainSpot.mountainSpot;
import static com.querydsl.core.types.dsl.MathExpressions.acos;
import static com.querydsl.core.types.dsl.MathExpressions.cos;
import static com.querydsl.core.types.dsl.MathExpressions.radians;
import static com.querydsl.core.types.dsl.MathExpressions.sin;

import com.hikers.sanneomeo.dto.response.SpotResponseDto;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;

/**
 * packageName    : com.hikers.sanneomeo.repository fileName       : MountainSpotRepositoryImpl
 * author         : SSAFY date           : 2023-03-24 description    :
 * <p>
 * =========================================================== DATE              AUTHOR NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-03-24        SSAFY       최초 생성
 */
@RequiredArgsConstructor
public class MountainSpotRepositoryImpl implements MountainSpotRepositoryCustom {

  private final JPAQueryFactory jpaQueryFactory;

  @Override
  public List<SpotResponseDto> findSpotsByMountainSequence(String sequence) {
    return jpaQueryFactory
        .select(
            Projections.constructor(SpotResponseDto.class, mountainSpot.mountainSeq,
                mountainSpot.name, mountainSpot.code, mountainSpot.introduction, mountainSpot.etc,
                mountainSpot.latitude, mountainSpot.longitude)
        )
        .from(mountain)
        .leftJoin(mountainSpot)
        .on(mountain.mountainSeq.eq(mountainSpot.mountainSeq))
        .where(mountain.mountainSeq.eq(sequence))
        .fetch();

  }

  @Override
  public List<SpotResponseDto> findSpotsByMountainSequenceAndCoordinate(String sequence,
      BigDecimal latitude, BigDecimal longitude) {

    NumberExpression<Double> distanceExpression = acos(sin(radians(Expressions.constant(latitude)))
        .multiply(sin(radians(mountainSpot.latitude)))
        .add(cos(radians(Expressions.constant(latitude)))
            .multiply(cos(radians(mountainSpot.latitude)))
            .multiply(cos(radians(Expressions.constant(longitude)).subtract(
                radians(mountainSpot.longitude))))
        )).multiply(6371000);
    Path<Double> distancePath = Expressions.numberPath(Double.class, "distance");

    return jpaQueryFactory
        .select(
            Projections.constructor(SpotResponseDto.class, mountainSpot.mountainSeq,
                mountainSpot.name, mountainSpot.code, mountainSpot.introduction, mountainSpot.etc,
                mountainSpot.latitude, mountainSpot.longitude
                , Expressions.as(distanceExpression, distancePath))
        )
        .from(mountain)
        .leftJoin(mountainSpot)
        .on(mountain.mountainSeq.eq(mountainSpot.mountainSeq))
        .where(mountain.mountainSeq.eq(sequence))
        .orderBy(((ComparableExpressionBase<Double>) distancePath).asc())
        .fetch();
  }


}
