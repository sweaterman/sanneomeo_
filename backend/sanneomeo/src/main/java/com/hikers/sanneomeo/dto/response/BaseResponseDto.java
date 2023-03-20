package com.hikers.sanneomeo.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import static com.hikers.sanneomeo.exception.BaseResponseStatus.SUCCESS;

@Getter
@AllArgsConstructor
@JsonPropertyOrder({"isSuccess", "code", "message", "result"})
public class BaseResponseDto<T> {
  @JsonProperty("isSuccess")
  private final Boolean isSuccess;
  private final int code;
  private final String message;
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private T result;

  //요청 성공
  public BaseResponseDto(T result) {
    this.isSuccess = true;
    this.code = SUCCESS.getCode();
    this.message = SUCCESS.getMessage();
    this.result = result;
  }

  //요청 실패
  public BaseResponseDto(BaseResponseStatus status) {
    this.isSuccess = false;
    this.message = status.getMessage();
    this.code = status.getCode();
  }
}