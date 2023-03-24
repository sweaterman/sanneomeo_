import React, { useEffect } from 'react';
import { getMountainDetail, mountain } from '@features/mountain/mountainSlice';
import Card from '@components/common/Card';
import { useAppSelector, useAppDispatch } from '@app/hooks';

function MountainDetail() {
  const data = useAppSelector(mountain);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // 산 코드 바꿔야함
    dispatch(getMountainDetail('111100101'));
  }, [dispatch]);

  return (
    <>
      <h1>Mountain Detail 페이지임다</h1>
      <Card data={data} />
    </>
  );
}

export default MountainDetail;
