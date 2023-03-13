package com.hikers.sanneomeo.security.oauth2;

import com.hikers.sanneomeo.utils.CookieUtils;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.util.Assert;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

public class CustomOAuth2CookieAuthorizationRequestRepository<T extends OAuth2AuthorizationRequest> implements
    AuthorizationRequestRepository {

  public static final String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
  public static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
  private static final char PATH_DELIMITER = '/';
  private static final int cookieExpireSeconds = 180;
  private final ClientRegistrationRepository clientRegistrationRepository;

  public CustomOAuth2CookieAuthorizationRequestRepository(
      ClientRegistrationRepository clientRegistrationRepository) {
    this.clientRegistrationRepository = clientRegistrationRepository;
  }

  /**
   * request의 OAuth2AuthorizationRequest 쿠키를 찾아 반환한다.
   *
   * @param request OAuth2 로그인 request
   */
  @Override
  public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
    return Optional.ofNullable(
            CookieUtils.getCookie(request, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME))
        .map(cookie -> CookieUtils.deserialize(cookie, OAuth2AuthorizationRequest.class))
        .orElse(null);
  }


  @Override
  public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request, HttpServletResponse response) {
    CookieUtils.addCookie(response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME,
        CookieUtils.serialize(authorizationRequest), cookieExpireSeconds);
    String redirectUriAfterLogin = "http://localhost:9090/login/after";
    CookieUtils.addCookie(response, REDIRECT_URI_PARAM_COOKIE_NAME, redirectUriAfterLogin, cookieExpireSeconds);
//    String redirectUriAfterLogin = request.getParameter(REDIRECT_URI_PARAM_COOKIE_NAME);
//    if (StringUtils.isNotBlank(redirectUriAfterLogin)) {
//      CookieUtils.addCookie(response, REDIRECT_URI_PARAM_COOKIE_NAME, redirectUriAfterLogin,
//          cookieExpireSeconds);
//    }
  }

  //쿠키의 authorizationRequest 삭제
  //쿠키에 AuthorizationRequest가 없는 상태에서 loginFilter가 이 메소드를 호출할 수 있으므로
  //request에서 적절한 AuthorizationRequest를 생성하여 반환해줘야 함.
  //AuthorizationRequest 생성 로직은 RequestResolver를 그대로 따라간다.
  @Override
  public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request) {
    Assert.notNull(request, "request cannot be null");

    OAuth2AuthorizationRequest originalRequest = this.loadAuthorizationRequest(request);

    // 만약 쿠키에 original request가 없을 경우 카카오의 client registration에 맞는 authorizationRequest 생성
    // following logic is based on DefaultOAuth2AuthorizationRequestResolver.resolve()
    if (originalRequest == null) {
      ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId("kakao");
      if (clientRegistration == null) {
        throw new IllegalArgumentException("Invalid Client Registration with Id: kakao");
      }
      OAuth2AuthorizationRequest.Builder builder = OAuth2AuthorizationRequest.authorizationCode()
          .attributes((attrs) ->
              attrs.put(OAuth2ParameterNames.REGISTRATION_ID,
                  clientRegistration.getRegistrationId()));

      String redirectUriStr = expandRedirectUri(request, clientRegistration, "login");

      builder.clientId(clientRegistration.getClientId())
          .authorizationUri(clientRegistration.getProviderDetails().getAuthorizationUri())
          .redirectUri(redirectUriStr)
          .scopes(clientRegistration.getScopes())
          .state(request.getParameter("state"));

      originalRequest = builder.build();
    }

    return originalRequest;
  }

  /**
   * client registration 설정을 활용해 인가코드 요청 주소를 만든다.
   * following method is based on DefaultOAuth2AuthorizationRequestResolver.expandRedirectUri()
   *
   * @param request OAuth2 로그인 request
   * @param clientRegistration OAuth2 로그인 인증 서버 정보
   * @param action login과 같은 action
   */
  private static String expandRedirectUri(HttpServletRequest request, ClientRegistration clientRegistration, String action) {
    Map<String, String> uriVariables = new HashMap<>();
    uriVariables.put("registrationId", clientRegistration.getRegistrationId());
    // @formatter:off
    UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(
            UrlUtils.buildFullRequestUrl(request))
        .replacePath(request.getContextPath())
        .replaceQuery(null)
        .fragment(null)
        .build();
    // @formatter:on

    String scheme = uriComponents.getScheme();
    uriVariables.put("baseScheme", (scheme != null) ? scheme : "");
    String host = uriComponents.getHost();
    uriVariables.put("baseHost", (host != null) ? host : "");
    // following logic is based on HierarchicalUriComponents#toUriString()
    int port = uriComponents.getPort();
    uriVariables.put("basePort", (port == -1) ? "" : ":" + port);
    String path = uriComponents.getPath();
    if (org.springframework.util.StringUtils.hasLength(path)) {
      if (path.charAt(0) != PATH_DELIMITER) {
        path = PATH_DELIMITER + path;
      }
    }
    uriVariables.put("basePath", (path != null) ? path : "");
    uriVariables.put("baseUrl", uriComponents.toUriString());
    uriVariables.put("action", (action != null) ? action : "");
    return UriComponentsBuilder.fromUriString(clientRegistration.getRedirectUri())
        .buildAndExpand(uriVariables)
        .toUriString();
  }

}
