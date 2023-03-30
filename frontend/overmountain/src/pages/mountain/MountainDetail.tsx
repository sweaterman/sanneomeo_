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
      <Card data={mountainData} />
      <TrailTemp trailSeq={trailSeq} />
      <TrailItems mountainSeq={mountainSeq} />
    </>
  );
}

export default MountainDetail;
