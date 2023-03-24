package com.hikers.sanneomeo.dto.response;

import java.math.BigDecimal;
import java.util.List;
import javax.persistence.Column;
import lombok.Data;

/**
 * packageName    : com.hikers.sanneomeo.dto.response fileName       : MountainDetailResponseDto
 * author         : SSAFY date           : 2023-03-23 description    :
 * <p>
 * =========================================================== DATE              AUTHOR
 * NOTE -----------------------------------------------------------
 * <p>
 * 2023-03-23        SSAFY       최초 생성
 */
@Data
public class MountainDetailResponseDto {

  private String mountainSeq;

  private BigDecimal latitude;

  private BigDecimal longitude;

  private BigDecimal altitude;

  private String si;

  private String gu;

  private String dong;

  private String name;

  private String img;

  private String introduction;

  private String difficulty;

  private Integer top100;

  private Integer spring;

  private Integer summer;

  private Integer fall;

  private Integer winter;

  private Integer sunrise;

  private Integer sunset;

  public MountainDetailResponseDto(String mountainSeq, BigDecimal latitude, BigDecimal longitude,
      BigDecimal altitude, String si, String gu, String dong, String name, String img,
      String introduction, String difficulty, Integer top100, Integer spring, Integer summer,
      Integer fall, Integer winter, Integer sunrise, Integer sunset) {
    this.mountainSeq = mountainSeq;
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
    this.si = si;
    this.gu = gu;
    this.dong = dong;
    this.name = name;
    this.img = img;
    this.introduction = introduction;
    this.difficulty = difficulty;
    this.top100 = top100;
    this.spring = spring;
    this.summer = summer;
    this.fall = fall;
    this.winter = winter;
    this.sunrise = sunrise;
    this.sunset = sunset;
  }
}
