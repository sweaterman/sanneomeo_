import React from 'react';
import { Link } from 'react-router-dom';
import googleLogin from '@assets/images/google_login.png';
import naverLogin from '@assets/images/naver_login.png';
import kakaoLogin from '@assets/images/kakao_login.png';

function UserLogin() {
  const loginToGoogle = () => {
    console.log('google');
  };
  const loginToNaver = () => {
    console.log('naver');
  };
  const loginToKakao = () => {
    console.log('kakao');
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
