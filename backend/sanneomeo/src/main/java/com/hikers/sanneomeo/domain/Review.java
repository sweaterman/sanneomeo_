package com.hikers.sanneomeo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "tbl_review")
@Getter
@NoArgsConstructor
public class Review {
    @Id
    @Column(name = "review_seq", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewSeq;

    @Column(name = "mountain_seq", nullable = false)
    private Long mountainSeq;

    @Column(name = "user_seq", nullable = false)
    private Long userSeq;

    @Column(name = "content")
    private String content;

    @Column(name = "rate")
    private Integer rate;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

}
