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
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
    public Optional<RecommendCourseDto> getTargetCourseFlask(int level, int region, int purpose, int time) {
        // 로그인상태인지 확인
        Long userSeq = 0L;
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
            userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        }
        String flaskUrl = ymlConfig.getFlaskEndPoint() + "/targetCourse" +
                "?userseq=" + userSeq + "&level=" + level + "&region=" + region + "&purpose=" + purpose + "&time=" + time;
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(flaskUrl).build();
        try(Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }
            String res = response.body().string();
            // target이 없는 경우
            if(res.isEmpty()) {
                return Optional.empty();
            }

            Long targetCourseSeq = Long.parseLong(res);

            // 찜여부 같이 보냄
            if(userSeq == 0L) return courseRepository.findCourseByCourseSequence(targetCourseSeq);
            return courseRepository.findCourseByCourseSequenceAndUserSeq(targetCourseSeq, userSeq);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<RecommendCourseDto> getRecommendCoursesFlask(Long targetCourseSeq) {
        String flaskUrl = ymlConfig.getFlaskEndPoint() + "/recommendCourse/" + targetCourseSeq;
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(flaskUrl)
                .build();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }

            String responseBody = response.body().string();

            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode responseNode = objectMapper.readTree(responseBody);
                List<RecommendCourseDto> result = new ArrayList<>();
                JsonNode recommendedResultNode = responseNode.get("recommended_result");
                if (recommendedResultNode != null && recommendedResultNode.isArray()) {
                    if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
                        Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
                        for (JsonNode trailNode : recommendedResultNode) {
                            Optional<RecommendCourseDto> courseDto = courseRepository.findCourseByCourseSequenceAndUserSeq(trailNode.asLong(), authUserSeq);
                            courseDto.ifPresent(result::add);
                        }
                    } else {
                        for (JsonNode trailNode : recommendedResultNode) {
                            Optional<RecommendCourseDto> courseDto = courseRepository.findCourseByCourseSequence(trailNode.asLong());
                            courseDto.ifPresent(result::add);
                        }
                    }
                }
                return result;
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return null;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
