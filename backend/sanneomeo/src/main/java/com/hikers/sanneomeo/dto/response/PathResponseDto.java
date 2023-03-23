package com.hikers.sanneomeo.dto.response;

import java.math.BigDecimal;
import lombok.Data;

/**
 * packageName    : com.hikers.sanneomeo.controller fileName       : PathResponseDto author
 * : uiseok oh date           : 2023-03-23 description    :
 * =========================================================== DATE              AUTHOR       NOTE
 * ----------------------------------------------------------- 2023-03-23         uiseok oh       최초
 * 생성
 */
@Data
public class PathResponseDto {

  private BigDecimal latitude;
  private BigDecimal longitude;
  private BigDecimal altitude;

  public PathResponseDto(BigDecimal latitude, BigDecimal longitude, BigDecimal altitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }
}
