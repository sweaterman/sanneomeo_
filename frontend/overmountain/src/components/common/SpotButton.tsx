import React from 'react';
import ramgi from '@assets/images/ramgi_camera.png';

function SpotButton() {
  return (
    <div className="spot-button">
      <div className="inner">
        <img src={ramgi} alt="" />
      </div>
    </div>
  );
}

export default SpotButton;
