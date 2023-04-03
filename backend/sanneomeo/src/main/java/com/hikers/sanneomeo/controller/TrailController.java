package com.hikers.sanneomeo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.dto.request.KeepTrailRequestDto;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.TrailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/trail")
@RequiredArgsConstructor
public class TrailController {

    private final TrailService trailService;
    private final YmlConfig ymlConfig;

    @GetMapping("/info/{trailIdx}")
    public BaseResponseDto<?> getTrailInfo(@PathVariable("trailIdx") Long seq) {
        return new BaseResponseDto<>(trailService.getPathsBySequence(seq));
    }


    @PostMapping("/keep")
    public BaseResponseDto<Boolean> keepTrail(@RequestBody KeepTrailRequestDto keepTrailRequestDto) {
        try {
            Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            //유저가 해당 trailSeq에 대한 찜 데이터 있다면 get -> true/false 토글
            //없다면 post
            boolean result = trailService.keep(authUserSeq, keepTrailRequestDto.getCourseSeq());
            return new BaseResponseDto<>(result);
        } catch (Exception e) {
            if (e instanceof BaseException) {
                throw e;
            } else {
                throw new BaseException(BaseResponseStatus.FAIL);
            }

        }
    }

    @GetMapping("/trail/recommend/survey")
    public ResponseEntity<List<String>> getRecommendTrails(@RequestParam(value = "level", required = false) int level,
                                                 @RequestParam(value = "region", required = false) String region,
                                                 @RequestParam(value = "purpose", required = false) int purpose,
                                                 @RequestParam(value = "time", required = false) int time) {
        // level : 1/2/3, region : si(8도), purpose : 1/2, time : 1/2/3/4/5
//        String flaskUrl = ymlConfig.getFlaskEndPoint() + "/targetCourse" +
//                "?level=" + level + "&region=" + region + "&purpose=" + purpose + "&time=" + time;
//        String flaskUrl = "http://localhost:5000/recommendCourse/41550070105";
        String flaskUrl = "http://localhost:5000/targetCourse";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> targetCourse = restTemplate.getForEntity(flaskUrl, String.class);
        String targetCourseSeq = targetCourse.getBody();
        flaskUrl = "http://localhost:5000/recommendCourse/" + targetCourseSeq;

        ResponseEntity<String> response = restTemplate.getForEntity(flaskUrl, String.class);
        ObjectMapper objectMapper = new ObjectMapper(); // JSON 형식의 문자열을 객체로 변환하기 위한 ObjectMapper 생성
        try {
            // JSON 형식의 문자열을 응답 객체로 변환
            String responseJson = response.getBody();
            JsonNode responseNode = objectMapper.readTree(responseJson);
            List<String> recommendedTrails = new ArrayList<>();
            JsonNode recommendedResultNode = responseNode.get("recommended_result");
            if (recommendedResultNode != null && recommendedResultNode.isArray()) {
                for (JsonNode trailNode : recommendedResultNode) {
                    recommendedTrails.add(trailNode.asText());
                }
            }

            return new ResponseEntity<>(recommendedTrails, HttpStatus.OK); // 처리 결과에 맞게 반환값 설정
        } catch (JsonProcessingException e) {
            // 예외 처리
            // ...
            return null; // 예외 발생시 처리 결과에 맞게 반환값 설정
        }
    }

}
