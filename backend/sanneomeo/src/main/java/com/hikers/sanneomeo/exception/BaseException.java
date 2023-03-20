package com.hikers.sanneomeo.exception;


import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BaseException extends RuntimeException {
  private BaseResponseStatus status;
  private String message;

  public BaseException(BaseResponseStatus status, String message){
    this.status = status;
    this.message = message;
  }

  public BaseException(BaseResponseStatus status){
    this.status=status;
    this.message=status.getMessage();
  }

    @Override
    public String getMessage(){
        return String.format("%s. %s ", status.getMessage(),message);
    }

    public BaseResponseStatus getBaseResponseStatus(){
    return this.status;
    }
}

