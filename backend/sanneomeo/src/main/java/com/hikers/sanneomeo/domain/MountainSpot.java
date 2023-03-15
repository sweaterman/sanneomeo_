package com.hikers.sanneomeo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Table(name = "tbl_mountain_spot")
@NoArgsConstructor
public class MountainSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spot_seq", nullable = false)
    private Long spotSeq;

    @Column(name = "mountain_seq", nullable = false)
    private String mountainSeq;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "etc")
    private String etc;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

}
