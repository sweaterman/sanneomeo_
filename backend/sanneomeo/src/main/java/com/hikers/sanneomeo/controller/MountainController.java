package com.hikers.sanneomeo.controller;

import com.hikers.sanneomeo.exception.BaseResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mountain")
public class MountainController {


  @PostMapping("/pictures")
  public BaseResponseEntity<> postPictures(){
    return null;
  }
}
