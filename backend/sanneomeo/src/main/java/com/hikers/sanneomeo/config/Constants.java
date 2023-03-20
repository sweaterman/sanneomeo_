package com.hikers.sanneomeo.config;

public class Constants {
  //URIS
  public static final String[] SECURITY_WEB_EXCLUDE_URIS = {"/resources/**", "/error", "/swagger*/**"};
  public static final String[] SECURITY_HTTP_EXCLUDE_URIS = {"/", "/user/login/after"};
  public static final String[] CORS_HEADER_URIS = {"Authorization", "Refresh"};
  public static final String SECURITY_LOGIN_PROCESSING_URI = "/user/login/callback/*";
  public static final String BASE_URI = "/user/login";

}
