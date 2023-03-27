import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function Navbar({ isOpen, onClose }: any) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // 해당 페이지로 이동선언하는 함수
  const navigateToMain = () => {
    console.log('go to main!');
    navigate('/');
  };
  const navigateToRecommend = () => {
    console.log('go to recommend!');
    navigate('/recommend/question');
  };
  const navigateToMypage = () => {
    console.log('go to mypage!');
    navigate('/user/mypage');
  };
  const navigateToWishlist = () => {
    console.log('go to wishlist!');
    navigate('/user/wishlist');
  };
  const navigateToLogin = () => {
    console.log('go to login!');
    navigate('/user/login');
  };
  const navigateToChallenge = () => {
    console.log('go to 100 Challenge!');
    navigate('/user/challenge');
  };

  const onLogout = () => {
    // 메인으로 이동(새로고침)
    navigate('/');
    // sessionStorage에 accessToken로 저장되어 있는 아이템을 삭제
    sessionStorage.clear();
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : 'hidden'}`}>
      <div className="nav-content">
        <div className="header-font-group">
          <div
            className="header-font-tag"
            // 정적인 div에서 동적인 onClick 기능 사용하기 위해 role 지정(eslint)
            role="presentation"
            // 표준 HTML 규칙 준수를 위한 onClick + onKeyDown 설정
            onClick={navigateToMain}
            onKeyDown={navigateToMain}
          >
            산너머&nbsp;
          </div>

          <div
            className="header-font-tag"
            role="presentation"
            onClick={navigateToRecommend}
            onKeyDown={navigateToRecommend}
          >
            람쥐추천&nbsp;
          </div>
          {/* 로그인여부 확인하는 삼항연산자 */}
          {isLogin ? (
            <div>
              <div
                className="header-font-tag"
                role="presentation"
                onClick={onLogout}
                onKeyDown={onLogout}
              >
                나가기&nbsp;
              </div>
              <div
                className="header-font-tag"
                role="presentation"
                onClick={navigateToMypage}
                onKeyDown={navigateToMypage}
              >
                나의기록&nbsp;
              </div>
              <div
                className="header-font-tag"
                role="presentation"
                onClick={navigateToWishlist}
                onKeyDown={navigateToWishlist}
              >
                찜리스트&nbsp;
              </div>
            </div>
          ) : (
            <div
              className="header-font-tag"
              role="presentation"
              onClick={navigateToLogin}
              onKeyDown={navigateToLogin}
            >
              들어가기&nbsp;
            </div>
          )}
          <div
            className="header-font-tag"
            role="presentation"
            onClick={navigateToChallenge}
            onKeyDown={navigateToChallenge}
          >
            100대 명산 완등&nbsp;
          </div>
        </div>
      </div>
      {/* overlay element to close navbar */}
      {isOpen && (
        <div className="navbar-overlay" onClick={onClose} role="presentation" />
      )}
    </nav>
  );
}

export default Navbar;
