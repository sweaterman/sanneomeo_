package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.MountainSimpleInfoResponseDto;
import com.hikers.sanneomeo.repository.MountainRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class MainServiceImpl implements MainService{
    @Autowired
    private MountainRepository mountainRepository;

    @Override
    public Map<String, Object> seasonInfo() {

        //season 정보 만들기

        //겨울 : 12월, 1월, 2월
        //봄 : 3월, 4월, 5월
        //여름 : 6월, 7월, 8월
        //가을 : 9월, 10월, 11월
        LocalDate now = LocalDate.now();
        int month = now.getMonthValue();
        String season = "";

        switch (month){
            case 12:
            case 1:
            case 2:
                season = "winter";
                break;
            case 3:
            case 4:
            case 5:
                season = "spring";
                break;
            case 6:
            case 7:
            case 8:
                season = "summer";
                break;
            case 9:
            case 10:
            case 11:
                season = "fall";
                break;

        }
        Map<String, Object> seasonInfo = new HashMap<>();
        seasonInfo.put("season", season);

        //seasonList 만들기
        List<Map<String,Object>> seasonList = new ArrayList<>();

        List<MountainSimpleInfoResponseDto> mountainList = mountainRepository.seasonMountainList(season);
        for(MountainSimpleInfoResponseDto mountain : mountainList){
            Map<String,Object> mountainKeyMap = new HashMap<>();
            mountainKeyMap.put("mountain",mountain);

            seasonList.add(mountainKeyMap);
        }

        seasonInfo.put("seasonList",seasonList);
        
        return seasonInfo;
    }
}
