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

  private Integer time;

  public TrailListResponseDto(Long sequence,String name, BigDecimal length, String difficulty,Long keepCount,Integer time) {
    this.sequence = sequence;
    this.name = name;
    this.length = length;
    this.difficulty = difficulty;
    this.keepCount =keepCount;
    this.time = time;
  }

  private Boolean recommend;
}
