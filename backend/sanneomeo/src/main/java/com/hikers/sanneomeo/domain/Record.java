package com.hikers.sanneomeo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "tbl_record")
@Getter
@NoArgsConstructor
public class Record {
    @Id
    @Column(name = "record_seq", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordSeq;

    @Column(name = "trail_seq", nullable = false)
    private Long trailSeq;

    @Column(name = "user_seq", nullable = false)
    private Long userSeq;

    @Column(name = "duration")
    private String duration;

    @Column(name = "review")
    private String review;

    @Column(name = "rate")
    private Integer rate;

    @Column(name = "created_at")
    private Timestamp createdAt;

}
