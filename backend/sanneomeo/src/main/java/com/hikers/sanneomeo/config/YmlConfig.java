package com.hikers.sanneomeo.config;

import com.hikers.sanneomeo.domain.Credentials;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "auth")
@Getter
@Setter
public class YmlConfig {
  private String jwtSecretKey;
  private String afterLoginUrl;
  private Map<String, Credentials> credentials;


}

