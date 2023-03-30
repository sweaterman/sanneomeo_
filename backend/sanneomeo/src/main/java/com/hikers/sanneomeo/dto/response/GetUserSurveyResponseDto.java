package com.hikers.sanneomeo.dto.response;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetUserSurveyResponseDto {

    private boolean isLogined;
    private Integer level;
    private Integer region;
    private Integer purpose;
    private Integer time;
    private Timestamp modifiedAt;

}
