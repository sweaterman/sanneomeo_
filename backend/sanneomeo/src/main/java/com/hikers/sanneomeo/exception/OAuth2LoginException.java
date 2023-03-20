package com.hikers.sanneomeo.exception;

import com.hikers.sanneomeo.security.oauth2.CustomOAuth2User;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;

//OAuth2 인증 과정에서 발생하는 Exception
//현재 db에 존재하지 않는 유저에 대해 exception을 발생시키고 handler에서 처리해야하므로
//CustomOAuth2User 인스턴스를 필드로 가진다.
public class OAuth2LoginException extends OAuth2AuthenticationException {

    private CustomOAuth2User customOAuth2User;

    public OAuth2LoginException(BaseResponseStatus baseResponseStatus, CustomOAuth2User customOAuth2User) {
        super(String.valueOf(baseResponseStatus.getCode()));
        this.customOAuth2User = customOAuth2User;
    }

    public CustomOAuth2User getCustomOAuth2User() {
        return customOAuth2User;
    }
}
