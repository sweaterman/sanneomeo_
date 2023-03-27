import React, { useState } from 'react';
import headermountain from '@assets/images/headermountain.jpeg';
import { GiHamburgerMenu } from 'react-icons/gi';
import Navbar from '@components/common/Navbar';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavHandler = () => {
    setIsNavOpen(!isNavOpen);
    console.log(isNavOpen);
  };

  return (
    <div className="relative">
      <Navbar isOpen={isNavOpen} onClose={toggleNavHandler} />
      <GiHamburgerMenu
        onClick={toggleNavHandler}
        className={`cursor-pointer ${isNavOpen ? 'hidden' : 'block'}`}
      />
      <img
        src={headermountain}
        className="header-background"
        alt="headerbackground"
      />
      {/* page-title 향후 페이지명 동적바인딩  */}
      <div className="page-title">페이지명이 들어갈자리</div>
    </div>
  );
}

export default Header;
