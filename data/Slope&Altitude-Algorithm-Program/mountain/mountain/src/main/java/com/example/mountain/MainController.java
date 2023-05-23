package com.example.mountain;

import com.example.mountain.entity.Course;
import com.google.maps.errors.ApiException;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// AIzaSyCDNueCqNZfkC7ov0eC_W6qK2tO3MY7GQE


@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class MainController {

  @Autowired
  final MountainService mountainService;

  @Autowired
  CourseService courseService;

  @GetMapping("/load")
  public ResponseEntity loadData() throws IOException, InvalidFormatException {

    mountainService.loadData();

    return new ResponseEntity(HttpStatus.OK);
  }

  @GetMapping("/info")
  public ResponseEntity getGeoInfo() throws IOException, InterruptedException, ApiException {
    mountainService.getGeoInfo();
    return new ResponseEntity(HttpStatus.OK);
  }

  @GetMapping("/address")
  public ResponseEntity getAddress() throws IOException, InterruptedException, ApiException {
    mountainService.getAddress();
    return new ResponseEntity(HttpStatus.OK);
  }



  @GetMapping("/detail")
  public ResponseEntity getDetail() throws IOException, InterruptedException, ApiException {
    mountainService.getDetail();
    return new ResponseEntity(HttpStatus.OK);
  }
//
//
//  @GetMapping("/detailInfo")
//  public ResponseEntity updateDetailInfo() throws IOException, InterruptedException, ApiException {
//    mountainService.updateDetailInfo();
//    return new ResponseEntity(HttpStatus.OK);
//  }
//
  @GetMapping("/image")
  public ResponseEntity getImages() throws IOException, InterruptedException, ApiException {
    mountainService.getImages();
    return new ResponseEntity(HttpStatus.OK);
  }

  @GetMapping("/randomimage")
  public ResponseEntity saveRandomImage() throws IOException, InterruptedException, ApiException {
    mountainService.saveRandomImage();
    return new ResponseEntity(HttpStatus.OK);
  }
//

  @GetMapping("/course")
  public ResponseEntity<List<Course>> getCourses(){

    System.out.println(courseService.getCourse());
    System.out.println("---완료");

    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/change")
  public ResponseEntity getChange(){
    courseService.getChange();
    return new ResponseEntity(HttpStatus.OK);
  }


}
