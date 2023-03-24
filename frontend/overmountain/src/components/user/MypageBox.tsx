import React from 'react';
import PhotoItems from '@components/user/PhotoItems';
import PhotoModal from './PhotoModal';

function MypageBox() {
  return (
    <>
      <div className="month-mountain">2023-2-18 도봉산</div>
      <div className="photolist">
        <PhotoItems />
      </div>
      <PhotoModal />
    </>
  );
}

export default MypageBox;
