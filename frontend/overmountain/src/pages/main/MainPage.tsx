import React from 'react';
import Searchbar from '@components/main/Searchbar';
import MountainItem from '@components/main/MountainItems';
import MapContainer from '@components/common/MapContainer';
import MascottMain from '@components/main/MascottMain';

function MainPage() {
  return (
    <div>
      <h1>Hello Main!</h1>
      <Searchbar />
      <MapContainer />
      <MascottMain />
      <div className="mountain-suggestion">
        <div>가을산</div>
        <MountainItem />
      </div>
      <div className="mountain-suggestion">
        <div>대한민국 100대 명산</div>
        <MountainItem />
      </div>
    </div>
  );
}

export default MainPage;
