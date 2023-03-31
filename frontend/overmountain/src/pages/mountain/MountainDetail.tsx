import React, { useEffect, useRef, useState } from 'react';
import { getMountainDetail, mountain } from '@features/mountain/mountainSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Card from '@components/common/Card';
import TrailItems from '@components/trail/TrailItems';
import TrailMap from '@components/trail/TrailMap';
import { useParams } from 'react-router-dom';
import { setSelectedTrailKey } from '@features/trail/selectedTrailSlice';

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
  useEffect(() => {
    selectedDispatch(setSelectedTrailKey(mountainData.mountain.trailSeq));
  }, [mountainData]);

  const bestKey = 0;

  return (
    <>
      <h3>뱃지 표시</h3>
      <TrailMap />

      {/* 등산로리스트 히히 체크체크(대표 등산로 부분 API 수정하면 바꿔야함) */}
      <TrailItems mountainSeq={mountainSeq} trailKey={bestKey} />

      {/* 산 상세정보 */}
      <Card data={mountainData} />

      {/* 카람쥐 */}
      <h3>카람쥐</h3>

      {/* 후기 리스트 및 후기 작성 컴포넌트 */}
    </>
  );
}

export default MountainDetail;
