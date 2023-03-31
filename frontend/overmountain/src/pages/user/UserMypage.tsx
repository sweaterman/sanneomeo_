import React, { useState } from 'react';
import MypageBox from '@components/user/MypageBox';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

function UserMypage() {
  const [month, setMonth] = useState(3);
  const [isPublic, setIsPublic] = useState(false);

  return (
    <>
      <div className="mypage-head">
        <button type="button">
          <SlArrowLeft />
        </button>
        <div className="user-month">2023-{month}</div>
        <button type="button">
          <SlArrowRight />
        </button>
      </div>

      <hr />
      <MypageBox />
    </>
  );
}

export default UserMypage;
