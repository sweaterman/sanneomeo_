package com.hikers.sanneomeo.domain;

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
@Table(name = "tbl_course_trail")
public class CourseTrails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "course_trail_seq", nullable = false)
  private Long courseTrailSeq;
  @Column(name = "course_seq")
  private Long courseSeq;
  @Column(name = "trail_seq")
  private Long trailSeq;
  @Column(name = "sequence")
  private Integer sequence;
  @Column(name = "reverse")
  private Integer reverse;

}
