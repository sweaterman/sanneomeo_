import React, { useEffect } from 'react';
import {
  getSeasonMountains,
  seasonMountains,
} from '@features/mountain/seasonMountainSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import sample from '@assets/images/mountsample.png';

function MountainItems() {
  // 콘솔에서만 API 테스트 완료
  const data = useAppSelector(seasonMountains);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSeasonMountains());
  }, [dispatch]);

  return (
    <div className="mountain-items">
      <img src={sample} alt="도봉산" />
      <div className="mountain-name">도봉산</div>

      <div>
        <h4>계절산테스트</h4>
        <h1>계절: {data.result.season}</h1>
      </div>
    </div>
  );
}

export default MountainItems;
