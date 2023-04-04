package com.hikers.sanneomeo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RecommendResultResponseDto {
    private GetRecommendCourseResponseDto target;
    private List<GetRecommendCourseResponseDto> result;
}
