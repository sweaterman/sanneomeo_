import React from 'react';
import headermountain from '@assets/images/headermountain.jpeg';
import { GiHamburgerMenu } from 'react-icons/gi';
import Navbar from '@components/common/Navbar';

function Header() {
  return (
    <div>
      <Navbar />
      <GiHamburgerMenu />
      <img
        src={headermountain}
        className="header-background"
        alt="headerbackground"
      />
      {/* page-title 향후 페이지명 동적바인딩  */}
      <div className="page-title">들어가기</div>
    </div>
  );
}

export default Header;
