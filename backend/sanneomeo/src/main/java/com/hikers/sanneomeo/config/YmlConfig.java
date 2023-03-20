package com.hikers.sanneomeo.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "auth.oauth2")
@Getter
@Setter
public class YmlConfig {
  private String redirectUri;

  private String kakaoClientId;
  private String googleClientId;
  private String googleClientSecret;

}