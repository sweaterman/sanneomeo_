package com.example.mountain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Getter
@Table(name = "tbl_course_trails")
@Setter
@NoArgsConstructor
@ToString
public class CourseTrail {

  @Id
  @Column(name = "course_trails_seq", nullable = false)
  private Long courseTrailsSeq;

  @Column(name = "course_seq", nullable = false)
  private Long courseSeq;

  @Column(name = "trail_seq", nullable = false)
  private Long trailSeq;

  @Column(name="sequence")
  private Integer sequence;



}
