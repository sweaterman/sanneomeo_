package com.example.mountain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import lombok.Setter;
import lombok.ToString;


@Entity
@Getter
@Table(name = "tbl_mountain")
@Setter
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

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name="photo")
    private String photo;


}
