import TrailItems from '@components/trail/TrailItems';
import MascottMain from '@components/main/MascottMain';
import React from 'react';

function RecomResult() {
  // 람쥐결과문구
  const mascottMessage = '결과를 보여준다람쥐';

  return (
    <>
      <hr />
      <MascottMain balloonText={mascottMessage} />
      <div className="trailbox">
        <div></div>
      </div>
    </>
  );
}

export default RecomResult;
