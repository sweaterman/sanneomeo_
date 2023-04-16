import React, { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Navbar from '@components/common/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import TempLogo from '@assets/images/temp_logo.png';
import { toogleNavBar, navbarState } from '@features/commonSlice/navSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';

function Header() {
  const navState = useAppSelector(navbarState);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  // 해당 페이지로 이동선언하는 함수
  const navigateToMain = () => {
    navigate('/');
  };
  useEffect(() => {
    dispatch(toogleNavBar(false));
  }, [location.pathname, navigate]);

  const toggleNavHandler = () => {
    dispatch(toogleNavBar(!navState.toogle));
  };

  return (
    <div className="common-header">
      <div className="header-nav">
        <div
          className="nav-logo"
          role="presentation"
          onClick={navigateToMain}
          onKeyDown={navigateToMain}
        >
          <img src={TempLogo} alt="sanneomeo" />
          <h1>산너머</h1>
        </div>
        <div
          className={`navbar-wrapper ${navState.toogle ? 'open' : 'hidden'}`}
        >
          <Navbar />
        </div>
        <GiHamburgerMenu
          onClick={toggleNavHandler}
          className="cursor-pointer"
          color="white"
          size="30px"
          style={{ zIndex: 9999 }}
        />
      </div>
    </div>
  );
}

export default Header;
