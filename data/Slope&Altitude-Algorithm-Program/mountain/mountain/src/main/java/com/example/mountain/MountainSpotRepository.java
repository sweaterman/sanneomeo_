//package com.example.mountain;
//
//import com.example.mountain.entity.Mountain;
//import com.example.mountain.entity.MountainSpot;
//import java.util.List;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//public interface MountainSpotRepository extends JpaRepository<MountainSpot, Long> {
//
//  @Query("SELECT ms FROM MountainSpot ms WHERE ms.montainSeq=:montainSeq")
//  List<MountainSpot> getMountainSpotBy(String montainSeq);
//
//}
