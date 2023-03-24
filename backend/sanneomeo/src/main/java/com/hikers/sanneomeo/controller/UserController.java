package com.hikers.sanneomeo.controller;


import static com.hikers.sanneomeo.exception.BaseResponseStatus.UNAUTHORIZED_USER;

import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.dto.response.ChallengeResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.UserService;
import com.hikers.sanneomeo.service.UserServiceImpl;
import com.hikers.sanneomeo.utils.JwtTokenUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  UserService userService;

  //login callback 관련한 메서드로 추후 프론트와 협의 후 수정 필요합니다.
  @GetMapping("/after/login")
  public String getAfterLogin(){
    try{
//      Long curUser = SecurityContextHolder.getContext().getAuthentication().getPrincipal().;


    } catch(Exception e){

    }
    System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    System.out.println();

    return "after login";
  }

  @GetMapping("/token")
  public String getAuthToken(@RequestParam("userSeq") Long userSeq){
    return JwtTokenUtils.allocateToken(userSeq,"ROLE_USER").getAccessToken();
  }

  @GetMapping("/challenge")
  public BaseResponseDto<Map<String,Object>>challengeList() {
    try{
      return new BaseResponseDto<>(userService.challengeInfo());
    }catch (Exception e){
      if (e instanceof BaseException) {
        throw e;
      } else {
        throw new BaseException(BaseResponseStatus.FAIL);
      }
    }
  }


  //여기서부터 crud -> 위는 그냥 임시용
  @PutMapping("/photo/{photoSeq}")
  public BaseResponseDto<Boolean> changePhotoStatus(@PathVariable Long photoSeq){
    try {
      //요청 내부의 userSeq와 인증된 userSeq가 다를 경우
      Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

      boolean result = userService.updatePhotoStatus(authUserSeq, photoSeq);

      return new BaseResponseDto<>(result);

    } catch (Exception e) {
      if (e instanceof BaseException) {
        throw e;
      } else {
        throw new BaseException(BaseResponseStatus.FAIL);
      }
    }
  }

    @DeleteMapping("/photo/{photoSeq}")
    public BaseResponseDto<Boolean> deletePhoto(@PathVariable Long photoSeq){
      try {
        //요청 내부의 userSeq와 인증된 userSeq가 다를 경우 처리 위해 사용
        Long authUserSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        boolean result = userService.deletePhoto(authUserSeq, photoSeq);

        return new BaseResponseDto<>(result);

      } catch (Exception e) {
        if (e instanceof BaseException) {
          throw e;
        } else {
          throw new BaseException(BaseResponseStatus.FAIL);
        }
      }
  }
}
