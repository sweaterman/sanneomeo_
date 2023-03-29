package com.hikers.sanneomeo.dto.response;

import java.math.BigDecimal;

import lombok.*;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Setter
public class GetTrailLikeResponseDto {
//  등산로idx, 산idx, 난이도, 소요시간, 찜여부, 길이, 이름, 추천여부?

  private Long trailSeq;
  private String name;
  private String mountainSeq;
  private String difficulty;
  private Integer uptime;
  private Integer downtime;
  private BigDecimal length;
  private boolean isKeep;
}