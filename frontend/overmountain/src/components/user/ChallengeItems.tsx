import React from 'react';
import mountain from '@assets/images/mountain_selected.svg';
import MainRamgi from '@assets/images/flagramgi.png';

function PhotoItems() {
  return (
    <>
      <div className="photolist">
        <img alt="list" />
      </div>
      <div>
        <div className="mountain-name">관악산</div>
        <div className="height">330m</div>
        <div className="address">서울시 관악구 신림동</div>
        <div className="difficulty">
          <img src={mountain} alt="difficulty" />
          <img src={mountain} alt="difficulty" />
          <img src={mountain} alt="difficulty" />
        </div>
      </div>
      <div className="conquer-mascott">
        <img src={MainRamgi} alt="MainRamgi" />
      </div>
    </>
  );
}

export default PhotoItems;
