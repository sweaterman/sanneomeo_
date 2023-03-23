package com.hikers.sanneomeo.repository;


import static com.hikers.sanneomeo.domain.QUser.user;
import static com.hikers.sanneomeo.domain.QRecordPhoto.recordPhoto;
import com.hikers.sanneomeo.domain.User;
import com.hikers.sanneomeo.dto.response.PhotoResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RecordPhotoRepositorySupport {

  @Autowired
  private JPAQueryFactory query;


  public Optional<User> createRecordPhotoRepository(String social, String socialId){

    return Optional.ofNullable(query
        .select(Projections.fields(User.class,
            user.userSeq, user.level))
        .from(user)
        .where(user.social.eq(social).and(user.socialId.eq(socialId)))
        .fetchOne());

  }


  public List<PhotoResponseDto> findPhotosBymountainSequence(Long sequence){
    return query
        .select(
            Projections.constructor(PhotoResponseDto.class,recordPhoto.userSeq,recordPhoto.image,
                recordPhoto.latitude,recordPhoto.longitude,recordPhoto.isPublic,recordPhoto.createdAt)
        )
        .from(recordPhoto)
        .where(recordPhoto.mountainSeq.eq(sequence))
        .fetch();
  }

}
