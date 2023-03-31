import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RiArrowGoBackFill } from 'react-icons/ri';

function PhotoModal(props: any) {
  const { open, isPublic } = props;
  return (
    <div className={open ? 'month-moutain-modal open' : 'month-mountain-modal'}>
      {open ? (
        <section>
          <img src="#" alt="modal" />
          <div className="mypage-modal-selectbox">
            <button type="button">
              <FiTrash2 />
            </button>
            <div className="public-eye">
              {isPublic ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
            <button type="button">
              <RiArrowGoBackFill />
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default PhotoModal;
