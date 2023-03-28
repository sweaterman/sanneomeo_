package com.hikers.sanneomeo.dto.request;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UploadImagesRequestDto {
  private Long userSeq;
  private Long mountainSeq;
  private BigDecimal latitude;
  private BigDecimal longitude;
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date date;
  private List<MultipartFile> photos;

}
