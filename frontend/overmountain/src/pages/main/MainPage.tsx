import React from 'react';
import Searchbar from '@components/main/Searchbar';
import MountainItem from '@components/main/MountainItems';
import MapContainer from '@components/common/MapContainer';
import MascottMain from '@components/main/MascottMain';
import { NavLink } from 'react-router-dom';

function MainPage() {
  return (
    <div className="mainpage">
      <Searchbar />
      <MapContainer />
      <div className="flex">
        <MascottMain />
      </div>
      <div className="mountain-suggestion">
        <div className="suggestion-text">가을산</div>
        <div className="itembox">
          <MountainItem />
        </div>
      </div>
      <div className="mountain-suggestion">
        <div className="suggestion-text">
          <NavLink to="/user/challenge" className="user-challenge">
            대한민국 100대 명산
          </NavLink>
        </div>
        <MountainItem />
      </div>
    </div>
  );
}

export default MainPage;
