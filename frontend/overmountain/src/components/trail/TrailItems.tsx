import React from 'react';
import mountain from '@assets/images/mountain_selected.svg';
import like from '@assets/images/flag_selected.svg';

function TrailItems() {
  return (
    <>
      <div className="trail-name">제 1등산로</div>
      <div className="trail-time">2시간</div>
      <div className="trail-length">3.2km</div>
      <div className="difficulty">
        <img src={mountain} alt="difficulty" />
      </div>
      <div className="like">
        <img src={like} alt="like" />
      </div>
    </>
  );
}

export default TrailItems;
