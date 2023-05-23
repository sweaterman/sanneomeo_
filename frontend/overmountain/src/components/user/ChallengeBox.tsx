import React, { useState, useEffect } from 'react';
import {
  getChallengeList,
  userChallenge,
} from '@features/user/userChallengeSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import ChallengeItems from '@components/user/ChallengeItems';

function ChallengeBox() {
  // 100대 명산 리스트 반환
  const userChallengeData = useAppSelector(userChallenge);
  const userChallengeDispatch = useAppDispatch();
  useEffect(() => {
    userChallengeDispatch(getChallengeList());
  }, []);

  // eslint-disable-next-line prefer-destructuring
  const challengeList: Mountain[] = userChallengeData.result.challengeList;
  const [filterData, setFilterData] = useState(challengeList);

  // 색상 변경 함수
  const setButtonColorgrey = () => {
    const btns = document.getElementsByClassName('filter-text');
    Array.prototype.forEach.call(btns, function (button) {
      button.style.color = 'rgb(132, 132, 132)';
    });
  };

  const setButtonColorBlack = (text: string) => {
    let btn = document.getElementsByClassName(text);
    Array.prototype.forEach.call(btn, function (button) {
      button.style.color = 'black';
    });
  };

  // 100대 명산 필터링 작업
  const filterMountain = (text: string) => {
    setButtonColorgrey();
    if (text === '전체') {
      setFilterData(challengeList);
      setButtonColorBlack('filter-total');
    } else if (text === '완료') {
      const temp1 = challengeList.filter(
        (mountain) => mountain.mountain.conquer === true,
      );
      setFilterData(temp1);
      setButtonColorBlack('filter-true');
    } else {
      const temp2 = challengeList.filter(
        (mountain) => mountain.mountain.conquer === false,
      );
      setFilterData(temp2);
      setButtonColorBlack('filter-false');
    }
  };

  // 가나다 순 정렬
  const [ganadaSort, setGanadaSort] = useState(true);
  const setGanada = () => {
    // 정렬하기
    if (!ganadaSort) {
      setGanadaSort(true);
      const sortedData = [...filterData].sort((a, b) =>
        a.mountain.name > b.mountain.name ? 1 : -1,
      );
      setFilterData(sortedData);
    }
    // 반대로 정렬하기
    else {
      setGanadaSort(false);
      const sortedData = [...filterData].sort((a, b) =>
        a.mountain.name > b.mountain.name ? -1 : 1,
      );
      setFilterData(sortedData);
    }
  };

  return (
    <div className="challengebox">
      <div className="filter-container">
        {ganadaSort ? (
          <div
            className="ganada filter-text"
            onClick={setGanada}
            onKeyDown={setGanada}
            role="presentation"
          >
            ▼ 가나다순
          </div>
        ) : (
          <div
            className="ganada filter-text"
            onClick={setGanada}
            onKeyDown={setGanada}
            role="presentation"
          >
            ▲ 가나다순
          </div>
        )}

        <div className="filter-item">
          <div
            className="filter-text filter-total"
            onClick={() => filterMountain('전체')}
            onKeyDown={() => filterMountain('전체')}
            role="presentation"
          >
            ▼ 전체보기
          </div>
          <div
            className="filter-text filter-true"
            onClick={() => filterMountain('완료')}
            onKeyDown={() => filterMountain('완료')}
            role="presentation"
          >
            ▼ 완료
          </div>
          <div
            className="filter-text filter-false"
            onClick={() => filterMountain('미완료')}
            onKeyDown={() => filterMountain('미완료')}
            role="presentation"
          >
            ▼ 미완료
          </div>
        </div>
      </div>
      <div className="itembox">
        {filterData &&
          filterData.map((mountain) => (
            <ChallengeItems
              key={mountain.mountain.mountainSeq}
              mountain={mountain}
            />
          ))}
      </div>
    </div>
  );
}

export default ChallengeBox;
