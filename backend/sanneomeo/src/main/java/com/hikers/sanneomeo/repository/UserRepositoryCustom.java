package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.User;
import com.hikers.sanneomeo.dto.response.ChallengeResponseDto;
import com.hikers.sanneomeo.dto.response.GetTrailLikeResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryCustom  {

    Optional<User> findUserBySocialId(String social, String socialId);

    //챌린지 리스트 - 회원아닐때
    List<ChallengeResponseDto> challengeistNotMember();

    //챌린지 완등여부 확인 - 리뷰수 확인
    long reviewNum(Long authUserSeq, String mountainSeq);

}
