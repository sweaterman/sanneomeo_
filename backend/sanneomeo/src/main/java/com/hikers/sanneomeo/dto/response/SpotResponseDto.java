package com.hikers.sanneomeo.dto.response;

import java.math.BigDecimal;
import lombok.Data;

/**
 * packageName    : com.hikers.sanneomeo.dto.response fileName       : SpotResponseDto author :
 * SSAFY date           : 2023-03-24 description    :
 * <p>
 * =========================================================== DATE              AUTHOR NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-03-24        SSAFY       최초 생성
 */
@Data
public class SpotResponseDto {

  private Long spotSeq;
  private String mountainSeq;
  private String name;
  private String code;
  private String introduction;
  private String etc;
  private BigDecimal latitude;
  private BigDecimal longitude;
  private Double distance;

  public SpotResponseDto(Long spotSeq,String mountainSeq, String name, String code, String introduction,
      String etc, BigDecimal latitude, BigDecimal longitude, Double distance) {
    this.spotSeq=spotSeq;
    this.mountainSeq = mountainSeq;
    this.name = name;
    this.code = code;
    this.introduction = introduction;
    this.etc = etc;
    this.latitude = latitude;
    this.longitude = longitude;
    this.distance = distance;
  }

  public SpotResponseDto(Long spotSeq,String mountainSeq, String name, String code, String introduction,
      String etc, BigDecimal latitude, BigDecimal longitude) {
    this.spotSeq=spotSeq;
    this.mountainSeq = mountainSeq;
    this.name = name;
    this.code = code;
    this.introduction = introduction;
    this.etc = etc;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
