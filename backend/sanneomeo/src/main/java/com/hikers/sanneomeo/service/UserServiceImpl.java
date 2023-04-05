package com.hikers.sanneomeo.service;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hikers.sanneomeo.domain.RecordPhoto;
import com.hikers.sanneomeo.domain.User;
import com.hikers.sanneomeo.dto.request.UpdateUserSurveyRequestDto;
import com.hikers.sanneomeo.dto.response.ChallengeResponseDto;
import com.hikers.sanneomeo.dto.response.GetTrailLikeResponseDto;
import com.hikers.sanneomeo.dto.response.GetUserPhotosByDateResponseDto;
import com.hikers.sanneomeo.dto.response.GetUserSurveyResponseDto;
import com.hikers.sanneomeo.dto.response.PhotoResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.KeepRepository;
import com.hikers.sanneomeo.repository.MountainRepository;
import com.hikers.sanneomeo.repository.RecordPhotoRepository;
import com.hikers.sanneomeo.repository.UserRepository;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.TreeMap;
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
    @Autowired
    private MountainRepository mountainRepository;
    @Autowired
    private KeepRepository keepRepository;

    @Override
    public Map<String, Object> challengeInfo() {
        Map<String, Object> response = new HashMap<>();

        //challengeList 만들기
        List<Map<String,Object>> challengeList = new ArrayList<>();

        List<ChallengeResponseDto> totalChallengeList = userRepository.challengeistNotMember();
        long conquerNo = 0;

        for(ChallengeResponseDto challenge: totalChallengeList){

            //로그인 유저가 있을때 conquer 여부 true로
            if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
                Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

                //후기 몇개 남겼는지 확인
                long reviewNum = userRepository.reviewNum(authUserSeq, challenge.getMountainSeq());
                //후기 있으면 true
                if (reviewNum > 0) {
                    conquerNo++;
                    challenge.setConquer(true);
                }
            }

            //front가 원하는 요청 응답으로 변환하기 위해 한번 더 map으로 감싼다.
            Map<String,Object> mountainKeyMap = new HashMap<>();
            mountainKeyMap.put("mountain",challenge);

            challengeList.add(mountainKeyMap);
        }

        response.put("challengeList",challengeList);
        response.put("conquerNo",conquerNo );
        return response;
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

    @Override
    public Map<String, Map<String, List<String>>> getUserPhotos(Long userSeq, Integer month) {
        List<RecordPhoto> photoResponseDtos = recordPhotoRepository.findRecordPhotoByMonth(userSeq, month);

        TreeMap<String, Map<String,List<String>>> responseDtoTreeMap = new TreeMap<>();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        for(RecordPhoto recordPhoto:photoResponseDtos){
            //date별로 map 뽑고
            String date = simpleDateFormat.format(recordPhoto.getDate());
            Map<String, List<String>> mountainPhotoMapByDate = responseDtoTreeMap.getOrDefault(date,new HashMap<>());

            //mountainSeq별로 list 뽑고
            String mountainSeq = recordPhoto.getMountainSeq().toString();
            List<String> urlListByMountain = mountainPhotoMapByDate.getOrDefault(mountainSeq, new ArrayList<>());

            //데이터 넣고
            urlListByMountain.add(recordPhoto.getImage());

            //다시 map에 다 넣어주기
            mountainPhotoMapByDate.put(mountainSeq,urlListByMountain);
            responseDtoTreeMap.put(date,mountainPhotoMapByDate);
        }

        //mountainSeq를 mountainName으로 교체해주는 작업이 필요하다.
        Iterator<String> iterator = responseDtoTreeMap.keySet().iterator();
        while(iterator.hasNext()){
            String dateKey = iterator.next();
            Map<String, List<String>> urlListByMountain = responseDtoTreeMap.get(dateKey);

            Map<String, List<String>> newUrlListByMountain = new HashMap<>();
            //날짜별 map의 모든 key에 대해 key를 변경한다.
            Iterator<String> mIterator = urlListByMountain.keySet().iterator();

            while(mIterator.hasNext()){
                String mountainSeq = mIterator.next();
                String mountainName = mountainRepository.findById(mountainSeq).get().getName();
                newUrlListByMountain.put(mountainName,urlListByMountain.get(mountainSeq));
            }

            responseDtoTreeMap.replace(dateKey, newUrlListByMountain);
        }

        return responseDtoTreeMap;
    }

    @Override
    public List<GetTrailLikeResponseDto> getTrailLike(Long userSeq) {

        return keepRepository.findLikeByUserWithTrail(userSeq);

    }

    @Override
    public boolean updateUserSurvey(Long userSeq, UpdateUserSurveyRequestDto updateUserSurveyRequestDto) {
        User user = userRepository.findById(userSeq).orElseThrow(()->new BaseException(BaseResponseStatus.FAIL));

        user.updateUserServey(updateUserSurveyRequestDto);

        return true;
    }

    @Override
    public GetUserSurveyResponseDto getUserSurveyResponseDto(Long userSeq){
        User user = userRepository.findById(userSeq).orElseThrow(()->new BaseException(BaseResponseStatus.FAIL));


        GetUserSurveyResponseDto getUserSurveyResponseDto = new GetUserSurveyResponseDto();
        getUserSurveyResponseDto.setLogin(true);
        getUserSurveyResponseDto.setTime(user.getPreferClimbDuration()==null?0:user.getPreferClimbDuration());
        getUserSurveyResponseDto.setPurpose(user.getPurpose()==null?0:user.getPurpose());
        getUserSurveyResponseDto.setRegion(user.getPreferRegion()==null?0:user.getPreferRegion());
        getUserSurveyResponseDto.setLevel(user.getDifficulty()==null?0:user.getDifficulty());

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        getUserSurveyResponseDto.setModifiedAt(sdf.format(user.getUpdatedAt()));

        return getUserSurveyResponseDto;
    }
}
