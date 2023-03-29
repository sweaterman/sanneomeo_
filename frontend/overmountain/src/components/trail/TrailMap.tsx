import React, { useEffect, useState } from 'react';
import { getTrailDetail, trailDetail } from '@features/trail/trailSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  selectedTrailKey,
  setSelectedTrailKey,
} from '@features/trail/selectedTrailSlice';

ChartJS.register(...registerables);

// 지도와 고도
function TrailTemp(props: { trailkey: number }) {
  const dispatch = useAppDispatch();
  const { trailkey } = props;

  // 현재 선택된 등산로 가져오기
  const selectedKey = useAppSelector(selectedTrailKey);
  const trailData = useAppSelector(trailDetail);

  // 처음에 페이지에 들어왔을 때, 대표 등산로/추천 등산로 선택된 상태
  useEffect(() => {
    dispatch(getTrailDetail(trailkey));
  }, []);

  // 선택하는 등산로가 바뀔 때 마다 trailData도 변경
  useEffect(() => {
    dispatch(getTrailDetail(selectedKey.selectedTrailKey));
  }, [selectedKey.selectedTrailKey]);

  // 고도를 위한 데이터 조작
  // const [altitudeData, setAltitudeData] = useState<number[]>([]);
  // useEffect(() => {
  //   const altitudes = trailData.result.map((row) => row.altitude);
  //   setAltitudeData(altitudes);
  //   console.log('바뀐조작고도:', altitudes);
  // }, [trailData]);
  // 북악산 등산로에 등산로 path가 안들어가있는게 분명하다...

  return (
    <>
      {/* 지도가 들어갈 부분 */}
      <div></div>

      {/* 고도가 들어갈 부분 */}
      <div>{/* <Line data={chartData}></Line> */}</div>
    </>
  );
}

export default TrailTemp;
