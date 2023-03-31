package com.hikers.sanneomeo.domain;

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "tbl_course")
public class Course {


  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "course_seq", nullable = false)
  private Long courseSeq;
  @Column(name = "mountain_seq", nullable = false)
  private String mountainSeq;

  @Column(name = "name")
  private String name;

  @Column(name = "introduction")
  private String introduction;

  @Column(name = "length")
  private BigDecimal length;

  @Column(name = "uptime")
  private Integer time;

  @Column(name = "difficulty_mean")
  private BigDecimal difficultyMean;

  @Column(name = "review_cnt")
  private Integer reviewCnt;
  @Column(name = "review_mean")
  private BigDecimal reviewMean;
  @Column(name = "slope_mean")
  private BigDecimal slopeMean;
  @Column(name = "altitude")
  private BigDecimal altitude;
  @Column(name = "recommend")
  private String recommend;
  @Column(name = "best_trail")
  private Long bestTrail;


}
