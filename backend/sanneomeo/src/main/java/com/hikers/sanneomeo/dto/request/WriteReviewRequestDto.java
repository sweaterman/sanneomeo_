package com.hikers.sanneomeo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WriteReviewRequestDto {

    private String mountainSeq;

    private Long userSeq;

    private String content;

    private Integer rate;

}
