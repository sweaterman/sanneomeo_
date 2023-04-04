package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.TrailPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrailPathRepository extends JpaRepository<TrailPath, Long>
,TrailPathRepositoryCustom{

}
