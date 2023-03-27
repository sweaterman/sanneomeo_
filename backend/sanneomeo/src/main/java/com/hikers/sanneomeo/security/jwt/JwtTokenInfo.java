package com.hikers.sanneomeo.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
@AllArgsConstructor
public class JwtTokenInfo {
  private String accessToken;
  private String refreshToken;
}
