package com.hikers.sanneomeo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetRecommendCourseResponseDto {

    private Long sequence;
    private String name;
    private String mountainSeq;
    private String difficulty;
    private Integer time;
    private BigDecimal length;
    private boolean isLike;
}
