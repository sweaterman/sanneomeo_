package com.hikers.sanneomeo.dto.response;

import lombok.Data;

@Data
public class NearMountainResponseDto {

  private String mountainSeq;
  private Double distance;

  public NearMountainResponseDto(String mountainSeq, Double distance) {
    this.mountainSeq = mountainSeq;
    this.distance = distance;
  }
}
