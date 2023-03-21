package com.hikers.sanneomeo.security.oauth2;

import com.hikers.sanneomeo.domain.User;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.exception.OAuth2LoginException;
import com.hikers.sanneomeo.repository.UserRepository;
import com.hikers.sanneomeo.repository.UserRepositorySupport;
import com.hikers.sanneomeo.security.CustomAuthenticatedUser;
import java.util.Collections;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

  private UserRepositorySupport userRepositorySupport;

  @Autowired
  private void setUserRepository(UserRepositorySupport userRepositorySupport){
    this.userRepositorySupport = userRepositorySupport;
  }

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

    OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
    OAuth2User oAuth2User = delegate.loadUser(userRequest);

    CustomOAuth2User customOAuth2User = CustomOAuth2User.mapper(
        oAuth2User.getAttributes(), userRequest.getClientRegistration().getRegistrationId(),
        userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint()
            .getUserNameAttributeName());

    //db에 존재하지 않는 유저에 대해 -> failure handler
    User user = userRepositorySupport
        .findUserBySocialId(customOAuth2User.getRegistrationId(),
            customOAuth2User.getSocialId())
        .orElseThrow(() -> {
          throw new OAuth2LoginException(BaseResponseStatus.SIGNUP_REQUIRED, customOAuth2User);
        });

    //db에 존재하는 유저라면 authenticated user 인스턴스를 생성해서 인증 객체를 만든다.
    Map<String, Object> attributes = (CustomAuthenticatedUser.builder()
        .userSeq(user.getUserSeq())
        .level(user.getLevel())
        .role("ROLE_USER")
        .build().objToMap());

    //db에 존재하는 유저라면 -> 인증객체 만들고 success handler
    return new DefaultOAuth2User(
        Collections.singleton(new SimpleGrantedAuthority(attributes.get("role").toString())),
        attributes,
        customOAuth2User.getNameAttributeKey());
  }
}
