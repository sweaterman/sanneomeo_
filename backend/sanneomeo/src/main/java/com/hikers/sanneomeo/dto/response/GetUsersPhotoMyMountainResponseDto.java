package com.hikers.sanneomeo.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class GetUsersPhotoMyMountainResponseDto {
  private String name;
  private List<String> photos;

}
