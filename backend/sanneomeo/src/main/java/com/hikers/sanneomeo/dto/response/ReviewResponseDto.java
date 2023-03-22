package com.hikers.sanneomeo.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReviewResponseDto {

    private Long userSeq;
    private String name;
    private String profileImage;
    private int rate;
    private String content;
}
