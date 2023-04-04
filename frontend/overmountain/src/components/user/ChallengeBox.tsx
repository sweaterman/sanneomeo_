import React, { useState } from 'react';
import ChallengeItems from '@components/user/ChallengeItems';

function ChallengeBox(props: { challengeList: Mountain[] }) {
  const { challengeList } = props;
  const [filterData, setFilterData] = useState(challengeList);

  // 100대 명산 필터링 작업
  const filterMountain = (text: string) => {
    setButtonColorgrey();
    if (text === '전체') {
      setFilterData(challengeList);
      setButtonColorBlack("filter-total");
    } else if (text === '완료') {
      const temp1 = challengeList.filter(
        (mountain) => mountain.mountain.conquer === true,
      );
      setFilterData(temp1);
      setButtonColorBlack("filter-true");
    } else {
      const temp2 = challengeList.filter(
        (mountain) => mountain.mountain.conquer === false,
      );
      setFilterData(temp2);
      setButtonColorBlack("filter-false");
    }
  };

  const setButtonColorgrey = ()=>{
    const btns = document.getElementsByClassName("filter-text");
    Array.prototype.forEach.call(btns, function(button) {
      button.style.color = "rgb(132, 132, 132)";
    });
  }

const setButtonColorBlack = (text : string)=>{
  let btn = document.getElementsByClassName(text);
  Array.prototype.forEach.call(btn, function(button) {
    button.style.color = "black";
  });
}

  return (
    <div className="challengebox">
      <div className="filter-container">
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
