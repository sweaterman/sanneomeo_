import React, { useEffect } from 'react';
import { getMountainDetail, mountain } from '@features/mountain/mountainSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Card from '@components/common/Card';
import TrailTemp from '@components/trail/TrailTemp';
import TrailItems from '@components/trail/TrailItems';

function MountainDetail() {
  // 코드 바꿔야함
  const trailSeq = 5497;
  const mountainSeq = '111100101';

  // 산 상세 정보 받아오기
  const mountainData = useAppSelector(mountain);
  const mountainDetailDispatch = useAppDispatch();
  useEffect(() => {
    // 산 코드 바꿔야함
    mountainDetailDispatch(getMountainDetail(mountainSeq));
  }, [mountainDetailDispatch, mountainSeq]);

  return (
    <>
      <h1>Mountain Detail 페이지임다</h1>
      <h3>뱃지 표시</h3>
      <h3>지도 컴포넌트</h3>
      <h3>고도 컴포넌트</h3>
      <h3>위에 따라다니는 등산로 | 정보 | 후기 서브 헤더</h3>
      {/* 등산로리스트 */}
      <TrailItems mountainSeq={mountainSeq} />

      {/* 산 상세정보 */}
      {/* <Card data={mountainData} /> */}

      {/* 카람쥐 */}
      <h3>카람쥐</h3>

      {/* 후기 리스트 및 후기 작성 컴포넌트 */}

      {/* <TrailTemp trailSeq={trailSeq} /> */}
    </>
  );
}

export default MountainDetail;
