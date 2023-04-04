package com.hikers.sanneomeo.dto.response;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class NearTrailResponseDto {
private Long trailSeq;
  private BigDecimal latitude;
  private BigDecimal longitude;
  private Double distance;

  public NearTrailResponseDto(Long trailSeq,BigDecimal latitude, BigDecimal longitude, Double distance) {
    this.trailSeq = trailSeq;
    this.latitude = latitude;
    this.longitude = longitude;
    this.distance = distance;
  }
}
