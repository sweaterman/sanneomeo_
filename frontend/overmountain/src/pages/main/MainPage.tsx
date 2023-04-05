/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  getPositionTrail,
  positionTrail,
} from '@features/trail/positionTrailSlice';
import {
  getMountainSearch,
  searchMountain,
} from '@features/mountain/searchMountainSlice';
import { mountain } from '@features/mountain/mountainSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Searchbar from '@components/main/Searchbar';
import MountainItem from '@components/main/MountainItems';
import MapContainerMain from '@components/common/MapContainerMain';
import {
  getSeasonMountains,
  seasonMountains,
} from '@features/mountain/seasonMountainSlice';
import {
  userChallenge,
  getChallengeList,
} from '@features/user/userChallengeSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import churamgi from '@assets/images/ramgi_flag.png';
import { useNavigate, NavLink } from 'react-router-dom';
import WeatherItem from '@components/common/Weather';
import SpotButton from '@components/common/SpotButton';

function MainPage() {
  const navigate = useNavigate();

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
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const positionData = useAppSelector(positionTrail);
  const positionDispatch = useAppDispatch();
  const positionClick = () => {
    if (navigator.geolocation) {
      // eslint-disable-next-line func-names
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(latitude, longitude, '바꿨다!');
        positionDispatch(getPositionTrail({ latitude, longitude }))
          .then(() => {
            navigate(`/mountain/trail/${positionData.result.trailSeq}`);
          })
          .catch(() => {
            toast.error('현재위치를 받아올 수 없습니다.');
          });
      });
    } else {
      toast.error('현재위치를 받아올 수 없습니다.');
    }
  };

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
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />

      {/* <div className="main-header grid grid-cols-8">
        <div
          className="left col-span-4"
          onClick={positionClick}
          onKeyDown={positionClick}
          role="presentation"
        >
          <div className="head">지금 등산 중이라면?</div>
          <div className="sub">현재 등산로 근처 지점 확인하기 &gt;</div>
          <img src={churamgi} alt="추람쥐" />
        </div>

        <NavLink className="right col-span-4" to="/recommend/question">
          <div className="head">어디로 가야할 지</div>
          <div className="head">모르겠다면?</div>
          <div className="sub">나에게 맞는 등산로 추천받기 &gt;</div>
          <img src={churamgi} alt="추람쥐" />
        </NavLink>
      </div> */}

      <WeatherItem lat={37.5} lon={127.0} />

      <Searchbar
        searchMountainText={searchMountainText}
        setSearchMountain={setSearchMountainText}
        searchList={searchData.result}
        searchResult={setSearchResult}
      />
      <MapContainerMain searchResult={searchResult} />

      {/* 계절 명산 */}
      <MountainItem
        title={`${koreanTitle} 명산으로 떠나봐요!`}
        data={seasonMountainData.result.seasonList}
        is100={false}
      />

      {/* 100대 명산 리스트 */}
      <MountainItem
        title="100대 명산 챌린지"
        data={userChallengeData.result.challengeList}
        is100
      />

      {/* spot 바로가기 */}
      <SpotButton />
    </div>
  );
}

export default MainPage;
