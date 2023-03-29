import React, { useEffect } from 'react';
import { getMountainDetail, mountain } from '@features/mountain/mountainSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Card from '@components/common/Card';
import TrailItems from '@components/trail/TrailItems';
import TrailMap from '@components/trail/TrailMap';

function MountainDetail() {
  // 임시 코드 -> 대표 등산로/추천받은 등산로 넘기기
  // 추천받은 등산로에 모시깽이가 있다면 그걸 넘기고 없다면 대표 등산로?
  const mountainSeq = '111100101';
  const bestTrail = 5497;

  // 산 상세 정보 받아오기
  const mountainData = useAppSelector(mountain);
  const mountainDetailDispatch = useAppDispatch();
  useEffect(() => {
    mountainDetailDispatch(getMountainDetail(mountainSeq));
  }, [mountainSeq]);

  return (
    <>
      <h3>뱃지 표시</h3>
      <TrailMap trailkey={bestTrail} />
      <h3>위에 따라다니는 등산로 | 정보 | 후기 서브 헤더</h3>

      {/* 등산로리스트 히히 체크체크(대표 등산로 부분 API 수정하면 바꿔야함) */}
      <TrailItems mountainSeq={mountainSeq} trailkey={bestTrail} />

      {/* 산 상세정보 */}
      <Card data={mountainData} />

      {/* 카람쥐 */}
      <h3>카람쥐</h3>

      {/* 후기 리스트 및 후기 작성 컴포넌트 */}

      <div>
        스크롤 메뉴 테스트용
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>v<div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </>
  );
}

export default MountainDetail;
