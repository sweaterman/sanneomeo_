package com.example.mountain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import lombok.Setter;
import lombok.ToString;


@Entity
@Getter
@Table(name = "tbl_course")
@Setter
@NoArgsConstructor
@ToString
public class Courses {

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
  private double length;

  @Column(name="dificulty")
  private double difficulty;

  @Column(name="time")
  private int time;

  @Column(name="review_cnt")
  private double reviewCnt;

  @Column(name="review_mean")
  private double reviewMean;

  @Column(name="altitude_min")
  private double altitudeMin;


}
