package com.hikers.sanneomeo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Getter
@Table(name = "tbl_mountain")
@NoArgsConstructor
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

    @Column(name = "img")
    private String img;

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "difficulty")
    private String difficulty;


}
