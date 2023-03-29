import React from 'react';
import ChallengeItems from '@components/user/ChallengeItems';

interface ChallengeBoxProps {
  challengeList: ChallengeMountain[];
}

function ChallengeBox({ challengeList }: ChallengeBoxProps) {
  return (
    <div className="challengebox">
      <div className="filter-text">필터링</div>
      <div className="filter-button">
        <button type="button">정렬</button>
      </div>
      <div className="itembox">
        {challengeList.map((mountain) => (
          <ChallengeItems key={mountain.mountainSeq} mountain={mountain} />
        ))}
      </div>
    </div>
  );
}

export default ChallengeBox;
