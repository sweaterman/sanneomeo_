import React from 'react';
import sample from '@assets/images/mountsample.png';

function MountainItems() {
  return (
    <div className="mountain-items">
      <img src={sample} alt="도봉산" />
      <div className="mountain-name">도봉산</div>
    </div>
  );
}

export default MountainItems;
