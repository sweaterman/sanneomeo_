package com.hikers.sanneomeo.repository;

import static com.hikers.sanneomeo.domain.QTrailPath.trailPath;

import com.hikers.sanneomeo.dto.response.PathResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
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
}
