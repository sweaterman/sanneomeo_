package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.domain.RecordPhoto;
import com.hikers.sanneomeo.dto.response.ChallengeResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.RecordPhotoRepository;
import com.hikers.sanneomeo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    RecordPhotoRepository recordPhotoRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Map<String, Object> challengeInfo() {
        Map<String, Object> map = new HashMap<>();

        List<ChallengeResponseDto> challengeList = userRepository.challengeistNotMember();
        long conquerNo = 0;
        //로그인 유저가 있을때
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
            Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

            for (ChallengeResponseDto challenge : challengeList) {
                //후기 몇개 남겼는지 확인
                long reviewNum = userRepository.reviewNum(authUserSeq, challenge.getMountainSeq());
                //후기 있으면 true
                if (reviewNum > 0) {
                    conquerNo++;
                    challenge.setConquer(true);
                }
            }

        }

        map.put("challengeList",challengeList);
        map.put("conquerNo",conquerNo );
        return map;

    }

    @Override
    public boolean updatePhotoStatus(Long authUserSeq, Long photoSeq) {

        //photoSeq에 맞는 recordPhoto가 없을 경우 exception
        RecordPhoto recordPhoto = recordPhotoRepository.findById(photoSeq).orElseThrow(() -> new BaseException(
                BaseResponseStatus.FAIL));

        //수정을 요청한 userSeq와 해당 recordPhoto를 등록한 userSeq가 다를 경우 권한 exception
        if (recordPhoto.getUserSeq() != authUserSeq) throw new BaseException(BaseResponseStatus.FAIL);

        //수정한다
        recordPhoto.updateIsPublic();

        return true;
    }

    @Override
    public boolean deletePhoto(Long authUserSeq, Long photoSeq) {

        //photoSeq에 맞는 recordPhoto가 없을 경우 exception
        RecordPhoto recordPhoto = recordPhotoRepository.findById(photoSeq).orElseThrow(() -> new BaseException(
                BaseResponseStatus.FAIL));

        //수정을 요청한 userSeq와 해당 recordPhoto를 등록한 userSeq가 다를 경우 권한 exception
        if (recordPhoto.getUserSeq() != authUserSeq) throw new BaseException(BaseResponseStatus.FAIL);

        //삭제한다
        recordPhotoRepository.delete(recordPhoto);

        return true;
    }
}
