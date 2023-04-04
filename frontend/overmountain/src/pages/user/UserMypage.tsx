import React, { useState, useEffect } from 'react';
import MypageBox from '@components/user/MypageBox';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

function UserMypage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [isPublic, setIsPublic] = useState(false);

  const onPrevDay = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };
  const onNextDay = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="mypage-head">
        <button type="button" onClick={onPrevDay}>
          <SlArrowLeft />
        </button>
        <div className="user-month">
          {year}-{month}
        </div>
        <button type="button" onClick={onNextDay}>
          <SlArrowRight />
        </button>
      </div>

      <hr />
      <MypageBox isPublic={isPublic} />
    </>
  );
}

export default UserMypage;
