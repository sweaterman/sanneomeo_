import React, { useEffect } from 'react';
import { getMountainDetail, mountain } from '@features/mountain/mountainSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Card from '@components/common/Card';
import TrailTemp from '@components/trail/TrailTemp';

function MountainDetail() {
  const mountainData = useAppSelector(mountain);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // 산 코드 바꿔야함
    dispatch(getMountainDetail('111100101'));
  }, [dispatch]);

  const trailSeq = 5497;

  return (
    <>
      <h1>Mountain Detail 페이지임다</h1>
      <Card data={mountainData} />
      <TrailTemp trailSeq={trailSeq} />
    </>
  );
}

export default MountainDetail;
