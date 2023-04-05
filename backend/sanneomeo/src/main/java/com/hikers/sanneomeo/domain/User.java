package com.hikers.sanneomeo.domain;

import com.hikers.sanneomeo.dto.request.UpdateUserSurveyRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Getter
@Table(name = "tbl_user")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq", nullable = false)
    private Long userSeq;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "gender")
    private String gender;

    @Column(name = "age")
    private Integer age;

    @Column(name = "si")
    private String si;

    @Column(name = "gu")
    private String gu;

    @Column(name = "dong")
    private String dong;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "level")
    private Integer level;

    @Column(name = "difficulty")
    private Integer difficulty;

    @Column(name = "prefer_region")
    private Integer preferRegion;

    @Column(name = "purpose")
    private Integer purpose;

    @Column(name = "prefer_climb_duration")
    private Integer preferClimbDuration;

    @Column(name = "social")
    private String social;

    @Column(name = "social_id")
    private String socialId;

    @Column(name = "total_duration")
    private String totalDuration;

    @Column(name = "total_distance")
    private String totalDistance;

    @Column(name = "total_number")
    private Integer totalNumber;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    public void updateUserServey(UpdateUserSurveyRequestDto updateUserSurveyRequestDto){
        this.difficulty = updateUserSurveyRequestDto.getLevel();
        this.preferClimbDuration = updateUserSurveyRequestDto.getTime();
        this.preferRegion = updateUserSurveyRequestDto.getRegion();
        this.purpose = updateUserSurveyRequestDto.getPurpose();
    }

}
