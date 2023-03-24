import React from 'react';
import MascottMain from '@components/main/MascottMain';
import TrailItems from '@components/trail/TrailItems';

function UserWishList() {
  return (
    <>
      <hr />
      <MascottMain />
      <div className="trailbox">
        <TrailItems />
      </div>
    </>
  );
}

export default UserWishList;
