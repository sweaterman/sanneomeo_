package com.hikers.sanneomeo.dto.response;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class LocationResponseDto {

  private BigDecimal latitude;
  private BigDecimal longitude;

  public LocationResponseDto(BigDecimal latitude, BigDecimal longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
