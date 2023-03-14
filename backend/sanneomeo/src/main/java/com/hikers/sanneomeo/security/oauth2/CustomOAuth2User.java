package com.hikers.sanneomeo.security.oauth2;

import java.util.HashMap;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CustomOAuth2User  {
  private String registrationId;
  private String socialId;
  private String nameAttributeKey;
  private String nickname;
  private String profileImg;
  private Integer level;
  private Long userSeq;


  //최초 OAuth2UserService에서 Resource Server로부터 받은 attirubtes를 통해 CustomOAuth2User 객체를 생성한다.
  public static CustomOAuth2User mapper(Map<String, Object> attributes, String registrationId, String nameAttributeKey){
    switch (registrationId){
      case("kakao"): return kakaoMapper(attributes, nameAttributeKey);
      case("google"): return googleMapper(attributes, nameAttributeKey);
      default: return null;
    }
  }

  public static CustomOAuth2User kakaoMapper(Map<String, Object> attributes, String nameAttributeKey){
    Map<String, Object> properties = (Map<String,Object>)attributes.get("properties");

    return CustomOAuth2User.builder()
        .registrationId("kakao")
        .socialId(attributes.get("id").toString())
        .nickname(properties.get("nickname").toString())
        .profileImg(properties.get("profile_image").toString())
        .nameAttributeKey(nameAttributeKey)
        .build();
  }

  //CustomOAuth2User의 필드 값들을 map으로 변환하여 반환한다.
  //Authentication 객체 생성 시 필요한 attributes map 생성
  public Map<String, Object> objToMap(){
    Map<String, Object> attributes = new HashMap<>();

    attributes.put("registrationId",this.registrationId);
    attributes.put("socialId", this.socialId);
    attributes.put("nickname", this.nickname);
    attributes.put("profileImg", this.profileImg);
    attributes.put("level", this.level);

    return attributes;
  }

  //Authentication 과정이 끝난 후 다시
//  public static CustomOAuth2User mapToObj(Map<String, String> attributes){
//    return CustomOAuth2User.builder()
//        .registrationId()
//  }
  public static CustomOAuth2User googleMapper(Map<String, Object> attributes, String nameAttributeKey){
    return CustomOAuth2User.builder()
        .registrationId("google")
        .socialId(attributes.get(nameAttributeKey).toString())
        .nickname(attributes.get("name").toString())
        .profileImg(attributes.get("picture").toString())
        .nameAttributeKey(nameAttributeKey)
        .build();
  }
}
