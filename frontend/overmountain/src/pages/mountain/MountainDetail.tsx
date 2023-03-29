import React, { useEffect, useState } from 'react';
import { getMountainDetail, mountain } from '@features/mountain/mountainSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Card from '@components/common/Card';
import TrailItems from '@components/trail/TrailItems';
import TrailMap from '@components/trail/TrailMap';
import { selectedTrailKey } from '@features/trail/selectedTrailSlice';

function MountainDetail() {
  // 코드 바꿔야함
  const trailSeq = 5497;
  const mountainSeq = '111100101';

  // 산 상세 정보 받아오기
  const mountainData = useAppSelector(mountain);
  const mountainDetailDispatch = useAppDispatch();
  useEffect(() => {
    // 산 코드 바꿔야함
    mountainDetailDispatch(getMountainDetail(mountainSeq));
  }, [mountainSeq]);

  // 따라다니는 메뉴바 관련 코드
  const [menuVisible, setMenuVisible] = useState(false);
  const handleScroll = () => {
    const trailItems = document.querySelector('.trail-items');
    const menu = document.querySelector('.menu');
    if (trailItems && menu) {
      const trailItemsBottom = trailItems.getBoundingClientRect().bottom;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setMenuVisible(scrollTop > trailItemsBottom);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 선택한 등산로 key 넘기는 부분
  const selectedKey = useAppSelector(selectedTrailKey);
  useEffect(() => {
    console.log('등산로 바꾸기!:', selectedKey);
  }, [selectedKey]);

  return (
    <>
      <h1>Mountain Detail 페이지임다</h1>
      <h3>뱃지 표시</h3>
      <h3>지도 컴포넌트</h3>
      <h3>고도 컴포넌트</h3>
      <h3>위에 따라다니는 등산로 | 정보 | 후기 서브 헤더</h3>

      <div className={`menu ${menuVisible ? 'visible' : ''}`}>
        <h3>등산로</h3>
        <h3>정보</h3>
        <h3>후기</h3>
      </div>

      {/* 등산로리스트 */}
      <TrailItems mountainSeq={mountainSeq} />

      {/* 산 상세정보 */}
      {/* <Card data={mountainData} /> */}

      {/* 카람쥐 */}
      <h3>카람쥐</h3>

      {/* 후기 리스트 및 후기 작성 컴포넌트 */}

      {/* <TrailTemp trailSeq={trailSeq} /> */}

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
        <div>1</div>v
        <var>
          {' '}
          <div>1</div>
        </var>
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
      </div>
    </>
  );
}

export default MountainDetail;
