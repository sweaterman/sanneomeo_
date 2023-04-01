import React, { useEffect, useState } from 'react';
import {
  getPositionTrail,
  positionTrail,
} from '@features/trail/positionTrailSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Searchbar from '@components/main/Searchbar';
import MountainItem from '@components/main/MountainItems';
import MapContainerMain from '@components/common/MapContainerMain';
import MascottMain from '@components/main/MascottMain';
import { NavLink } from 'react-router-dom';
import {
  getSeasonMountains,
  seasonMountains,
} from '@features/mountain/seasonMountainSlice';
import MapContainerDetail from '@components/common/MapContainerDetail';
import {
  userChallenge,
  getChallengeList,
} from '@features/user/userChallengeSlice';

function MainPage() {
  const positionData = useAppSelector(positionTrail);
  const positionDispatch = useAppDispatch();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // 내 위치 조사해서 가장 가까운 등산로 받아오는 코드
  const positionClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(latitude, longitude, '바꿨다!');
      });
    } else {
      alert('geolocation이 너한텐 동작안함');
    }
  };

  useEffect(() => {
    positionDispatch(getPositionTrail({ latitude, longitude }));
  }, [latitude, longitude]);

  // 계절 산 리스트 받아오기
  const seasonMountainData = useAppSelector(seasonMountains);
  const seasondispatch = useAppDispatch();
  useEffect(() => {
    seasondispatch(getSeasonMountains());
  }, []);

  // 100대 명산 리스트 받아오기
  const userChallengeData = useAppSelector(userChallenge);
  const userChallengeDispatch = useAppDispatch();
  useEffect(() => {
    userChallengeDispatch(getChallengeList());
  }, []);

  // 계절 이름 한글로 변환
  const koreanTitle =
    seasonMountainData.result.season === 'spring'
      ? '봄'
      : seasonMountainData.result.season === 'summer'
      ? '여름'
      : seasonMountainData.result.season === 'fall'
      ? '가을'
      : seasonMountainData.result.season === 'winter'
      ? '겨울'
      : '';

  return (
    <div className="mainpage">
      <Searchbar />
      <MapContainerMain />
      <div className="flex">{/* <MascottMain /> */}</div>

      {/* 내 위치 기반 등산로 return API 테스트 */}
      {/* 아래부분 Routing 수정 해서 trailSeq 넘기기 */}
      <div>
        <button type="button" onClick={positionClick}>
          TEST
        </button>
        <div>
          position - longitude : {longitude}
          position - latitude : {latitude}
          등산로 : {positionData.result.trailSeq}
        </div>
      </div>

      {/* 계절 명산 */}
      <MountainItem
        title={`${koreanTitle} 명산`}
        data={seasonMountainData.result.seasonList}
      />

      {/* 100대 명산 리스트 */}
      <MountainItem
        title={`100대 명산`}
        data={userChallengeData.result.challengeList}
      />

      {/* 100대 명산 자세히 보기 버튼 */}
      {/* <div className="user-challenge">
        <NavLink to="/user/challenge">자세히보기</NavLink>
      </div> */}
    </div>
  );
}

export default MainPage;
