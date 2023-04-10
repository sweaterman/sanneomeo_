import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrailSpotList, spotList } from '@features/trail/spotSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { getTrailDetail, trailDetail } from '@features/trail/trailSlice';
import { RiArrowGoBackFill } from 'react-icons/ri';
import MapTrailDetail from '@components/common/MapTrailDetail';

function MountainTrail() {
  const navigate = useNavigate();

  const { trailSeq } = useParams<{ trailSeq: string }>();
  const [parsedTrailSeq, setParsedTrailSeq] = useState(0);

  const backHandler = () => {
    navigate('/');
  };

  const trailListData = useAppSelector(trailDetail);
  const trailListDispatch = useAppDispatch();

  // 등산로 스팟 리스트 받아오기
  const spotListData = useAppSelector(spotList);
  const spotListDispatch = useAppDispatch();

  useEffect(() => {
    // setMountainSeq(trailSeq?.substring(0, 9));
    setParsedTrailSeq(parseInt(trailSeq ?? '0', 10));
    // 등산로 trails 가져오기
    trailListDispatch(getTrailDetail(parsedTrailSeq));
    // 등산로 스팟가져오기
    spotListDispatch(getTrailSpotList(parsedTrailSeq));
  }, [parsedTrailSeq]);

  const toMountainDetailHandler = () => {
    navigate(`/mountain/detail/${spotListData.result.spotList[0].mountainSeq}`);
  };

  return (
    <div className="mountain-trail">
      <div className="spot-alert">
        <div className="alert-background">
          <h5 className="alert-text">
            다른 산에 있다면 검색을 통해 해당 산의 지점을 볼 수 있어요!
          </h5>
          <div className="alert-back" role="presentation" onClick={backHandler}>
            <h5 className="alert-back-text"> 검색하기</h5>
            <RiArrowGoBackFill onClick={backHandler} />
          </div>
        </div>
      </div>
      <div
        className="spot-header"
        role="presentation"
        onClick={toMountainDetailHandler}
        onKeyDown={toMountainDetailHandler}
      >
        <h1>{spotListData.result.mountainName}</h1>
        <h3>{spotListData.result.trailName}</h3>
      </div>

      <div className="kakao-map-trail">
        <MapTrailDetail
          trailListData={trailListData}
          spotListData={spotListData}
        />
      </div>
    </div>
  );
}

export default MountainTrail;
