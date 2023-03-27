import React, { useEffect, useState } from 'react';
import {
  getPositionTrail,
  positionTrail,
} from '@features/trail/positionTrailSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Searchbar from '@components/main/Searchbar';
import MountainItem from '@components/main/MountainItems';
import MapContainer from '@components/common/MapContainer';
import MascottMain from '@components/main/MascottMain';
import { NavLink } from 'react-router-dom';

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
      console.log('지오로케이션이 너한텐 동작안한단다.');
      alert('geolocation이 너한텐 동작안함 ㅅㄱ');
    }
  };

  useEffect(() => {
    positionDispatch(getPositionTrail({ latitude, longitude }));
  }, [positionDispatch, latitude, longitude]);

  return (
    <div className="mainpage">
      <Searchbar />
      <MapContainer />
      <div className="flex">
        <MascottMain />
      </div>
      <div className="mountain-suggestion">
        <div className="suggestion-text">가을산</div>
        <div className="itembox">
          <MountainItem />
        </div>
      </div>
      <div className="mountain-suggestion">
        <div className="suggestion-text">
          <NavLink to="/user/challenge" className="user-challenge">
            대한민국 100대 명산
          </NavLink>
        </div>
        <MountainItem />
      </div>

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
    </div>
  );
}

export default MainPage;
