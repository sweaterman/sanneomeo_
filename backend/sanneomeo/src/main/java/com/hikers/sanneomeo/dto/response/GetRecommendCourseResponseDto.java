package com.hikers.sanneomeo.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class GetRecommendCourseResponseDto {

    private Long courseSeq;
    private String name;
    private String mountainSeq;
    private String difficulty;
    private Integer time;
    private BigDecimal length;
    private boolean isKeep;
}
