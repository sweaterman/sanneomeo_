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
    <>
      <div>내가 찜한 등산로 리스트</div>

      {/* 등산로들 컴포넌트  */}
      <RecomLikeTrail data={userLikeData.result} />
    </>
  );
}

export default UserWishList;
