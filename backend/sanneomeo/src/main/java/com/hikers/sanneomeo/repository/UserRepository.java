package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
