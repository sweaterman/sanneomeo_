package com.hikers.sanneomeo.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
public class MountainSimpleInfoResponseDto {

    //계절산 보여줄때 들어가는 정보

    //산 seq
    private String mountainSeq;

    // 산이름
    private String name;

    //산 이미지
    private String photo;

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

}
