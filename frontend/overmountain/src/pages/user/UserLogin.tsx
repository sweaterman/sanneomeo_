import React from 'react';
import googleLogin from '@assets/images/google_login.png';
import naverLogin from '@assets/images/naver_login.png';
import kakaoLogin from '@assets/images/kakao_login.png';
import { baseURL } from '@features/port';

function UserLogin() {
  const URL = `${baseURL}user/login/`;

  const loginToGoogle = () => {
    console.log('google');
    window.location.href = `${URL}google`;
  };
  const loginToNaver = () => {
    console.log('naver');
    window.location.href = `${URL}naver`;
  };
  const loginToKakao = () => {
    console.log('kakao');
    window.location.href = `${URL}kakao`;
  };

  return (
    <div className="login-box">
      <br />
      <img
        className="google-login"
        src={googleLogin}
        alt="googleLogin"
        role="presentation"
        onClick={loginToGoogle}
      />
      <img
        className="naver-login"
        src={naverLogin}
        alt="naverLogin"
        role="presentation"
        onClick={loginToNaver}
      />

      <img
        className="kakao-login"
        src={kakaoLogin}
        alt="kakaoLogin"
        role="presentation"
        onClick={loginToKakao}
      />
    </div>
  );
}

export default UserLogin;
