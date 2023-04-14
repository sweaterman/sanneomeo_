package com.example.mountain.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;


@Entity
@Getter
@Table(name = "tbl_course")
@Setter
@NoArgsConstructor
@ToString
public class Course {

  @Id
  @Column(name = "course_seq", nullable = false)
  private Long courseSeq;

  @Column(name = "mountain_seq", nullable = false)
  private Long mountainSeq;

  @Column(name="name")
  private String name;

  @Column(name="introduction")
  private String introduction;

  @Column(name="length")
  private BigDecimal length;

  @Column(name="difficulty_mean")
  private Double difficultyMean;

  @Column(name="time")
  private Integer time;

  @Column(name="review_cnt")
  private Integer reviewCnt;

  @Column(name="review_mean")
  private Double reviewMean;

  @OneToMany(fetch=FetchType.LAZY)
  @JoinColumn(name="course_seq")
  List<CourseTrail> courseTrailList;

  @Column(name="altitude")
  private BigDecimal altitude;

  @Column(name="slope_mean")
  private BigDecimal slopeMean;


}
