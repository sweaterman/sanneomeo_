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

  // 따라다니는 메뉴바 관련 코드
  const [menuVisible, setMenuVisible] = useState(false);
  const handleScroll = () => {
    const trailItems = document.querySelector('.trail-items');
    const menu = document.querySelector('.menu');
    if (trailItems && menu) {
      const trailItemsBottom = trailItems.getBoundingClientRect().bottom;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setMenuVisible(scrollTop > trailItemsBottom);
    }
  };

  useEffect(() => {
    userChallengeDispatch(getChallengeList());
    console.log('result', userChallengeData.result.challengeList[0]);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="user-conquer">
        <div className="conquer-text">정복한 산</div>
        <div className="conquer-number">
          {userChallengeData.result.conquerNo}
        </div>
      </div>
      <ChallengeBox challengeList={userChallengeData.result.challengeList} />
    </>
  );
}

export default UserChallenge;
