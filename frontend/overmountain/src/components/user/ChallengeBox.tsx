import React from 'react';
import ChallengeItems from '@components/user/ChallengeItems';

function ChallengeBox(props: { challengeList: Mountain[] }) {
  const { challengeList } = props;

  return (
    <div className="challengebox">
      <div className="filter-text">필터링</div>
      <div className="filter-button">
        <button type="button">정렬</button>
      </div>
      <div className="itembox">
        {challengeList &&
          challengeList.map((mountain) => (
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
