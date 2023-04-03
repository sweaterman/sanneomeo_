package com.hikers.sanneomeo.dto.response;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MountainSearchResponseDto {

    Long mountainSeq;
    String name;
    String si;
    String gu;
    String dong;
    BigDecimal latitude;
    BigDecimal longitude;
    BigDecimal altitude;
    String difficulty;

}
