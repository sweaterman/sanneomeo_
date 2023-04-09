import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toogleNavBar, navbarState } from '@features/commonSlice/navSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { isLoginCheck, loginState } from '@features/commonSlice/loginSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Navbar() {
  const navigate = useNavigate();

  // 로그인 여부 확인
  const [isLogin, setIsLogin] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  // 로그인상태 가져오기
  const isLoginState = useAppSelector(loginState);

  // NavState 가져오기
  const navState = useAppSelector(navbarState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isLoginCheck(isLogin));
  }, []);

  // 페이지 이동 함수
  const navigateToWhat = (linkParam: string | null) => {
    dispatch(toogleNavBar(false));
    if (linkParam === null) {
      navigate('/');
    } else {
      navigate(`/${linkParam}`);
    }
  };

  const onLogout = () => {
    localStorage.clear();
    dispatch(isLoginCheck(false));
    setIsLogin(false);
    navigate('/');
    dispatch(toogleNavBar(false));
  };

  return (
    <nav>
      <div className="nav-content">
        <div className="header-font-group">
          <div
            className="header-font-tag"
            role="presentation"
            onClick={() => navigateToWhat(null)}
            onKeyDown={() => navigateToWhat(null)}
          >
            산너머&nbsp;
          </div>

          <div
            className="header-font-tag"
            role="presentation"
            onClick={() => navigateToWhat('recommend/question')}
            onKeyDown={() => navigateToWhat('recommend/question')}
          >
            람쥐추천&nbsp;
          </div>
          {/* {renderNavbar()} */}
          {/* 로그인여부 확인하는 삼항연산자 */}

          {isLoginState.isLogin ? (
            <div>
              <div
                className="header-font-tag"
                role="presentation"
                onClick={onLogout}
                onKeyDown={onLogout}
              >
                로그아웃&nbsp;
              </div>
              {/* <div
                className="header-font-tag"
                role="presentation"
                onClick={() => navigateToWhat('user/mypage')}
                onKeyDown={() => navigateToWhat('user/mypage')}
              >
                나의기록&nbsp;
              </div> */}
              <div
                className="header-font-tag"
                role="presentation"
                onClick={() => navigateToWhat('user/wishlist')}
                onKeyDown={() => navigateToWhat('user/wishlist')}
              >
                찜리스트&nbsp;
              </div>
            </div>
          ) : (
            <div
              className="header-font-tag"
              role="presentation"
              onClick={() => navigateToWhat('user/login')}
              onKeyDown={() => navigateToWhat('user/login')}
            >
              로그인&nbsp;
            </div>
          )}
          <div
            className="header-font-tag"
            role="presentation"
            onClick={() => navigateToWhat('user/challenge')}
            onKeyDown={() => navigateToWhat('user/challenge')}
          >
            100대 명산 완등&nbsp;
          </div>
        </div>
      </div>
      {/* overlay element to close navbar */}
      {navState.toogle && (
        <div
          className="navbar-overlay"
          onClick={() => dispatch(toogleNavBar(false))}
          role="presentation"
        />
      )}
    </nav>
  );
}

export default Navbar;
