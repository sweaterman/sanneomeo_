import TrailItems from '@components/trail/TrailItems';
import MascottMain from '@components/main/MascottMain';
import React from 'react';
import { setRountingTrailKey } from '@features/trail/routingTrailSlice';
import { useAppDispatch } from '@app/hooks';
import { useNavigate } from 'react-router-dom';

function RecomResult() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const moveToDetail = () => {
    // 임시코드
    dispatch(setRountingTrailKey(11305020202));
    navigate('/mountain/detail/113050202');
  };

  return (
    <>
      <hr />
      <MascottMain balloonText={mascottMessage} />
      <div className="trailbox">
        <div>trailitems가 들어갈 곳</div>

        {/* 라우팅 연결 테스트 */}
        <div
          onClick={moveToDetail}
          onKeyDown={moveToDetail}
          role="presentation"
        >
          라우팅테스트버튼
        </div>
      </div>
    </>
  );
}

export default RecomResult;
