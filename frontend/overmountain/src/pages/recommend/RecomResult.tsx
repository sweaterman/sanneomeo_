import TrailItems from '@components/trail/TrailItems';
import MascottMain from '@components/main/MascottMain';
import React from 'react';

function RecomResult() {
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

export default RecomResult;
