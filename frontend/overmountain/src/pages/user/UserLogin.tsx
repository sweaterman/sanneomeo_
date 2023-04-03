import React from 'react';
import googleLogin from '@assets/images/google_login.png';
import naverLogin from '@assets/images/naver_login.png';
import kakaoLogin from '@assets/images/kakao_login.png';
import googleLogo from '@assets/images/google-logo.png';
import naverLogo from '@assets/images/naver-logo.png';
import kakaoLogo from '@assets/images/kakao-logo.png';


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
      <div className="login-welcome-text">
        Welcome!
      </div>
      <br />
      <button type="button" onClick={loginToGoogle}>
        <div className="login-button google-login">
          <img className="logo-img" src={googleLogo} alt="googleLogo"/>
          <div className="login-text">구글 로그인</div>
        </div>
      </button>
      <button type="button" onClick={loginToGoogle}>
        <div className="login-button naver-login">
          <img className="logo-img" src={naverLogo} alt="naverLogo"/>
          <div className="login-text">네이버 로그인</div>
        </div>
      </button>
      <button type="button" onClick={loginToGoogle}>
        <div className="login-button kakao-login">
          <img className="logo-img" src={kakaoLogo} alt="kakaoLogo"/>
          <div className="login-text">카카오 로그인</div>
        </div>
      </button>



      {/* <img
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
      /> */}
    </div>
  );
}

export default UserLogin;
