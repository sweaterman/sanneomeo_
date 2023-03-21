package com.hikers.sanneomeo.controller;

import static com.hikers.sanneomeo.exception.BaseResponseStatus.UNAUTHORIZED_USER;

import com.hikers.sanneomeo.dto.request.UploadImagesRequestDto;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.MountainService;
import com.hikers.sanneomeo.service.S3UploadService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/mountain")
public class MountainController {

  private S3UploadService s3UploadService;
  private MountainService mountainService;

  @Autowired
  private void setMountainController(S3UploadService s3UploadService, MountainService mountainService){
    this.s3UploadService = s3UploadService;
    this.mountainService = mountainService;
  }

  @PostMapping("/image")
  public BaseResponseDto<String> uploadImages(@ModelAttribute UploadImagesRequestDto uploadImagesRequestDto){
    try{
      //요청 내부의 userSeq와 인증된 userSeq가 다를 경우
      Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
      if(authUserSeq!= uploadImagesRequestDto.getUserSeq()){
        throw new BaseException(UNAUTHORIZED_USER);
      }

      //이미지 업로드 후 링크 가져오기
      List<String> urlList = s3UploadService.uploadImagesToS3(uploadImagesRequestDto.getImages());


    } catch(Exception e){

    }

    System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal().getClass());

    System.out.println(13);


    return null;
  }
}
