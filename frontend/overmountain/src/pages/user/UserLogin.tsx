import React from 'react';
import googleLogo from '@assets/images/google-logo.png';
import naverLogo from '@assets/images/naver-logo.png';
import kakaoLogo from '@assets/images/kakao-logo.png';
import Lottie from 'lottie-react';
import squirrelAnimation from '@assets/lottie/squirrel.json';

import { baseURL } from '@features/port';

function UserLogin() {
  const URL = `${baseURL}user/login/`;

  const loginToGoogle = () => {
    window.location.href = `${URL}google`;
  };
  const loginToNaver = () => {
    window.location.href = `${URL}naver`;
  };
  const loginToKakao = () => {
    window.location.href = `${URL}kakao`;
  };

  return (
    <div className="login-box">
      <div className="login-welcome-text">
        <Lottie
          style={{ height: 320 }}
          animationData={squirrelAnimation}
          loop={false}
        />
      </div>
      <br />
      <button type="button" onClick={loginToGoogle}>
        <div className="login-button google-login">
          <img className="logo-img" src={googleLogo} alt="googleLogo" />
          <div className="login-text">구글 로그인</div>
        </div>
      </button>
      <button type="button" onClick={loginToNaver}>
        <div className="login-button naver-login">
          <img className="logo-img" src={naverLogo} alt="naverLogo" />
          <div className="login-text">네이버 로그인</div>
        </div>
      </button>
      <button type="button" onClick={loginToKakao}>
        <div className="login-button kakao-login">
          <img className="logo-img" src={kakaoLogo} alt="kakaoLogo" />
          <div className="login-text">카카오 로그인</div>
        </div>
      </button>
    </div>
  );
}

export default UserLogin;
