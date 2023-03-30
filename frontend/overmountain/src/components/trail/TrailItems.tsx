import React, { useEffect } from 'react';
import mountain from '@assets/images/mountain_selected.png';
import like from '@assets/images/flag_selected.png';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  getMountainTrailList,
  trailList,
} from '@features/trail/trailListSlice';

function TrailItems(props: { mountainSeq: string }) {
  const { mountainSeq } = props;

  // 산에 해당하는 등산로 리스트 받아오기
  const trailListData = useAppSelector(trailList);
  const trailListDispatch = useAppDispatch();
  useEffect(() => {
    trailListDispatch(getMountainTrailList(mountainSeq));
  }, [trailListDispatch]);

  return (
    <>
      <div className="trail-name">제 1등산로</div>
      <div className="trail-time">2시간</div>
      <div className="trail-length">3.2km</div>
      <div className="difficulty">
        <img src={mountain} alt="difficulty" />
      </div>
      <div className="like">
        <img src={like} alt="like" />
      </div>

      <h2>등산로 리스트 API 테스트</h2>
      <h4>{trailListData.result[0].name}</h4>
    </>
  );
}

export default TrailItems;
