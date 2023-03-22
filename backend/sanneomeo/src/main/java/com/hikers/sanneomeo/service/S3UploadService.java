package com.hikers.sanneomeo.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.domain.Credentials;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class S3UploadService {

  @Autowired
  private YmlConfig ymlConfig;
  private final String bucket = "sanneomeoimg";
  private AmazonS3 amazonS3Client;
  @PostConstruct
  private void init(){
    Credentials awsCredentials = ymlConfig.getCredentials().get("aws");

    this.amazonS3Client = AmazonS3ClientBuilder
        .standard()
        .withCredentials(
            new AWSStaticCredentialsProvider(new BasicAWSCredentials(awsCredentials.getId(), awsCredentials.getSecret())))
        .withRegion(Regions.AP_NORTHEAST_2)
        .build();
  }

  public String upload(MultipartFile multipartFile, String dirName){
    //유효성 검사
    this.isValidFile(multipartFile);

    //업로드 가능한 File 형태로 변환
    File uploadFile = convert(multipartFile).orElseThrow(()->new BaseException(BaseResponseStatus.FILE_SAVE_ERROR));

    //S3로 업로드하기
    String fileName = dirName+"/"+uploadFile.getName();
    String uploadUrl = putS3(uploadFile, bucket, fileName);

    return uploadUrl;
  }

  public ArrayList<String> upload(List<MultipartFile> multipartFiles, String dirName) {
    //List 입력을 받을 경우 각 multipart file에 대해 수행
    ArrayList<String> uploadUrls = new ArrayList<>();

    multipartFiles.stream().forEach((multipartFile -> uploadUrls.add(this.upload(multipartFile, dirName))));

    return uploadUrls;
  }

  private String putS3(File uploadFile, String bucket, String fileName) {
    try {
      //public read 권한으로 upload
      amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
          CannedAccessControlList.PublicRead));

      return amazonS3Client.getUrl(bucket, fileName).toString();
    } catch (AmazonServiceException ase) {
      throw new BaseException(BaseResponseStatus.FILE_SAVE_ERROR);
    } catch (SdkClientException sce) {
      throw new BaseException(BaseResponseStatus.S3_CLIENT_ERROR);
    }
  }

  //파일 형태로 convert
  private Optional<File> convert(MultipartFile multipartFile) {
    try {
      isValidFile(multipartFile);

      String originalFileName = multipartFile.getOriginalFilename();  //들어온 파일명
      String newFileName = createNewFileName(originalFileName); //난수회된 파일명

      File file = new File(newFileName);
      if(file.createNewFile()) {
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(multipartFile.getBytes());
        fos.close();
        return Optional.of(file);
      }
      return Optional.of(null);
    } catch (Exception e) {
      throw new BaseException(BaseResponseStatus.FILE_CONVERT_ERROR, e.toString());
    }
  }

    //파일명 난수화
  private String createNewFileName(String originalFileName) {
    String extension = getExtension(originalFileName);
    String uuid = UUID.randomUUID().toString();
    return uuid+ "." + extension;
  }

  //파일 확장자 검사 후 추출
  private String getExtension(String originalFileName) {

    try{
      String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1)
          .toLowerCase();
      if(!(extension.equals("png") || extension.equals("jpg") || extension.equals("jpeg"))) {
        throw new BaseException(BaseResponseStatus.FILE_FORMAT_ERROR);
      }
      return extension;
    } catch(IndexOutOfBoundsException iob){
      throw new BaseException(BaseResponseStatus.FILE_FORMAT_ERROR);
    }
  }

  //제대로 된 파일인지 확인
  private void isValidFile(MultipartFile file) throws BaseException {
    if (file.isEmpty() || file.getSize() == 0) {
      throw new BaseException(BaseResponseStatus.FILE_UPLOAD_ERROR);
    }
  }


}
