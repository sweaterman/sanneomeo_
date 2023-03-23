package com.hikers.sanneomeo.dto.response;

import lombok.Builder;

public class TrailDetailResponseDto {

  private String code;
  private int no;
  private String name;
  private String introduction;
  private float length;
  private String difficulty;
  private int upTime;
  private int downTime;
  private String risk;

  public TrailDetailResponseDto(String code, int no, String name, String introduction, float length,
      String difficulty, int upTime, int downTime, String risk) {
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
