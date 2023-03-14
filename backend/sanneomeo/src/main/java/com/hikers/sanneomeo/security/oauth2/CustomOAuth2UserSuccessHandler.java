package com.hikers.sanneomeo.security.oauth2;


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

//    만약 기존에 쿠키에 저장된 refresh token이 존재할 경우 강제 삭제
    if(CookieUtils.getCookie(request,"refresh-token")!=null){
      CookieUtils.deleteCookie(request, response, "refresh-token");
    }

    //user attributes 추출
    CustomAuthenticatedUser customAuthenticatedUser = CustomAuthenticatedUser.mapToObj(((DefaultOAuth2User)authentication.getPrincipal()).getAttributes());

    //jwt 토큰 생성 후 refresh token 저장
    JwtTokenInfo jwtTokenInfo = JwtTokenUtils.allocateToken(customAuthenticatedUser.getUserSeq(), customAuthenticatedUser.getRole());

    String url = UriComponentsBuilder.fromUriString(ymlConfig.getRedirectUri())
        .queryParam("level", customAuthenticatedUser.getLevel())
        .queryParam("token", jwtTokenInfo.getAccessToken())
        .build().toUriString();

    getRedirectStrategy().sendRedirect(request, response, url);

  }


}