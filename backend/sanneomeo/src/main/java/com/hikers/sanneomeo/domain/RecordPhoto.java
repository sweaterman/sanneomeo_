package com.hikers.sanneomeo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "tbl_record_photo")
@Getter
@NoArgsConstructor
public class RecordPhoto {
    @Id
    @Column(name = "record_photo_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordPhotoSeq;

    @Column(name = "record_seq")
    private Long recordSeq;

    @Column(name = "image")
    private String image;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "is_public", columnDefinition = "TINYINT(1) default 0")
    private boolean isPublic = false;

    @Column(name = "created_at")
    private Timestamp createdAt;


}
