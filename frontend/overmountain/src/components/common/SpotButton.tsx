/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ramgi from '@assets/images/ramgi_camera.png';

function SpotButton(props: any) {
  return (
    <div>
      <div className="spot-message">가까운 산으로 바로 추천</div>
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
    </div>
  );
}

export default SpotButton;
