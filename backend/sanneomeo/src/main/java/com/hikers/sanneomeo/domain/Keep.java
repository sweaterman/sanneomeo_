package com.hikers.sanneomeo.domain;

import lombok.Builder;
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
    @Column(name = "trail_seq", nullable = false)
    private Long trailSeq;
    @Column(name = "is_keep", nullable = false, columnDefinition = "TINYINT(1) default 1")
    private boolean isKeep = true;
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Builder
    public Keep(Long userSeq, Long trailSeq) {
        this.userSeq = userSeq;
        this.trailSeq = trailSeq;
    }

    public void updateIsKeep() {
        this.isKeep = !this.isKeep;
    }

}
