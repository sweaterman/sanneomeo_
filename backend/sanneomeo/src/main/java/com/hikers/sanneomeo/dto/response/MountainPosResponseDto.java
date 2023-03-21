package com.hikers.sanneomeo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MountainPosResponseDto {

    //산이름
    private String name;

    //위도
    private BigDecimal latitude;

    //경도
    private BigDecimal longitude;

    //고도
    private BigDecimal altitude;

    //난이도
    private String difficulty;

    //찜여부
    private boolean isKeep;
}
