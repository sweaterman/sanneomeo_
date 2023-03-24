package com.hikers.sanneomeo.dto.response;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * packageName    : com.hikers.sanneomeo.dto.response fileName       : PhotoResponseDto author
 * : SSAFY date           : 2023-03-23 description    :
 * <p>
 * =========================================================== DATE              AUTHOR
 * NOTE -----------------------------------------------------------
 * <p>
 * 2023-03-23        SSAFY       최초 생성
 */
@Data
public class PhotoResponseDto {
  private Long userSeq;
  private String image;
  private BigDecimal latitude;
  private BigDecimal longitude;
  private boolean isPublic;
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date date;
  private Timestamp createdAt;

  public PhotoResponseDto(Long userSeq, String image, BigDecimal latitude, BigDecimal longitude,
      boolean isPublic, Timestamp createdAt) {
    this.userSeq = userSeq;
    this.image = image;
    this.latitude = latitude;
    this.longitude = longitude;
    this.isPublic = isPublic;
    this.createdAt = createdAt;
  }
}
