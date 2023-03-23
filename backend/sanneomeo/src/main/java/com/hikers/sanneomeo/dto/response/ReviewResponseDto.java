package com.hikers.sanneomeo.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
public class ReviewResponseDto {

    private Long userSeq;
    private String nickname;
    private String profileImage;
    private Long reviewSeq;
    private int rate;
    private String content;
    private Timestamp createdAt;
    private boolean writer;


}
