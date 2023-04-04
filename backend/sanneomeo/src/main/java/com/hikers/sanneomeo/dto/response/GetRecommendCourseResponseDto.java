package com.hikers.sanneomeo.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Objects;

@Data
public class GetRecommendCourseResponseDto {

    private Long sequence;
    private String name;
    private String mountainSeq;
    private String difficulty;
    private Integer time;
    private BigDecimal length;
    private Boolean isLike;

    public GetRecommendCourseResponseDto(Long sequence, String name, String mountainSeq, String difficulty, Integer time, BigDecimal length, Boolean isLike) {
        this.sequence = sequence;
        this.name = name;
        this.mountainSeq = mountainSeq;
        this.difficulty = difficulty;
        this.time = time;
        this.length = length;
        this.isLike = Objects.requireNonNullElse(isLike, false);
    }

    public GetRecommendCourseResponseDto(Long sequence, String name, String mountainSeq, String difficulty, Integer time, BigDecimal length) {
        this.sequence = sequence;
        this.name = name;
        this.mountainSeq = mountainSeq;
        this.difficulty = difficulty;
        this.time = time;
        this.length = length;
        this.isLike = false;
    }
}
