package com.hikers.sanneomeo.dto.response;

import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;

@Data
public class TrailDetailResponseDto {

  private String code;
  private Integer no;
  private String name;
  private String introduction;
  private BigDecimal length;
  private String difficulty;
  private Integer upTime;
  private Integer downTime;
  private String risk;

  public TrailDetailResponseDto(String code, Integer no, String name, String introduction, BigDecimal length,
      String difficulty, Integer upTime, Integer downTime, String risk) {
    this.code = code;
    this.no = no;
    this.name = name;
    this.introduction = introduction;
    this.length = length;
    this.difficulty = difficulty;
    this.upTime = upTime;
    this.downTime = downTime;
    this.risk = risk;
  }
}
