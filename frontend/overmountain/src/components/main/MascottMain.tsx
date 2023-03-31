import React from 'react';
import Balloon from '@components/common/Balloon';
import MainRamgi from '@assets/images/flagramgi.png';

function MascottMain(props: { balloonText: string }) {
  return (
    <div>
      <Balloon message={props.balloonText} />
      <img width={100} src={MainRamgi} alt="MainRamgi" />
    </div>
  );
}

export default MascottMain;
