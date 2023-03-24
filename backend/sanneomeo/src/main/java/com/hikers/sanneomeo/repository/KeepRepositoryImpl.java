package com.hikers.sanneomeo.repository;

import static com.hikers.sanneomeo.domain.QKeep.keep;
import static com.hikers.sanneomeo.domain.QTrail.trail;
import static com.hikers.sanneomeo.domain.QUser.user;

import com.hikers.sanneomeo.domain.User;
import com.hikers.sanneomeo.dto.response.GetTrailLikeResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class KeepRepositoryImpl implements KeepRepositoryCustom{

  private final JPAQueryFactory query;

  @Override
  public List<GetTrailLikeResponseDto> findLikeByUserWithTrail(Long userSeq) {
    return query
        .select(Projections.fields(GetTrailLikeResponseDto.class),trail.trailSeq,
            trail.name, trail.mountainSeq, trail.difficulty, trail.uptime, trail.downtime,
            trail.length, keep.isKeep)
        .from(keep)
        .join(trail)
        .on(keep.trailSeq.eq(trail.trailSeq))
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
