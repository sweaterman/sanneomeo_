package com.hikers.sanneomeo.domain;

import lombok.Getter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Getter
@Table(name = "tbl_mountain")
public class Mountain {

    @Id
    @Column(name = "mountain_seq", nullable = false)
    private String mountainSeq;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "si")
    private String si;

    @Column(name = "gu")
    private String gu;

    @Column(name = "dong")
    private String dong;

    @Column(name = "altitude")
    private Integer altitude;

    @Column(name = "name")
    private String name;

    @Column(name = "img")
    private String img;

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "difficulty")
    private String difficulty;


}
