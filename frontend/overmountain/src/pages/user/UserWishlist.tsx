import React, { useEffect } from 'react';
import {
  getUserTrailLike,
  userTrailLike,
} from '@features/user/userTrailLikeSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import RecomLikeTrail from '@components/common/RecomLikeTrail';

function UserWishList() {
  // 처음에 찜리스트 받아오기
  const userLikeData = useAppSelector(userTrailLike);
  const userLikeDispatch = useAppDispatch();
  useEffect(() => {
    userLikeDispatch(getUserTrailLike());
  }, []);

  return (
    <div className="user-wishlist">
      <div className="wish-header">
        <div className="wish-title">
          <h1>내가 찜한 등산로</h1>
          {/* <span>
          찜해놓은 등산로를 확인해봐요!
          </span> */}
        </div>
      </div>

      {/* 등산로들 컴포넌트  */}
      <RecomLikeTrail data={userLikeData.result} />
    </div>
  );
}

export default UserWishList;
