import React, { useEffect } from 'react';
import {
  getUserTrailLike,
  userTrailLike,
} from '@features/user/userTrailLikeSlice';
import MascottMain from '@components/main/MascottMain';
import TrailItems from '@components/trail/TrailItems';
import { useAppDispatch, useAppSelector } from '@app/hooks';

function UserWishList() {
  // 찜리스트 소환 slice
  const userLikeData = useAppSelector(userTrailLike);
  const userLikeDispatch = useAppDispatch();

  const trailLikeArray = userLikeData.result;
  useEffect(() => {
    userLikeDispatch(getUserTrailLike());
    console.log(userLikeData);
  }, []);
  // 람쥐찜문구
  const mascottMessage = '아직 찜리스트가 없네';

  return (
    <>
      <hr />
      <MascottMain balloonText={mascottMessage} />
      <div className="trailbox">
        <div>
          {trailLikeArray &&
            trailLikeArray.map((trail) => (
              <TrailItems
                key={trail.trailSeq}
                mountainSeq={trail.mountainSeq}
                trailKey={trail.trailSeq}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default UserWishList;
