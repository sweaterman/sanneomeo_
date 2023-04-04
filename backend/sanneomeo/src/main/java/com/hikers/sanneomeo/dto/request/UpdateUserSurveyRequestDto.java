package com.hikers.sanneomeo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserSurveyRequestDto {

    private Integer level;
    private Integer region;
    private Integer purpose;
    private Integer time;

}
