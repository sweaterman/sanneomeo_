import React, { useEffect } from 'react';
import { getTrailSpotList, spotList } from '@features/trail/spotSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';

function MountainTrail() {
  // 코드 바꿔야함
  const trailSeq = 5497;

  // 등산로 스팟 리스트 받아오기
  const spotListData = useAppSelector(spotList);
  const spotListDispatch = useAppDispatch();
  useEffect(() => {
    // 산 코드 바꿔야함
    spotListDispatch(getTrailSpotList(trailSeq));
  }, [spotListDispatch, trailSeq]);

  return (
    <>
      <h1>지도 페이지</h1>
      {/* <h4>{spotListData.result[0].name}</h4>
      <h4>{spotListData.result[0].code}</h4> */}
    </>
  );
}

export default MountainTrail;
