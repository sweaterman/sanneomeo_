package com.example.mountain;

import com.example.mountain.entity.Course;
import com.example.mountain.entity.CourseTrail;
import com.example.mountain.entity.Mountain;
import com.example.mountain.entity.Trail;
import com.example.mountain.entity.TrailPath;
import com.google.maps.GeoApiContext;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseService {

  @Autowired
  final CourseRepository courseRepository;

  final CourseTrailRepository courseTrailRepository;
  private final TrailRepository trailRepository;
  private final TrailPathRepository trailPathRepository;
//  @Autowired
//  final MountainSpotRepository mountainSpotRepository;

  @Transactional
  public int getCourse(){
    List<Course> courseList = courseRepository.findAll();
//    List<Course> courseList = new ArrayList<>();
//    courseList.add(courseRepository.findById(11260050101L).get());
    int finish = 0;

//    List<Course> courseList = new ArrayList<>();
//    courseList.add(courseRepository.findById(Long.valueOf("11215020101")).get());

    PriorityQueue<Double> pq = new PriorityQueue<>();
//    for(Course course:courseList){
    for(int c=0; c<courseList.size(); c++){
      Course course = courseList.get(c);
      if(course.getLength()!=null) continue;
      //각 코스에 대해 코스를 이루는 trail을 가져온다.
      //course와 관계를 맺은 courseTrail 객체를 가져오고, courseTrail에 있는 trailseq로 trail 가져옴
      List<CourseTrail> courseTrailList = courseTrailRepository.findCourseTrailByCourseSeq(course.getCourseSeq());
      List<Trail> trailList = new ArrayList<>();
      for(CourseTrail courseTrail:courseTrailList){
//        courseTrail.setTrail(trailRepository.findById(courseTrail.getTrail()).get());
        Trail tmp = courseTrail.getTrail();
        trailList.add(tmp);

      }


      //courseTrail sequence 갸준으로 정렬
      courseTrailList.sort((o1,o2)->{
        return o1.getSequence().compareTo(o2.getSequence());
      });

      //각 trail에 대해 trailPathList 가져오기
//      for(Trail trail : trailList) {
//        trail.trailPathList = trai
//      }

      //전처리 순서: 평균난이도&시간&length -> 리뷰 -> 각 trail의 reverse 여부 계산
      //왜냐면? course를 이루는 trail이 한 개일 경우 reverse 여부 계산은 할 수 없음

      //평균난이도와 시간, length
      //trail이 없을 수도 있음을 유의!
      int diffCnt = 0;
      int diffSum = 0;
      int time = 0;
      BigDecimal length = BigDecimal.valueOf(0.0);

      for(Trail trail: trailList){
        //난이도
          if(trail.getDifficulty()!=null){
            diffCnt++;
            switch(trail.getDifficulty()){
              case("쉬움"):{
                diffSum+=1;
                break;
              }
              case("중간"):{
                diffSum+=2;
                break;
              }
              case("어려움"):{
                diffSum+=3;
                break;
              }
            }
          }

          time+=trail.getUptime();
          BigDecimal trailL = trail.getLength();
          length = length.add(trailL);
      }

      course.setDifficultyMean(diffCnt==0?0:diffSum/(double)diffCnt);
      course.setTime(time);
      course.setLength(length);
      course.setReviewCnt(0);
      course.setReviewMean((double)0);
      courseRepository.save(course);
      finish++;

      //가장 맨 처음 시작점 찾기
      //0번째 trail의 first path, last path & 1번째 trail의 first path, last path
      //이 네 점이 이룰 수 있는 조합 (0f,1f) (0f, 1l) (0l, 1f) (0l, 1l)
      //각 쌍의 path간의 거리를 구하고, 그 값이 가장 작은 조합이 각 tril의 시작과 끝이 된다

      //만약 course에 trail이 없다면 삭제 필요
      if(trailList.size()<1) {
        System.out.println(course.getCourseSeq());
        continue;
      }
      //trail이 하나라면 시작점과 끝점의 고도를 비교해서 한다
      else if(trailList.size()==1){
        CourseTrail curCourseTrail = courseTrailList.get(0);
        Trail onlyTrail = curCourseTrail.getTrail();

        TrailPath start = onlyTrail.getTrailPathList().get(0);
        TrailPath end = onlyTrail.getTrailPathList().get(onlyTrail.getTrailPathList().size()-1);

        if(start.getAltitude().compareTo(end.getAltitude())<=0){
          curCourseTrail.setReverse(0);
        } else{
          curCourseTrail.setReverse(-1);
        }
        courseTrailRepository.save(curCourseTrail);
        continue;
      }

      pq.clear();

      Trail zero = trailList.get(0);
      Trail one = trailList.get(1);

      TrailPath zero_first = zero.getTrailPathList().get(0);
      TrailPath zero_last = zero.getTrailPathList().get(zero.getTrailPathList().size()-1);
      TrailPath one_first = one.getTrailPathList().get(0);
      TrailPath one_last = one.getTrailPathList().get(one.getTrailPathList().size()-1);

      double zero_first_one_first = distance(zero_first.getLatitude().doubleValue(),zero_first.getLongitude().doubleValue(),
              one_first.getLatitude().doubleValue(), one_first.getLongitude().doubleValue());
      double zero_first_one_last = distance(zero_first.getLatitude().doubleValue(),zero_first.getLongitude().doubleValue(),
              one_last.getLatitude().doubleValue(), one_last.getLongitude().doubleValue());
      double zero_last_one_first = distance(zero_last.getLatitude().doubleValue(),zero_last.getLongitude().doubleValue(),
              one_first.getLatitude().doubleValue(), one_first.getLongitude().doubleValue());
      double zero_last_one_last = distance(zero_last.getLatitude().doubleValue(),zero_last.getLongitude().doubleValue(),
              one_last.getLatitude().doubleValue(), one_last.getLongitude().doubleValue());

      pq.add(zero_first_one_first);
      pq.add(zero_first_one_last);
      pq.add(zero_last_one_first);
      pq.add(zero_last_one_last);

      double min = pq.poll();

      CourseTrail ctZero = courseTrailList.get(0);
      CourseTrail ctOne = courseTrailList.get(1);


      if(min==zero_first_one_first){
        ctZero.setReverse(-1);
        ctOne.setReverse(0);
      } else if(min==zero_first_one_last){
        ctZero.setReverse(-1);
        ctOne.setReverse(-1);
      } else if(min==zero_last_one_last){
        ctZero.setReverse(0);
        ctOne.setReverse(-1);
      } else{
        ctZero.setReverse(0);
        ctOne.setReverse(0);
      }

      courseTrailRepository.save(ctZero);
      courseTrailRepository.save(ctOne);

      for(int tIdx=1; tIdx<courseTrailList.size()-1; tIdx++){
        //지금 trail, courseTrail
        Trail curTrail = trailList.get(tIdx);
        CourseTrail courseTrail = courseTrailList.get(tIdx);

        //다음 trail
        Trail nextTrail = trailList.get(tIdx+1);
        CourseTrail nextCourseTrail = courseTrailList.get(tIdx+1);

        //기준점
        TrailPath std;
        if(courseTrail.getReverse()<0){
          std = curTrail.getTrailPathList().get(0);
        } else{
          std = curTrail.getTrailPathList().get(curTrail.getTrailPathList().size()-1);
        }

        //다음 trail의 시작과 끝
        TrailPath nextFirst = nextTrail.getTrailPathList().get(0);
        TrailPath nextLast = nextTrail.getTrailPathList().get(nextTrail.getTrailPathList().size()-1);

        //다음 trail이랑 계산해주기
        double to_first = distance(std.getLatitude().doubleValue(), std.getLongitude().doubleValue(),
                nextFirst.getLatitude().doubleValue(), nextFirst.getLongitude().doubleValue());
        double to_last = distance(std.getLatitude().doubleValue(), std.getLongitude().doubleValue(),
                nextLast.getLatitude().doubleValue(), nextLast.getLongitude().doubleValue());

        if(to_first<=to_last){
          nextCourseTrail.setReverse(0);
        } else{
          nextCourseTrail.setReverse(-1);
        }

        courseTrailRepository.save(nextCourseTrail);

      }

    }

    return finish;
  }


  //변화량구하기
  public void getChange(){

    List<Course> courseList = courseRepository.findAll();




//    List<Course> courseList = new ArrayList<>();
//    courseList.add(courseRepository.findById(11260030102L).get());

    List<Course> shouldBeDeleted = new ArrayList<>();

    for(Course course : courseList){
      if(course.getSlopeMean() != null) continue;

      List<TrailPath> totalTrailPathList = new ArrayList<>();

      List<CourseTrail> courseTrailList = course.getCourseTrailList();

      //만약 해당 course에 trail이 없다면 넘어간다 -> 삭제해야 하는 값이므로 print해주기 위해 따로 넣어줌
      if(courseTrailList.size()==0){
        shouldBeDeleted.add(course);
        continue;
      }

      for(CourseTrail courseTrail : courseTrailList){

        //각 Trail들의 path를 모두 합쳐 하나의 TrailPath로 받아야한다.
        List<TrailPath> curTrailPathList = courseTrail.getTrail().getTrailPathList();

        //만약 reverse가 음수라면 역순
        if(courseTrail.getReverse()<0){
          curTrailPathList.sort((o1,o2)-> (o1.getPathSeq().compareTo(o2.getPathSeq()))*(-1));
        }

        for(TrailPath trailPath : curTrailPathList){
          totalTrailPathList.add(trailPath);
        }
      }

      //totalTrailPathList들에 대해 변화율을 구한다
      //고도차이/거리
      BigDecimal result = new BigDecimal("0.0");
      long cnt = 0L;

      BigDecimal max = new BigDecimal(totalTrailPathList.get(0).getAltitude().doubleValue());
      BigDecimal min = new BigDecimal(totalTrailPathList.get(0).getAltitude().doubleValue());

      for(int i = 0; i<totalTrailPathList.size()-1; i++){

        TrailPath cur = totalTrailPathList.get(i);
        TrailPath next = totalTrailPathList.get(i+1);

        //최대최소
        BigDecimal nextAltitude = next.getAltitude();
        if(nextAltitude.compareTo(max)>=1){
          max = BigDecimal.valueOf(nextAltitude.doubleValue());
        }

        if(nextAltitude.compareTo(min)<0){
          min = BigDecimal.valueOf(nextAltitude.doubleValue());
        }

        double doubleDist = distance(cur.getLatitude().doubleValue(), cur.getLongitude().doubleValue(),
            next.getLatitude().doubleValue(), next.getLongitude().doubleValue());

        //고도의 차이
        //next에서 cur을 빼서 음수라면 내리막길이므로 고려하지 않는다.
        //오르막에 대한 것만 구하기
        BigDecimal alt = next.getAltitude().subtract(cur.getAltitude());

        //고도 차이가 0보다 작거나 같다면-> alt.compareTo(BigDecimal.ZERO)가 -1 또는 0을 반환한다.
        //그렇다면 continue;
        if(doubleDist==0 || alt.compareTo(BigDecimal.ZERO)<=0) continue;

        cnt++;
        //그게 아니라면? 거리로 나누고 result에 더한다.
        BigDecimal tmp = alt.divide(BigDecimal.valueOf(doubleDist), BigDecimal.ROUND_HALF_UP);
        result = result.add(tmp);
      }

      //최종적으로 각 지점의 변화율을 평균낸다.
      if(cnt==0){
        System.out.println(course);
      }
      BigDecimal meanChange = result.divide(BigDecimal.valueOf(cnt), BigDecimal.ROUND_HALF_UP);

      //평균값을 해당 코스의 altitude라고 한다.
      course.setSlopeMean(meanChange);
      course.setAltitude(max.subtract(min));

    }





  }


  //아래 코드 출처 https://fruitdev.tistory.com/189
  /**
   * 두 지점간의 거리 계산
   *
   * @param lat1 지점 1 위도
   * @param lon1 지점 1 경도
   * @param lat2 지점 2 위도
   * @param lon2 지점 2 경도
   * @param unit 거리 표출단위
   * @return
   */
  private static double distance(double lat1, double lon1, double lat2, double lon2) {

    double theta = lon1 - lon2;
    double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515;

//    if (unit == "kilometer") {
//      dist = dist * 1.609344;
//    } else if(unit == "meter"){
//      dist = dist * 1609.344;
//    }

    return dist;
  }


  // This function converts decimal degrees to radians
  private static double deg2rad(double deg) {
    return (deg * Math.PI / 180.0);
  }

  // This function converts radians to decimal degrees
  private static double rad2deg(double rad) {
    return (rad * 180 / Math.PI);
  }





}
