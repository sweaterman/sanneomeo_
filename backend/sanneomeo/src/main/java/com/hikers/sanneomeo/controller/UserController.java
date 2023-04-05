package com.hikers.sanneomeo.controller;


import static com.hikers.sanneomeo.exception.BaseResponseStatus.FAIL;
import static com.hikers.sanneomeo.exception.BaseResponseStatus.UNAUTHORIZED_USER;

import com.hikers.sanneomeo.dto.request.UpdateUserSurveyRequestDto;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.dto.response.GetTrailLikeResponseDto;
import com.hikers.sanneomeo.dto.response.GetUserPhotosByDateResponseDto;
import com.hikers.sanneomeo.dto.response.GetUserSurveyResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.UserService;
import com.hikers.sanneomeo.utils.JwtTokenUtils;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

  @GetMapping("/info")
  public BaseResponseDto<GetUserSurveyResponseDto> getUserSurvey(){
    try{
      Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      if(principal.toString().equals("anonymousUser")){
        GetUserSurveyResponseDto getUserSurveyResponseDto = new GetUserSurveyResponseDto();
        getUserSurveyResponseDto.setLevel(0);
        getUserSurveyResponseDto.setTime(0);
        getUserSurveyResponseDto.setPurpose(0);
        getUserSurveyResponseDto.setRegion(0);
        getUserSurveyResponseDto.setModifiedAt("");
        getUserSurveyResponseDto.setLogin(false);
        return new BaseResponseDto<>(getUserSurveyResponseDto);
      }

      Long userSeq = Long.parseLong(principal.toString());
      return new BaseResponseDto<>(userService.getUserSurveyResponseDto(userSeq));
    } catch(Exception e){
      if(e instanceof BaseException){
        throw e;
      } else{
        throw new BaseException(FAIL);
      }
    }
  }

  @GetMapping("/photo")
  public BaseResponseDto<Map<String, Map<String, List<String>>>> getUserPhotos(@RequestParam("month") Integer month){
    try{
      Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
      return new BaseResponseDto<>(userService.getUserPhotos(userSeq, month));
    } catch(Exception e){
      if(e instanceof BaseException){
        throw e;
      } else{
        throw new BaseException(FAIL);
      }
    }
  }

  @GetMapping("/trailLike")
  public BaseResponseDto<List<GetTrailLikeResponseDto>> getTrailLike(){
    try{
      Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
      return new BaseResponseDto<>(userService.getTrailLike(userSeq));
    } catch(Exception e){
      if(e instanceof BaseException){
        throw e;
      } else{
        e.printStackTrace();
        throw new BaseException(FAIL);
      }
    }
  }


  @PutMapping("/photo/{photoSeq}")
  public BaseResponseDto<Boolean> changePhotoStatus(@PathVariable("photoSeq") Long photoSeq){
    try {
      //요청 내부의 userSeq와 인증된 userSeq가 다를 경우
      Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

      boolean result = userService.updatePhotoStatus(userSeq, photoSeq);

      return new BaseResponseDto<>(result);

    } catch (Exception e) {
      if (e instanceof BaseException) {
        throw e;
      } else {
        throw new BaseException(BaseResponseStatus.FAIL);
      }
    }
  }
  @PutMapping("/info")
  public BaseResponseDto<Boolean> updateUserSurvey(@RequestBody UpdateUserSurveyRequestDto updateUserSurveyRequestDto){
    try {
      //요청 내부의 userSeq와 인증된 userSeq가 다를 경우 처리 위해 사용
      Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

      boolean result = userService.updateUserSurvey(userSeq, updateUserSurveyRequestDto);

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
    public BaseResponseDto<Boolean> deletePhoto(@PathVariable("photoSeq") Long photoSeq){
      try {
        Long userSeq = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        boolean result = userService.deletePhoto(userSeq, photoSeq);

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
