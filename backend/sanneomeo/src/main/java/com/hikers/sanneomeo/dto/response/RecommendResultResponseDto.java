package com.hikers.sanneomeo.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class RecommendResultResponseDto {
    private RecommendCourseDto target;
    private List<RecommendCourseDto> result;
}
