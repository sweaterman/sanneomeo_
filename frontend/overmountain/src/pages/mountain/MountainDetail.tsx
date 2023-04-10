import React, { useEffect, useRef } from 'react';
import { getMountainDetail, mountain } from '@features/mountain/mountainSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Card from '@components/common/Card';
import TrailItems from '@components/trail/TrailItems';
import TrailMap from '@components/trail/TrailMap';
import { useParams, useNavigate } from 'react-router-dom';
import {
  selectedTrailKey,
  setSelectedTrailKey,
} from '@features/trail/selectedTrailSlice';
import { rountingTrailKey } from '@features/trail/routingTrailSlice';
import ReviewItems from '@components/mountain/ReviewItems';
import caramgi from '@assets/images/ramgi_camera.png';
import Weather from '@components/common/Weather';
import { toast } from 'react-toastify';

function MountainDetail() {
  // 처음 페이지에 들어갔을 때, 스크롤 위치는 최상단
  window.scrollTo(0, 0);

  // 산 코드 가져오기
  const params = useParams();
  const mountainSeq = params.mountainSeq ?? '';

  // 산 상세 정보 받아오기
  const mountainData = useAppSelector(mountain);
  const mountainDetailDispatch = useAppDispatch();
  const selectedDispatch = useAppDispatch();
  useEffect(() => {
    mountainDetailDispatch(getMountainDetail(mountainSeq));
  }, [mountainSeq]);

  // 처음에 페이지에 들어왔을 때, 대표 등산로/추천 등산로 선택된 상태
  const defaultRecomKey = useAppSelector(rountingTrailKey);
  // 등산로 선택했을 때 지도 스팟 넘어가는 부분 키
  let selectedKey = useAppSelector(selectedTrailKey);

  useEffect(() => {
    if (defaultRecomKey.rountingTrailKey !== 0) {
      selectedDispatch(setSelectedTrailKey(defaultRecomKey.rountingTrailKey));
    } else if (mountainData.mountain.trailSeq !== null) {
      selectedDispatch(setSelectedTrailKey(mountainData.mountain.trailSeq));
    } else {
      selectedDispatch(setSelectedTrailKey(-1));
    }
  }, [mountainData]);

  // 서브헤더 부분
  const trailMapRef = useRef(null);
  const trailRef = useRef(null);
  const infoRef = useRef(null);
  const ReviewRef = useRef(null);

  // 스팟 페이지 라우팅 예외 처리
  const navigate = useNavigate();
  const moveToSpot = () => {
    if (selectedKey.selectedTrailKey === -1) {
      toast.error('선택된 등산로가 없습니다.');
    } else {
      // 페이지이동
      navigate(`/mountain/trail/${selectedKey.selectedTrailKey}`);
    }
  };

  const scrollToWhat = (text: string) => {
    if (text === 'Map') {
      if (trailMapRef.current) {
        (trailMapRef.current as HTMLElement).scrollIntoView({
          behavior: 'smooth',
        });
      }
    } else if (text === 'Trail') {
      if (trailRef.current) {
        (trailRef.current as HTMLElement).scrollIntoView({
          behavior: 'smooth',
        });
      }
    } else if (text === 'Info') {
      if (infoRef.current) {
        (infoRef.current as HTMLElement).scrollIntoView({
          behavior: 'smooth',
        });
      }
    } else if (text === 'Review') {
      if (ReviewRef.current) {
        (ReviewRef.current as HTMLElement).scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="mountainDetail-root">
      {/* 상단 subheader */}
      <div className="sub-header">
        <div className="btns">
          <button type="button" onClick={() => scrollToWhat('Map')}>
            지도
          </button>
          <button type="button" onClick={() => scrollToWhat('Trail')}>
            등산로
          </button>
          <button type="button" onClick={() => scrollToWhat('Info')}>
            정보
          </button>
          <button type="button" onClick={() => scrollToWhat('Review')}>
            후기
          </button>
        </div>
        <hr />
      </div>

      {/* 산 이름 */}
      <div className="mountainDetail-header">
        <div className="header-container">
          <h1>{mountainData.mountain.name}</h1>
        </div>
      </div>

      {/* 스팟 페이지로 라우팅 */}
      <div className="trail-routing">
        <button type="button" onClick={moveToSpot}>
          현재 등산로 상세보기 &gt;
        </button>
      </div>

      {/* 지도 */}
      <div ref={trailMapRef}>
        <TrailMap />
      </div>

      {/* 등산로리스트 */}
      <div ref={trailRef}>
        {selectedKey.selectedTrailKey === -1 ? (
          <div className="empty-trail">
            <div className="empty-content"> 앗! 등록된 등산로가 없나봐요!</div>
            <img src={caramgi} alt="카람쥐" />
          </div>
        ) : (
          <TrailItems mountainSeq={mountainSeq} />
        )}
      </div>

      {/* 산 상세정보 */}
      <div ref={infoRef}>
        <Weather
          lat={mountainData.mountain.latitude}
          lon={mountainData.mountain.longitude}
        />
        <Card data={mountainData} />
      </div>

      {/* 후기 리스트 및 후기 작성 컴포넌트 */}
      <div ref={ReviewRef}>
        <ReviewItems mountainSeq={mountainSeq} />
      </div>
    </div>
  );
}

export default MountainDetail;
