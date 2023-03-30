package com.example.mountain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


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
  private Double length;

  @Column(name="dificulty")
  private Double difficulty;

  @Column(name="time")
  private Integer time;

  @Column(name="review_cnt")
  private Double reviewCnt;

  @Column(name="review_mean")
  private Double reviewMean;

  @Column(name="altitude_min")
  private Double altitudeMin;


}
