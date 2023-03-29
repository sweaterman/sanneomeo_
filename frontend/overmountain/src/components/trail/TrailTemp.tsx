import React, { useEffect } from 'react';
import { getTrailDetail, trailDetail } from '@features/trail/trailSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';

// 이미지와 정보의 조합
function TrailTemp(props: { trailSeq: number }) {
  const { trailSeq } = props;

  const trailData = useAppSelector(trailDetail);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // 등산로코드바꿔야함
    dispatch(getTrailDetail(trailSeq));
  }, []);

  return (
    <>
      <div>
        <h4>등산로 상세정보 테스트</h4>
        <h5> Trail : {trailData.result[0].altitude}</h5>
      </div>
    </>
  );
}

export default TrailTemp;
