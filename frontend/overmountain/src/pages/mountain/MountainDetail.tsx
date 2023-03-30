import React, { useEffect, useRef, useState } from 'react';
import { getMountainDetail, mountain } from '@features/mountain/mountainSlice';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import Card from '@components/common/Card';
import TrailItems from '@components/trail/TrailItems';
import TrailMap from '@components/trail/TrailMap';

function MountainDetail() {
  // 임시 코드 -> 대표 등산로/추천받은 등산로 넘기기
  // 추천받은 등산로에 모시깽이가 있다면 그걸 넘기고 없다면 대표 등산로?
  const mountainSeq = '113050202';
  const bestTrail = 5497;

  // 산 상세 정보 받아오기
  const mountainData = useAppSelector(mountain);
  const mountainDetailDispatch = useAppDispatch();
  useEffect(() => {
    mountainDetailDispatch(getMountainDetail(mountainSeq));
  }, [mountainSeq]);

  // 메뉴바 위치 고정 관련 부분
  // const [isFixed, setIsFixed] = useState(false);
  // const menuRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (menuRef.current) {
  //       setIsFixed(window.pageYOffset > menuRef.current.offsetTop);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // 메뉴바 목차처럼 사용하기
  // const handleMenuClick = (menu: string) => {
  //   switch (menu) {
  //     case 'trailItems':
  //       window.scrollTo({ top: 800, behavior: 'smooth' });
  //       break;
  //     case 'card':
  //       window.scrollTo({ top: 1500, behavior: 'smooth' });
  //       break;
  //     case 'karam':
  //       window.scrollTo({ top: 2000, behavior: 'smooth' });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <>
      {/* <div
        ref={menuRef}
        className={`mountainDetail-menu ${isFixed ? 'menufix' : 'unfix'}`}
      >
        <div onClick={() => handleMenuClick('trailItems')}>등산로</div>
        <div onClick={() => handleMenuClick('card')}>정보</div>
        <div onClick={() => handleMenuClick('karam')}>후기</div>
      </div> */}

      <h3>뱃지 표시</h3>
      <TrailMap trailkey={bestTrail} />

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
