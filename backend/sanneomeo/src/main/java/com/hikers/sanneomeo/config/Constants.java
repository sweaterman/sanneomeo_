package com.hikers.sanneomeo.config;

public class Constants {
  //URIS
  public static final String[] SECURITY_WEB_EXCLUDE_URIS = {"/resources/**", "/csrf", "/error", "/swagger*/**", "favicon.ico", "/webjars/**","/swagger-ui/**"};
  public static final String[] SECURITY_HTTP_EXCLUDE_URIS = {"/user/after/login", "/user/token","/user/info", "/user/challenge", "/main/**", "/trail/recommend/**", "/trail/info/**","/spot/**", "/mountain/trail/**", "/mountain/photo/**", "/mountain/search" , "/mountain/info/**", "/mountain/position/**", "/mountain/review/**", "/mountain/season", "/mountain/hundred","/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**"};
  public static final String[] CORS_HEADER_URIS = {"Authorization", "Refresh", "content-type"};
  public static final String SECURITY_LOGIN_PROCESSING_URI = "/user/login/callback/*";
  public static final String BASE_URI = "/user/login";
  public static final String SECURITY_AFTER_LOGIN = "https://sanneomeo.site/user/login/callback";



}
