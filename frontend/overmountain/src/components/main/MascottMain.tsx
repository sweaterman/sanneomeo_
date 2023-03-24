import React from 'react';
import { Link } from 'react-router-dom';
import Balloon from '@components/common/balloon';
import MainRamgi from '@assets/images/flagramgi.png';

function MascottMain() {
  return (
    <div>
      <Link to="/recommend/question">
        <Balloon />
        <img src={MainRamgi} alt="MainRamgi" />
      </Link>
    </div>
  );
}

export default MascottMain;
