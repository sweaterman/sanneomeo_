package com.hikers.sanneomeo.dto.response;

import java.util.List;
import lombok.Data;

@Data
public class MountainSpotResponseDto {

  private String mountainName;
  private String trailName;
  private List<SpotResponseDto> spotList;

  public MountainSpotResponseDto(String mountainName, String trailName) {
    this.mountainName = mountainName;
    this.trailName = trailName;
  }
}
