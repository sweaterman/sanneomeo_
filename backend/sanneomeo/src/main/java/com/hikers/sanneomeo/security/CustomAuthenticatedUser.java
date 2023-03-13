package com.hikers.sanneomeo.security;

import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CustomAuthenticatedUser {

  private Long userSeq;
  private int level;
  private String role;

  public Map<String, Object> objToMap(){
    Map<String, Object> attributes = new HashMap<>();

    attributes.put("userSeq", userSeq);
    attributes.put("level", level);
    attributes.put("role", role);

    return attributes;
  }

  public static CustomAuthenticatedUser mapToObj(Map<String, Object> attributes){
    return CustomAuthenticatedUser.builder()
        .userSeq((Long)attributes.get("userSeq"))
        .level((int) attributes.get("level"))
        .role("ROLE_USER").build();
  }

}
