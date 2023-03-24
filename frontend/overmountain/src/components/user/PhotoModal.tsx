import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RiArrowGoBackFill } from 'react-icons/ri';

function PhotoModal() {
  const [isPublic, setIsPublic] = useState(false);
  return (
    <>
      <div className="month-mountain">
        <img src="#" alt="modal" />
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
