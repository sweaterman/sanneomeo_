import React from 'react';
import difficulty from '@assets/images/mountain_selected.svg';
import MainRamgi from '@assets/images/flagramgi.png';

function ChallengeItems(props: { mountain: Mountain }) {
  const { mountain } = props.mountain;

  let mountainName = mountain.name;
  let name = mountainName.split('_', 1);

  return (
    <div className="listbox" key={mountain.mountainSeq}>
      <div className="mountain-photo">
        <img src={mountain.photo} alt="list" />
      </div>
      <div className="textbox">
        <div className="textbox-name">
          <div className="mountain-name">{name}</div>
          <div className="height">{Math.floor(mountain.altitude)}m</div>
        </div>
        <div className="address">
          {mountain.si} {mountain.gu} {mountain.dong}
        </div>
        <div className="difficulty">
          <img src={difficulty} alt="difficulty" />
          <img src={difficulty} alt="difficulty" />
          <img src={difficulty} alt="difficulty" />
        </div>
      </div>
      <div className="conquer-mascott">
        {mountain.conquer ? (
          <div className="not-conquered">
            <img src={MainRamgi} alt="MainRamgi" className="not-conquered" />
          </div>
        ) : (
          <img src={MainRamgi} alt="MainRamgi" />
        )}
      </div>
    </div>
  );
}

export default ChallengeItems;
