import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLogin, setIsLogin] = useState();
  const navigate = useNavigate();

  const navigateToMain = () => {
    console.log('go to review!');
    navigate('/');
  };
  const navigateToRecommend = () => {
    console.log('go to recommend!');
    navigate('/recommend/question');
  };
  const navigateToLogin = () => {
    console.log('go to login!');
    navigate('/user/login');
  };

  const onLogout = () => {
    // 메인으로 이동(새로고침)
    navigate('/');
    // sessionStorage에 accessToken로 저장되어 있는 아이템을 삭제
    sessionStorage.clear();
  };

  return (
    <div>
      <nav className="nav">
        <div
          className="nav-logo"
          role="presentation"
          onClick={() => {}}
          onKeyDown={navigateToMain}
        >
          <img src="#" alt="sanneomeo" />
        </div>

        <div className="header-font-group">
          <div
            className="header-font-tag"
            role="presentation"
            onClick={() => {}}
            onKeyDown={navigateToMain}
          >
            산너머&nbsp;
          </div>

          <div
            className="header-font-tag"
            role="presentation"
            onClick={() => {}}
            onKeyDown={navigateToRecommend}
          >
            람쥐추천&nbsp;
          </div>

          {isLogin ? (
            <div>
              <div
                className="header-font-tag"
                role="presentation"
                onClick={() => {}}
                onKeyDown={onLogout}
              >
                나가기&nbsp;
              </div>
              <div
                className="header-font-tag"
                role="presentation"
                onClick={() => {}}
                onKeyDown={navigateToLogin}
              >
                나의기록&nbsp;
              </div>
              <div
                className="header-font-tag"
                role="presentation"
                onClick={() => {}}
                onKeyDown={navigateToLogin}
              >
                찜리스트&nbsp;
              </div>
            </div>
          ) : (
            <div
              className="header-font-tag"
              role="presentation"
              onClick={() => {}}
              onKeyDown={navigateToLogin}
            >
              들어가기&nbsp;
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
