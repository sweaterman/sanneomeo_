package com.hikers.sanneomeo.dto.response;

import java.math.BigDecimal;
import lombok.Data;

/**
 * packageName    : com.hikers.sanneomeo.dto.response fileName       : TrailListResponseDto author :
 * uiseok oh date           : 2023-03-23 description    :
 * =========================================================== DATE              AUTHOR      NOTE
 * ----------------------------------------------------------- 2023-03-23        uiseok oh        최초
 * 생성
 */
@Data
public class TrailListResponseDto {

  private Long sequence;
  private String name;
  private BigDecimal length;
  private String difficulty;
  private Long keepCount;

  public TrailListResponseDto(Long sequence,String name, BigDecimal length, String difficulty,Long keepCount) {
    this.sequence = sequence;
    this.name = name;
    this.length = length;
    this.difficulty = difficulty;
    this.keepCount =keepCount;
  }

  private Boolean recommend;
}