package com.hikers.sanneomeo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.domain.Keep;
import com.hikers.sanneomeo.dto.response.*;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.CourseRepository;
import com.hikers.sanneomeo.repository.KeepRepository;
import com.hikers.sanneomeo.repository.TrailPathRepository;
import com.hikers.sanneomeo.repository.TrailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class TrailServiceImpl implements TrailService {

    private final KeepRepository keepRepository;
    private final TrailRepository trailRepository;
    private final TrailPathRepository trailPathRepository;
    private final CourseRepository courseRepository;
    private final YmlConfig ymlConfig;


    @Override
    public TrailDetailResponseDto getTrailDetail(Long sequence) {
        return trailRepository.findDetailBySequence(sequence).orElseThrow(() -> new BaseException(
                BaseResponseStatus.FAIL, ""));
    }

    @Override
    public List<PathResponseDto> getPathsBySequence(Long sequence) {
        return trailPathRepository.findPathsBySequence(sequence);
    }

    @Override
    public List<TrailListResponseDto> getTrailsBySequence(String sequence) {
        return trailRepository.findTrailsByMountainSequence(sequence);
    }

    @Override
    public NearTrailResponseDto getNearTrailByDistance(String sequence, BigDecimal latitude,
                                                       BigDecimal longitude) {
        return trailPathRepository.findNearTrailByMountainSequence(sequence, latitude, longitude).orElseThrow(() -> new BaseException(
                BaseResponseStatus.FAIL, ""));
    }


    @Override
    public boolean keep(Long userSeq, Long courseSeq) {
        System.out.println(courseSeq);
        Optional<Keep> keep = keepRepository.findFirstByUserSeqAndCourseSeq(userSeq, courseSeq);
        System.out.println("서비스임플");
        if (keep.isPresent()) { // 레코드가 있으면
            keep.get().updateIsKeep();
        } else { // 레코드가 없으면
            //to entity
            Keep keepEntity = Keep.builder()
                    .userSeq(userSeq)
                    .courseSeq(courseSeq)
                    .build();

            keepRepository.save(keepEntity);
        }
        return true;
    }

    @Override
    public String getTargetCourseSeqFlask(int level, String region, int purpose, int time) {
        // 로그인상태인지 확인
        Long userSeq = 0L;
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
            userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        }
        System.out.println(userSeq);
        String flaskUrl = ymlConfig.getFlaskEndPoint() + "/targetCourse" +
                "?userseq=" + userSeq + "&level=" + level + "&region=" + region + "&purpose=" + purpose + "&time=" + time;
//        String flaskUrl = "http://localhost:5000/targetCourse" + "?userseq="+userSeq + "&level=" + level + "&region=" + region + "&purpose=" + purpose + "&time=" + time;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> targetCourse = restTemplate.getForEntity(flaskUrl, String.class);
        return targetCourse.getBody();
    }

    @Override
    public List<GetRecommendCourseResponseDto> getRecommendCoursesFlask(String targetCourseSeq) {
        String flaskUrl = ymlConfig.getFlaskEndPoint() + "/recommendCourse/" + targetCourseSeq;
//        String flaskUrl = "http://localhost:5000/recommendCourse/" + targetCourseSeq;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(flaskUrl, String.class);
        System.out.println("여기까지됨");
        System.out.println(response.getBody());
        ObjectMapper objectMapper = new ObjectMapper(); // JSON 형식의 문자열을 객체로 변환하기 위한 ObjectMapper 생성
        try {
            // JSON 형식의 문자열을 응답 객체로 변환
            String responseJson = response.getBody();
            JsonNode responseNode = objectMapper.readTree(responseJson);
            List<GetRecommendCourseResponseDto> result = new ArrayList<>();
            JsonNode recommendedResultNode = responseNode.get("recommended_result");
            System.out.println(recommendedResultNode);
            if (recommendedResultNode != null && recommendedResultNode.isArray()) {
                //로그인 유저가 있을때 isKeep정보도 가져와야함
                if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
                    Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
                    for (JsonNode trailNode : recommendedResultNode) {
                        System.out.println(authUserSeq);
                        System.out.println(trailNode.asLong());
                        Optional<GetRecommendCourseResponseDto> courseDto = courseRepository.findCourseByCourseSequenceAndUserSeq(trailNode.asLong(), authUserSeq);
                        courseDto.ifPresent(result::add);
                    }
                } else {
                    for (JsonNode trailNode : recommendedResultNode) {
                        Optional<GetRecommendCourseResponseDto> courseDto = courseRepository.findCourseByCourseSequence(trailNode.asLong());
                        courseDto.ifPresent(result::add);
                    }
                }

            }
            return result; // 처리 결과에 맞게 반환값 설정
        } catch (JsonProcessingException e) {
            // 예외 처리
            return null; // 예외 발생시 처리 결과에 맞게 반환값 설정
        }
    }
}
