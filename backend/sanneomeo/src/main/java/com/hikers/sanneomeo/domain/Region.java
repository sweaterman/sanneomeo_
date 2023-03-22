package com.hikers.sanneomeo.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "tbl_region")
@NoArgsConstructor
public class Region {
    @Id
    @Column(name = "region_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long regionSeq;
    @Column(name = "level1")
    private String level1;
    @Column(name = "level2")
    private String level2;
    @Column(name = "level3")
    private String level3;
    @Column(name = "nx")
    private Integer nx;
    @Column(name = "ny")
    private Integer ny;
}
