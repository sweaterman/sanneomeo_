package com.hikers.sanneomeo.dto.response;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class GetUserPhotosByDateResponseDto {
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private String date;
  private Map<String, List<String>> photos;
}
