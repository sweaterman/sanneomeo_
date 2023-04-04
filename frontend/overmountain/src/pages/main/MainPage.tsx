import React, { useEffect, useState } from 'react';
import {
  getPositionTrail,
  positionTrail,
} from '@features/trail/positionTrailSlice';
import {
  getMountainSearch,
  searchMountain,
} from '@features/mountain/searchMountainSlice';
import { getMountainPlace, mountain } from '@features/mountain/mountainSlice';
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
  // searchbar에 입력한 텍스트
  const [searchMountainText, setSearchMountainText] = useState('');
  // 검색목록에서 클릭한 mountain 정보
  const [searchResult, setSearchResult] = useState<ElasticMountain>({
    name: '',
    si: '',
    gu: '',
    dong: '',
    sequence: '',
    latitude: 0,
    longitude: 0,
    altitude: 0,
    difficulty: '',
  });

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const positionData = useAppSelector(positionTrail);
  const positionDispatch = useAppDispatch();

  const searchData = useAppSelector(searchMountain);
  const searchDispatch = useAppDispatch();

  const searchClickData = useAppSelector(mountain);
  const searchClickDispatch = useAppDispatch();

  // 검색바 실시간 반영
  useEffect(() => {
    const debounce = setTimeout(() => {
      searchDispatch(getMountainSearch(searchMountainText));
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchMountainText]);

  // 검색목록 클릭시 실행할 useEffect
  useEffect(() => {
    console.log('검색목록클릭했다');
  }, []);

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
      {/* <MainBanner/> */}

      <Searchbar
        searchMountainText={searchMountainText}
        setSearchMountain={setSearchMountainText}
        searchList={searchData.result}
        searchResult={setSearchResult}
      />
      <MapContainerMain searchResult={searchResult} />
      <div className="flex">{/* <MascottMain /> */}</div>

      {/* <hr/> */}

      {/* 내 위치 기반 등산로 return API 테스트 */}
      {/* 아래부분 Routing 수정 해서 trailSeq 넘기기 */}
      {/* <div>
        <button type="button" onClick={positionClick}>
          TEST
        </button>
        <div>
          position - longitude : {longitude}
          position - latitude : {latitude}
          등산로 : {positionData.result.trailSeq}
        </div>
      </div> */}

      {/* 계절 명산 */}
      <MountainItem
        title={`${koreanTitle} 명산으로 떠나봐요!`}
        data={seasonMountainData.result.seasonList}
        is100={false}
      />

      {/* 100대 명산 리스트 */}
      <MountainItem
        title={`100대 명산 챌린지`}
        data={userChallengeData.result.challengeList}
        is100={true}
      />

      {/* 100대 명산 자세히 보기 버튼 */}
      {/* <div className="user-challenge">
        <NavLink to="/user/challenge">자세히보기</NavLink>
      </div> */}

      {/* 지금등산중이라면? */}
    </div>
  );
}

export default MainPage;
