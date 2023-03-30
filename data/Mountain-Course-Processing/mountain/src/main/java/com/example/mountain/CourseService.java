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
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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
public class CourseService {

  @Autowired
  final CourseRepository courseRepository;

  final CourseTrailRepository courseTrailRepository;
  private final TrailRepository trailRepository;
  private final TrailPathRepository trailPathRepository;
//  @Autowired
//  final MountainSpotRepository mountainSpotRepository;

  public List<Course> getCourse(){
    List<Course> courseList = courseRepository.findAll();

    for(Course course:courseList){
      List<CourseTrail> courseTrailList = courseTrailRepository.findCourseTrailByCourseSeq(course.getCourseSeq());

      List<Trail> trailList = new ArrayList<>();
      for(CourseTrail courseTrail:courseTrailList){
        trailList.add(trailRepository.findById(courseTrail.getTrailSeq()).get());
      }

      //각 trail에 대해 trailPathList 가져오기
      for(Trail trail : trailList) {
        trail.trailPathList = trailPathRepository.findTrailPatyByTrailSeq(trail.getTrailSeq());
      }


      //sequence 정렬
      courseTrailList.sort((o1, o2) -> {
        if(o1.getSequence()>o2.getSequence()){
          return 1;
        } else{
          return -1;
        }
      });

      //각 trailPath 계산하기


      System.out.println(trailList);


    }


    return courseRepository.findAll();
  }





}
