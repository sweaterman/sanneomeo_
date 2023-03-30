package com.example.mountain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Column(name = "recommand")
    private String recommand;

    @Column(name = "best_trail")
    private Long bestTrail;

    @OneToMany
    public List<TrailPath> trailPathList;


}
