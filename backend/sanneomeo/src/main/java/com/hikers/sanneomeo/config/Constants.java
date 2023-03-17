package com.hikers.sanneomeo.config;

public class Constants {
  public static final String[] SECURITY_WEB_EXCLUDE_URIS = {"/resources/**", "/error", "/swagger*/**"};
  public static final String[] SECURITY_HTTP_EXCLUDE_URIS = {"/", "/user/login/after"};

  public static final String[] CORS_HEADER_URIS = {"Authorization", "Refresh"};
}
