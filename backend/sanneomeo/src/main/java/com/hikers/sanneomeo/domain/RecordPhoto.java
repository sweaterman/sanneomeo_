package com.hikers.sanneomeo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import lombok.Setter;

@Entity
@Table(name = "tbl_record_photo")
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class RecordPhoto {
    @Id
    @Column(name = "record_photo_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordPhotoSeq;

    @Column(name = "mountain_seq")
    private Long mountainSeq;

    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "image")
    private String image;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "is_public", columnDefinition = "TINYINT(1) default 1")
    private boolean isPublic = true;

    @Column(name = "created_at")
    private Timestamp createdAt;

    public void updateIsPublic(){
        this.isPublic = !this.isPublic;
    }


}
