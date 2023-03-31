import React, { useState } from 'react';
import PhotoItems from '@components/user/PhotoItems';
import PhotoModal from './PhotoModal';

function MypageBox() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="month-mountain">2023-2-18 도봉산</div>
      <div className="photolist">
        <PhotoItems />
      </div>
      <div className="photo-modal">
        <PhotoModal />
      </div>
    </>
  );
}

export default MypageBox;
