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
import { useNavigate } from 'react-router-dom';
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

  // 스크롤 이벤트
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    console.log(scrollPosition);
  }, []);

  // 검색바 실시간 반영
  useEffect(() => {
    const debounce = setTimeout(() => {
      searchDispatch(getMountainSearch(searchMountainText));
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchMountainText]);

  // 내 위치 조사해서 가장 가까운 등산로 받아오는 코드
  const positionDispatch = useAppDispatch();
  const geo = async () => {
    if (navigator.geolocation) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const position: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      positionDispatch(
        getPositionTrail({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      );
    } else {
      toast.error('현재위치를 받아올 수 없습니다.');
    }
  };
  const positionData = useAppSelector(positionTrail);
  useEffect(() => {
    geo();
  }, []);

  const positionClick = () => {
    navigate(`/mountain/trail/${positionData.result.trailSeq}`);
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
        scrollPosition={scrollPosition}
      />

      {/* 100대 명산 리스트 */}
      <MountainItem
        title="100대 명산 챌린지"
        data={userChallengeData.result.challengeList}
        is100
        scrollPosition={scrollPosition}
      />

      {/* spot 바로가기 */}
      <SpotButton positionClick={positionClick} />
    </div>
  );
}

export default MainPage;
