import React, { useEffect } from 'react';
import { getMountainDetail, mountain } from '@features/mountain/mountainSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Card from '@components/common/Card';
import TrailItems from '@components/trail/TrailItems';
import TrailMap from '@components/trail/TrailMap';
import { useParams, NavLink } from 'react-router-dom';
import {
  selectedTrailKey,
  setSelectedTrailKey,
} from '@features/trail/selectedTrailSlice';
import { rountingTrailKey } from '@features/trail/routingTrailSlice';
import ReviewItems from '@components/mountain/ReviewItems';
import caramgi from '@assets/images/ramgi_camera.png';

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
  useEffect(() => {
    if (defaultRecomKey.rountingTrailKey !== 0) {
      selectedDispatch(setSelectedTrailKey(defaultRecomKey.rountingTrailKey));
    } else {
      selectedDispatch(setSelectedTrailKey(mountainData.mountain.trailSeq));
    }
  }, [mountainData]);

  // 등산로 선택했을 때 지도 스팟 넘어가는 부분 키
  const selectedKey = useAppSelector(selectedTrailKey);

  return (
    <div className="mountainDetail-root">
      {/* 스팟 페이지로 라우팅 */}
      <NavLink to={`/mountain/trail/${selectedKey.selectedTrailKey}`}>
        <div className="trail-routing">선택한 등산로 지도로 상세보기! &gt;</div>
      </NavLink>

      {/* <TrailMap /> */}

      {/* 등산로리스트 */}
      <TrailItems mountainSeq={mountainSeq} />

      {/* 산 상세정보 */}
      <Card data={mountainData} />

      {/* 카람쥐 */}
      <div className="caramgi">
        <img src={caramgi} alt="카람쥐" />
      </div>

      {/* 후기 리스트 및 후기 작성 컴포넌트 */}
      <ReviewItems mountainSeq={mountainSeq} />
    </div>
  );
}

export default MountainDetail;
