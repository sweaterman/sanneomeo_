package com.hikers.sanneomeo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "tbl_trail_path")
@Getter
@NoArgsConstructor
public class TrailPath {
    @Id
    @Column(name = "path_seq", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pathSeq;

    @Column(name = "trail_seq", nullable = false)
    private Long trailSeq;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "altitude")
    private BigDecimal altitude;


}
