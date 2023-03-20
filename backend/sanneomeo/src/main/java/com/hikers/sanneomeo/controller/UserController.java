package com.hikers.sanneomeo.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

  //login callback 관련한 메서드로 추후 프론트와 협의 후 수정 필요합니다.
  @GetMapping("/login/after")
  public String getAfterLogin(){

    System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());

    return "after login";
  }
}
