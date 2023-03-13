package com.hikers.sanneomeo.repository;


import static com.hikers.sanneomeo.domain.QUser.user;

import com.hikers.sanneomeo.domain.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositorySupport {

  @Autowired
  private JPAQueryFactory query;


  public Optional<User> findUserBySocialId(String social, String socialId){

    return Optional.ofNullable(query
        .select(Projections.fields(User.class,
            user.userSeq, user.level))
        .from(user)
        .where(user.social.eq(social).and(user.socialId.eq(socialId)))
        .fetchOne());

  }



}
