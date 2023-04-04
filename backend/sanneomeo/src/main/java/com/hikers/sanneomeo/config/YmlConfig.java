package com.hikers.sanneomeo.config;

import com.hikers.sanneomeo.domain.Credentials;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "auth")
@Getter
@Setter
public class YmlConfig {
  private String jwtSecretKey;
  private String afterLoginUrl;
  private Map<String, Credentials> credentials;
  //날씨 api
  private String weatherServiceKey;
  private String weatherEndPoint;
  private String flaskEndPoint;
  //엘라스틱
  private String elasticSearchHost;

}