import React, { useEffect } from 'react';
import {
  getUserTrailLike,
  userTrailLike,
} from '@features/user/userTrailLikeSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';

function UserWishList() {
  // 처음에 찜리스트 받아오기
  const userLikeData = useAppSelector(userTrailLike);
  const userLikeDispatch = useAppDispatch();
  useEffect(() => {
    userLikeDispatch(getUserTrailLike());
  }, []);

  return (
    <>
      <div>내가 찜한 등산로 리스트</div>

      {/* 하나의 등산로 컴포넌트  */}
      <div className="trailbox">
        {userLikeData.result &&
          userLikeData.result.map((singleTrail) => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <div>{singleTrail.name}</div>
              <div>{singleTrail.difficulty}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default UserWishList;
