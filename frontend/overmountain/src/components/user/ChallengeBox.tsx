import React from 'react';
import ChallengeItems from '@components/user/ChallengeItems';

function ChallengeBox() {
  return (
    <div className="challengebox">
      <div className="filter-text">필터링</div>
      <div className="filter-button">
        <button type="button">정렬</button>
      </div>
      <div className="itembox">
        <ChallengeItems />
      </div>
    </div>
  );
}

export default ChallengeBox;
