package com.hikers.sanneomeo.service;


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
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

@Service
public class S3UploadService {

  @Autowired
  private YmlConfig ymlConfig;
  private final String bucket = "sanneomeoimg";
  private S3Client s3Client;

  //S3Access 권한 가진 IAM 유저의 public key, private key로 s3client 객체 생성
  @PostConstruct
  private void init(){
    Credentials awsCredentials = ymlConfig.getCredentials().get("aws");

    this.s3Client = S3Client
        .builder()
        .region(Region.AP_NORTHEAST_2)
        .credentialsProvider(StaticCredentialsProvider.create(
            AwsBasicCredentials.create(awsCredentials.getId(), awsCredentials.getSecret())))
        .build()
        ;
  }

  //단일 파일 업로드 기능 -> 로컬 저장을 방지하기 위해 PutObjectRequest 객체 사용
  public String upload(MultipartFile multipartFile, String dirName){
    //유효성 검사
    this.isValidFile(multipartFile);

    return this.putS3(this.getPutObjectRequest(multipartFile,dirName),multipartFile);
  }

  public ArrayList<String> upload(List<MultipartFile> multipartFiles, String dirName) {
    //List 입력을 받을 경우 각 multipart file에 대해 수행
    ArrayList<String> uploadUrls = new ArrayList<>();

    multipartFiles.stream().forEach((multipartFile -> uploadUrls.add(this.upload(multipartFile, dirName))));

    return uploadUrls;
  }

  //PutObjectRequest 생성
  public PutObjectRequest getPutObjectRequest(MultipartFile multipartFile, String dirName) {

    try {
      isValidFile(multipartFile);

      //key= directory 경로 포함 파일 이름 (이미지의 key"
      String key = dirName + "/" + createNewFileName(multipartFile.getOriginalFilename());

      //필요한 ObjectMetadata
      return PutObjectRequest.builder()
              .bucket(bucket)
              .contentType(multipartFile.getContentType())
              .key(key)
              .contentLength(multipartFile.getSize())
              .acl(ObjectCannedACL.PUBLIC_READ)
              .build();
    } catch (Exception e) {
      throw new BaseException(BaseResponseStatus.FILE_CONVERT_ERROR, e.toString());
    }
  }

  private String putS3(PutObjectRequest putObjectRequest, MultipartFile multipartFile) {
    try {
      PutObjectResponse putObjectResponse = s3Client.putObject(putObjectRequest,
          RequestBody.fromBytes(multipartFile.getBytes()));

      if(putObjectResponse.sdkHttpResponse().statusCode()!=200){
        throw new IOException();
      }
      return putObjectRequest.key();
    } catch (IOException e) {
      throw new RuntimeException(e);
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
