package com.hikers.sanneomeo.utils;

import org.springframework.beans.factory.annotation.Value;

public class S3UploadUtils {

  @Value("${auth.aws.public-key}")
  private String publicKey;

  @Value("${auth.aws.private-key}")
  private String privateKey;


}
