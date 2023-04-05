package com.hikers.sanneomeo.dto.request;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class NavigationRequestDto {

  private BigDecimal latitude;
  private BigDecimal longitude;
  private Long spotSeq;
  private Long trailSeq;


}
