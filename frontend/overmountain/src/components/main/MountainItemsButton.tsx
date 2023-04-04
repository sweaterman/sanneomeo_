import React from 'react';
import { NavLink } from 'react-router-dom';

function MountainItemsButton() {
  return (
    <div className="mountain-items-button">
      <NavLink to="/user/challenge">
        <h5>바로가기 &gt;</h5>
      </NavLink>
    </div>
  );
}

export default MountainItemsButton;
