/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ramgi from '@assets/images/ramgi_camera.png';

function SpotButton(props: any) {
  return (
    <div className="spot-parent">
      <div
        className="spot-button"
        role="presentation"
        onClick={props.positionClick}
        onKeyDown={props.positionClick}
      >
        <div className="inner">
          <img src={ramgi} alt="" />
        </div>
      </div>
    </div>
  );
}

export default SpotButton;
