import React, { useEffect } from 'react';
import { getTrailSpotList, spotList } from '@features/trail/spotSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { getTrailDetail, trailDetail } from '@features/trail/trailSlice';
import { RiArrowGoBackFill } from 'react-icons/ri';
import MapTrailDetail from '@components/common/MapTrailDetail';

function MountainTrail() {
  // 코드 바꿔야함
  const trailSeq = 11260050101;

  // 등산로 패스 받아오기
  const trailListData = useAppSelector(trailDetail);
  const trailListDispatch = useAppDispatch();

  // 등산로 스팟 리스트 받아오기
  const spotListData = useAppSelector(spotList);
  const spotListDispatch = useAppDispatch();
  // console.log('spotlistdatta', spotListData);

  useEffect(() => {
    trailListDispatch(getTrailDetail(trailSeq));
    // 산 코드 바꿔야함
    spotListDispatch(getTrailSpotList(trailSeq));
  }, [trailSeq]);

  return (
    <>
      <h1>지도 페이지</h1>
      <RiArrowGoBackFill />
      <MapTrailDetail
        trailListData={trailListData}
        spotListData={spotListData}
      />
    </>
  );
}

export default MountainTrail;
