package com.hikers.sanneomeo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Table(name = "tbl_keep")
@NoArgsConstructor
public class Keep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keep_seq", nullable = false)
    private Long keepSeq;

    @Column(name = "user_seq", nullable = false)
    private Long userSeq;

    @Column(name = "mountain_seq", nullable = false)
    private String mountainSeq;

    @Column(name = "created_at")
    private Timestamp createdAt;
}
