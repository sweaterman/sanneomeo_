package com.hikers.sanneomeo.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor

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


    @Builder
    public MountainPosResponseDto(String name, BigDecimal latitude, BigDecimal longitude, BigDecimal altitude, String difficulty) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.difficulty = difficulty;

    }
}
