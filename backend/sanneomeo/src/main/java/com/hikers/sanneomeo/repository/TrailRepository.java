package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.Trail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
*
* TrailRepository :
* jpa의 save기능과 queryDsl을 동시게 쓰기 위해서 같이 할당 받아서 Repository로 세팅했습니다.
*
*
**/
@Repository
public interface TrailRepository extends JpaRepository<Trail, Long>,TrailRepositoryCustom{
}
