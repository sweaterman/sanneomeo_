import React from 'react';
import Searchbar from '@components/main/Searchbar';
import MountainItem from '@components/main/MountainItems';
import MapContainer from '@components/common/MapContainer';

function MainPage() {
  return (
    <div>
      <h1>Hello Main!</h1>
      <MapContainer />
      <Searchbar />
      <MountainItem />
    </div>
  );
}

export default MainPage;
