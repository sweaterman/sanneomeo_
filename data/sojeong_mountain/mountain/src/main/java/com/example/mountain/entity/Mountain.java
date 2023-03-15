package com.example.mountain.entity;

import java.util.ArrayList;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "tbl_mountain")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Mountain {
  @Id
  @Column(name = "mountain_seq")
  private String mountainSeq;

  @Column(name = "latitude")
  private String latitude;

  @Column(name = "longitude")
  private String longitude;

  @Column(name = "si")
  private String si;

  @Column(name = "gu")
  private String gu;

  @Column(name = "dong")
  private String dong;

  @Column(name = "altitude")
  private int altitude;

  @Column(name = "name")
  private String name;

  @Column(name = "img")
  private String img;

  @Column(name = "introduction", length = 1500)
  private String introduction;

}
