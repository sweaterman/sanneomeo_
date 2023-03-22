package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.domain.RecordPhoto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.RecordPhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService{

  @Autowired
  RecordPhotoRepository recordPhotoRepository;

  @Override
  public boolean updatePhotoStatus(Long authUserSeq, Long photoSeq) {

    //photoSeq에 맞는 recordPhoto가 없을 경우 exception
    RecordPhoto recordPhoto = recordPhotoRepository.findById(photoSeq).orElseThrow(()-> new BaseException(
        BaseResponseStatus.FAIL));

    //수정을 요청한 userSeq와 해당 recordPhoto를 등록한 userSeq가 다를 경우 권한 exception
    if(recordPhoto.getUserSeq()!=authUserSeq) throw new BaseException(BaseResponseStatus.FAIL);

    //수정한다
    recordPhoto.updateIsPublic();

    return true;
  }

  @Override
  public boolean deletePhoto(Long authUserSeq, Long photoSeq) {

    //photoSeq에 맞는 recordPhoto가 없을 경우 exception
    RecordPhoto recordPhoto = recordPhotoRepository.findById(photoSeq).orElseThrow(()-> new BaseException(
        BaseResponseStatus.FAIL));

    //수정을 요청한 userSeq와 해당 recordPhoto를 등록한 userSeq가 다를 경우 권한 exception
    if(recordPhoto.getUserSeq()!=authUserSeq) throw new BaseException(BaseResponseStatus.FAIL);

    //삭제한다
    recordPhotoRepository.delete(recordPhoto);

    return true;
  }
}
