import React from 'react';
import Searchbar from '@components/main/Searchbar';
import MountainItem from '@components/main/MountainItems';

function MainPage() {
  return (
    <div>
      <h1>Hello Main!</h1>
      <Searchbar />
      <MountainItem />
    </div>
  );
}

export default MainPage;
