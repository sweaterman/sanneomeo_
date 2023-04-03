import React, { useEffect, useState } from 'react';
import {
  getChallengeList,
  userChallenge,
} from '@features/user/userChallengeSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import ChallengeBox from '@components/user/ChallengeBox';

function UserChallenge() {
  // 100대 명산 리스트 반환
  const userChallengeData = useAppSelector(userChallenge);
  const userChallengeDispatch = useAppDispatch();

  return (
    <div className="user-challenge">
      <div className="user-conquer">
        <div className="conquer-text">정복한 산</div>
        <div className="conquer-number">
          {userChallengeData.result.conquerNo}
        </div>
      </div>
      <ChallengeBox challengeList={userChallengeData.result.challengeList} />
    </div>
  );
}

export default UserChallenge;
