package com.example.mountain.entity;

import java.math.BigDecimal;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Column(name = "trail_seq", nullable = false)
    private Long trailSeq;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "altitude")
    private BigDecimal altitude;




}
