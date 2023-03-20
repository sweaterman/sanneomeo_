package com.hikers.sanneomeo.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.dto.response.LoginResponseDto;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;


public class JsonUtils {

  private static final ObjectMapper objectMapper = new ObjectMapper();

  public static void writeJsonExceptionResponse(HttpServletResponse response, BaseResponseStatus baseResponseStatus)
      throws IOException {

    //헤더
    response.setContentType("application/json");
    response.setCharacterEncoding("utf-8");

    //BaseResponseDto 생성
    BaseResponseDto<BaseResponseStatus> baseResponseDto = new BaseResponseDto<>(baseResponseStatus);

    //json으로 변환하여 response에 저장
    String stringResponseData = objectMapper.writeValueAsString(baseResponseDto);
    response.getWriter().write(stringResponseData);
  }

}
