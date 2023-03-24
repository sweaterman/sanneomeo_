package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.MountainSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MountainSpotRepository extends JpaRepository<MountainSpot, Long>
,MountainSpotRepositoryCustom{
}
