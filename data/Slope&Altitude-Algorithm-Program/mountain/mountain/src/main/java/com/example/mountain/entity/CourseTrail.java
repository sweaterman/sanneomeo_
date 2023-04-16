package com.example.mountain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;

import static javax.persistence.FetchType.LAZY;


@Entity
@Getter
@Table(name = "tbl_course_trail")
@Setter
@NoArgsConstructor
@ToString
public class CourseTrail {

  @Id
  @Column(name = "course_trail_seq", nullable = false)
  private Long courseTrailsSeq;

  @Column(name = "course_seq", nullable = false)
  private Long courseSeq;

  @Column(name="sequence")
  private Integer sequence;

  @Column(name="reverse")
  private Integer reverse;

  @ManyToOne
  @JoinColumn(name = "trail_seq")
  private Trail trail;



}
