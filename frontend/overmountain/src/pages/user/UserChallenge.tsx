import React, { useEffect } from 'react';
import {
  getChallengeList,
  userChallenge,
} from '@features/user/userChallengeSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import ChallengeBox from '@components/user/ChallengeBox';

function UserChallenge() {
  // 처음 페이지에 들어갔을 때, 스크롤 위치는 최상단
  window.scrollTo(0, 0);

  // 100대 명산 리스트 반환
  const userChallengeData = useAppSelector(userChallenge);
  const userChallengeDispatch = useAppDispatch();
  useEffect(() => {
    userChallengeDispatch(getChallengeList());
  }, []);

  return (
    <div className="user-challenge">
      <div className="user-challenage-header">
        <h1>100대 명산</h1>
        <span>
          블랙야크의 &apos;명산100&apos;은 우리나라의
          <br />
          대표적인 산 100개를 오르는 프로젝트 입니다.
          <br />
        </span>
      </div>
      <hr />
      <div className="user-conquer-container">
        <div className="user-conquer">
          <div className="conquer-text">정복한 산</div>
          <div className="conquer-number">
            {userChallengeData.result.conquerNo}
          </div>
        </div>
        {localStorage.getItem('token') === null ? (
          <div className="conquer-warnning">
            로그인하시고 등반 정보를 관리해보세요!
          </div>
        ) : (
          <div className="conquer-warnning">
            다녀온 산의 후기를 작성하시면 업적에 추가됩니다!
          </div>
        )}
      </div>
      <ChallengeBox />
    </div>
  );
}

export default UserChallenge;
