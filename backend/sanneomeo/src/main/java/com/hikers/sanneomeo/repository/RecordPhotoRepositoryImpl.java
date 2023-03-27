package com.hikers.sanneomeo.repository;


import static com.hikers.sanneomeo.domain.QUser.user;
import static com.hikers.sanneomeo.domain.QRecordPhoto.recordPhoto;

import com.hikers.sanneomeo.domain.RecordPhoto;
import com.hikers.sanneomeo.domain.User;
import com.hikers.sanneomeo.dto.response.PhotoResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

public class RecordPhotoRepositoryImpl implements RecordPhotoRepositoryCustom{

  @Autowired
  private JPAQueryFactory query;


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

  @Override
  public List<RecordPhoto> findRecordPhotoByMonth(Long userSeq, Integer month) {
    return query
        .select(
            Projections.fields(RecordPhoto.class,recordPhoto.image, recordPhoto.mountainSeq, recordPhoto.date)
        )
        .from(recordPhoto)
        .where(recordPhoto.userSeq.eq(userSeq).and(
            recordPhoto.date.month().eq(month)
        ))
        .fetch();
  }

}
