package com.hikers.sanneomeo.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class ChallengeResponseDto {

    //산 seq
    private String mountainSeq;

    // 산이름
    private String name;

    //산 이미지
    private String img;

    // 산 고도
    private BigDecimal altitude;

    //시
    private String si;

    //구
    private String gu;

    //동
    private String dong;

    //난이도
    private String difficulty;

    //완등여부
    private boolean isConquer;

}
