package com.hikers.sanneomeo.security.oauth2;

import static com.hikers.sanneomeo.security.oauth2.CustomOAuth2CookieAuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.domain.User;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.dto.response.LoginResponseDto;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.exception.OAuth2LoginException;
import com.hikers.sanneomeo.repository.UserRepository;
import com.hikers.sanneomeo.security.jwt.JwtTokenInfo;
import com.hikers.sanneomeo.utils.CookieUtils;
import com.hikers.sanneomeo.utils.JsonUtils;
import com.hikers.sanneomeo.utils.JwtTokenUtils;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.support.RedirectAttributesModelMap;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Slf4j
@Transactional
public class CustomOAuth2UserFailureHandler extends SimpleUrlAuthenticationFailureHandler{

  private final YmlConfig ymlConfig;
  private final UserRepository userRepository;

  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException exception) throws IOException {

    //SIGN_UP status가 아닌 경우 -> 그 외 에러 처리
    if(!(exception instanceof OAuth2LoginException)){
      log.error("Uncatched Error occurs {}", exception.getMessage());
      JsonUtils.writeJsonExceptionResponse(response, BaseResponseStatus.OAUTH_SETTING_ERROR);
      return;
    }

    //회원 가입
    OAuth2LoginException loginException = (OAuth2LoginException)exception;
    CustomOAuth2User customOAuth2User = loginException.getCustomOAuth2User();

    // 회원 레코드 저장
    User user = User.builder()
        .social(customOAuth2User.getRegistrationId())
        .socialId(customOAuth2User.getSocialId())
        .nickname(customOAuth2User.getNickname())
        .profileImage(customOAuth2User.getProfileImg())
        .level(1)
        .build();

    userRepository.save(user);

    //jwt token 발급
    JwtTokenInfo jwtTokenInfo = JwtTokenUtils.allocateToken(user.getUserSeq(), "ROLE_USER");

    //쿠키에서 redirectUri 빼기
    String baseUrl = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME).getValue();

    String url = UriComponentsBuilder.fromUriString(baseUrl)
        .queryParam("level", 1)
        .queryParam("token", jwtTokenInfo.getAccessToken())
        .encode()
        .build().toUriString();

    getRedirectStrategy().sendRedirect(request, response, url);

  }


}
