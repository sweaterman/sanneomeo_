package com.hikers.sanneomeo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class GetRecommendCourseResponseDto {

    private Long trailSeq;
    private String name;
    private String mountainSeq;
    private String difficulty;
    private Integer time;
    private BigDecimal length;
    private boolean isKeep;
}
