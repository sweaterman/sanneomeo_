package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Trail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrailRepository extends JpaRepository<Trail, Long>,
    TrailRepositoryCustom{
}
