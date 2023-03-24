import React, { useEffect } from 'react';
import { getMountainPlace } from '@features/mountain/mountainSlice';
import type { RootState } from '@app/store';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '@app/store';
import Card from '@components/common/Card';

function MountainDetail() {
  const data = useSelector((state: RootState) => state.mountains);
  const dispatch = useDispatch();
  useEffect(() => {
    store.dispatch(getMountainPlace('111100101'));
  }, [dispatch]);

  // const getData = () => {
  //   store.dispatch(getMountainPlace('111100101'));
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  // console.log('data는?:', data);

  return (
    <>
      <h1>Mountain Detail 페이지임다</h1>
      <Card data={data} />
    </>
  );
}

export default MountainDetail;
