package com.example.mountain.entity;

import java.math.BigDecimal;
import java.util.List;
import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "tbl_trail_path")
@Getter
@NoArgsConstructor
@Embeddable
public class TrailPath {
    @Id
    @Column(name = "path_seq", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pathSeq;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "altitude")
    private BigDecimal altitude;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "trail_Seq")
    private Trail trail;




}
