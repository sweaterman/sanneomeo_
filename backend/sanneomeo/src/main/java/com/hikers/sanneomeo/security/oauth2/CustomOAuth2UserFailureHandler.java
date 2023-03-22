package com.hikers.sanneomeo.security.oauth2;

import static com.hikers.sanneomeo.security.oauth2.CustomOAuth2CookieAuthorizationRequestRepository.OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME;
import static com.hikers.sanneomeo.security.oauth2.CustomOAuth2CookieAuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;


import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.domain.User;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.exception.OAuth2LoginException;
import com.hikers.sanneomeo.repository.UserRepository;
import com.hikers.sanneomeo.security.jwt.JwtTokenInfo;
import com.hikers.sanneomeo.utils.CookieUtils;
import com.hikers.sanneomeo.utils.JsonUtils;
import com.hikers.sanneomeo.utils.JwtTokenUtils;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Slf4j
@Transactional
public class CustomOAuth2UserFailureHandler extends SimpleUrlAuthenticationFailureHandler{

  private final UserRepository userRepository;

  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException exception) throws IOException {

    // CustomOAuth2UserService에서 발생한 SIGN_UP_REQUIRED 에러가 아닌 경우
    if(!(exception instanceof OAuth2LoginException)){
      log.error("Uncatched Error occurs {}", exception.getMessage());
      JsonUtils.writeJsonExceptionResponse(response, BaseResponseStatus.OAUTH_UNKOWN_ERROR);
      return;
    }

    // 회원 가입을 진행하기 위해 CustomOAuth2User를 추출한다.
    CustomOAuth2User customOAuth2User = ((OAuth2LoginException)exception).getCustomOAuth2User();

    // 회원 레코드를 저장한다.
    User user = User.builder()
        .social(customOAuth2User.getRegistrationId())
        .socialId(customOAuth2User.getSocialId())
        .nickname(customOAuth2User.getNickname())
        .profileImage(customOAuth2User.getProfileImg())
        .build();

    userRepository.save(user);

    //jwt 토큰을 발급한다.
    JwtTokenInfo jwtTokenInfo = JwtTokenUtils.allocateToken(user.getUserSeq(), "ROLE_USER");

    //cookie에서 redirectUrl을 추출하고, redirect 주소를 생성한다.
    //현재 주소는 http://localhost:9090/user/after/login?token={token}이다.
    String baseUrl = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME).getValue();
    String url = UriComponentsBuilder.fromUriString(baseUrl)
        .queryParam("token", jwtTokenInfo.getAccessToken())
        .build().toUriString();

    //쿠키를 삭제한다.
    CookieUtils.deleteCookie(request,response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
    CookieUtils.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);

    //리다이렉트 시킨다.
    getRedirectStrategy().sendRedirect(request, response, url);

  }


}
