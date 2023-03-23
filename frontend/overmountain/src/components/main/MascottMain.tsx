import React from 'react';
import { Link } from 'react-router-dom';
import MainRamgi from '@assets/images/flagramgi.png';

function MascottMain() {
  return (
    <div>
      <Link to="/recommend/question">
        <div>어디로 가야할지 모르겠다면?</div>
        <div>등산중이라면?</div>
        <img src={MainRamgi} alt="MainRamgi" />
      </Link>
    </div>
  );
}

export default MascottMain;
