import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { RiArrowGoBackFill } from 'react-icons/ri';

function PhotoModal() {
  const [isPublic, setIsPublic] = useState(false);
  return (
    <>
      <div className="month-mountain">
        <img alt="photo-modal" />
        <div className="selectbox">
          <FiTrash2 />
          {isPublic ? <AiFillEye /> : <AiFillEyeInvisible />}
          <RiArrowGoBackFill />
        </div>
      </div>
    </>
  );
}

export default PhotoModal;
