package com.hikers.sanneomeo.security.oauth2;


import static com.hikers.sanneomeo.security.oauth2.CustomOAuth2CookieAuthorizationRequestRepository.OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME;
import static com.hikers.sanneomeo.security.oauth2.CustomOAuth2CookieAuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.security.CustomAuthenticatedUser;
import com.hikers.sanneomeo.security.jwt.JwtTokenInfo;
import com.hikers.sanneomeo.utils.JwtTokenUtils;
import com.hikers.sanneomeo.utils.CookieUtils;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
public class CustomOAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

  private final YmlConfig ymlConfig;
  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

    //쿠키에서 기존에 저장된 refresh token을 삭제한다.
    if(CookieUtils.getCookie(request,"refresh-token")!=null){
      CookieUtils.deleteCookie(request, response, "refresh-token");
    }

    //authentication 객체에서 attribute를 추출하고, CustomAuthenticatedUser를 생성한다.
    CustomAuthenticatedUser customAuthenticatedUser = CustomAuthenticatedUser
        .mapToObj(((DefaultOAuth2User)authentication.getPrincipal()).getAttributes());

    //jwt 토큰을 생성한다.
    JwtTokenInfo jwtTokenInfo = JwtTokenUtils.allocateToken(customAuthenticatedUser.getUserSeq(), customAuthenticatedUser.getRole());

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