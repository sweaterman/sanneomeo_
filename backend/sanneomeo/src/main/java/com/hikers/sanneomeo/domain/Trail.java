package com.hikers.sanneomeo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "tbl_trail")
@Getter
@NoArgsConstructor
public class Trail {
    @Id
    @Column(name = "trail_seq", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trailSeq;

    @Column(name = "mountain_seq", nullable = false)
    private String mountainSeq;

    @Column(name = "no")
    private Integer no;

    @Column(name = "name")
    private String name;

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "length")
    private BigDecimal length;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "uptime")
    private Integer uptime;

    @Column(name = "downtime")
    private Integer downtime;

    @Column(name = "risk")
    private String risk;

}
