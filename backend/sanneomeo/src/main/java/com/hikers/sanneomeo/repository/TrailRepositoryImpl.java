package com.hikers.sanneomeo.repository;

import static com.hikers.sanneomeo.domain.QKeep.keep;
import static com.hikers.sanneomeo.domain.QTrail.trail;

import com.hikers.sanneomeo.dto.response.TrailDetailResponseDto;
import com.hikers.sanneomeo.dto.response.TrailListResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TrailRepositoryImpl implements TrailRepositoryCustom {

  private final JPAQueryFactory queryFactory;


  @Override
  public Optional<TrailDetailResponseDto> findDetailBySequence(Long sequence) {
    return Optional.ofNullable(queryFactory
        .select(
            Projections.constructor(TrailDetailResponseDto.class, trail.mountainSeq, trail.no,
                trail.name, trail.introduction, trail.length, trail.difficulty, trail.uptime,
                trail.downtime, trail.risk)
        )
        .from(trail)
        .where(trail.trailSeq.eq(sequence))
        .fetchFirst());
  }

  @Override
  public List<TrailListResponseDto> findTrailsByMountainSequence(String sequence) {
    return queryFactory.select(
            Projections.constructor(TrailListResponseDto.class, trail.trailSeq, trail.name,
                trail.length,trail.difficulty, keep.trailSeq.count(),trail.uptime)
        )
        .from(trail)
        .leftJoin(keep)
        .on(trail.trailSeq.eq(keep.trailSeq))
        .where(trail.mountainSeq.eq(sequence))
        .groupBy(trail.trailSeq)
        .fetch();
  }

}
