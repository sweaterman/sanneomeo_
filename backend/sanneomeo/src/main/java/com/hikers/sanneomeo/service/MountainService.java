package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.domain.RecordPhoto;
import com.hikers.sanneomeo.dto.request.UploadImagesRequestDto;
import com.hikers.sanneomeo.repository.MountainRepository;
import com.hikers.sanneomeo.repository.RecordPhotoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MountainService {

  @Autowired
  private RecordPhotoRepository recordPhotoRepository;

  @Transactional
  public boolean createRecordPhotos(UploadImagesRequestDto uploadImagesRequestDto, List<String> uploadImgUrls, Long mountainSeq){
    uploadImgUrls.stream().forEach(
        (uploadImgUrl) -> {
          RecordPhoto recordPhoto = RecordPhoto.builder()
              .mountainSeq(mountainSeq)
              .image(uploadImgUrl)
              .longitude(uploadImagesRequestDto.getLongitude())
              .latitude(uploadImagesRequestDto.getLatitude())
              .userSeq(uploadImagesRequestDto.getUserSeq())
              .build();

          recordPhotoRepository.save(recordPhoto);
        }
    );

    return true;
  }

}
