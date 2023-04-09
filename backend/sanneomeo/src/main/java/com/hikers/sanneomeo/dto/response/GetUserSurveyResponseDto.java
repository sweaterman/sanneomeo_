package com.hikers.sanneomeo.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetUserSurveyResponseDto {

    private boolean isLogin;
    private Integer level;
    private Integer region;
    private Integer purpose;
    private Integer time;

    private String modifiedAt;

}
