package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.RecordPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordPhotoRepository extends JpaRepository<RecordPhoto, Long>, RecordPhotoRepositoryCustom {
}
