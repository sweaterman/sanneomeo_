package com.hikers.sanneomeo.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Getter
@Table(name = "tbl_mountain")
@NoArgsConstructor
@ToString
public class Mountain {

    @Id
    @Column(name = "mountain_seq", nullable = false)
    private String mountainSeq;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "altitude")
    private BigDecimal altitude;

    @Column(name = "si")
    private String si;

    @Column(name = "gu")
    private String gu;

    @Column(name = "dong")
    private String dong;

    @Column(name = "name")
    private String name;

    @Column(name = "photo")
    private String photo;

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "top100")
    private Integer top100;

    @Column(name = "spring")
    private Integer spring;

    @Column(name = "summer")
    private Integer summer;

    @Column(name = "fall")
    private Integer fall;

    @Column(name = "winter")
    private Integer winter;

    @Column(name = "sunrise")
    private Integer sunrise;

    @Column(name = "sunset")
    private Integer sunset;



}
