package com.example.mountain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import kotlin.Lazy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.engine.profile.Fetch;

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

    @OneToMany(fetch= FetchType.LAZY)
    @JoinColumn(name = "trail_seq")
    public List<TrailPath> trailPathList;


}
