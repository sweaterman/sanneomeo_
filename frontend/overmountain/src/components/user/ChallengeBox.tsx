import React from 'react';
import ChallengeItems from '@components/user/ChallengeItems';

function ChallengeBox() {
  return (
    <>
      <div className="filter-text">필터링</div>
      <div className="filter-button">
        <button>정렬</button>
      </div>
      <ChallengeItems />
    </>
  );
}

export default ChallengeBox;
