import React from 'react';
import mountain_selected from '@assets/images/mountain_selected.png';
import mountain_unselected from '@assets/images/mountain_unselected.png';
import MainRamgi from '@assets/images/ramgi_flag.png';
import { NavLink } from 'react-router-dom';

function ChallengeItems(props: { mountain: Mountain }) {
  // eslint-disable-next-line react/destructuring-assignment
  const { mountain } = props.mountain;

  let mountainName = mountain.name;
  let name = mountainName.split('_', 1);

  return (
    <div className="listbox" key={mountain.mountainSeq}>
      <div className="mountain-container">
        <NavLink to={`/mountain/detail/${mountain.mountainSeq}`}>
          <div className="mountain-photo">
            <img
              src={mountain.photo}
              alt="list"
              className="mountain-100-photo"
            />
          </div>
        </NavLink>

        <div className="textbox">
          <div className="textbox-name">
            <NavLink to={`/mountain/detail/${mountain.mountainSeq}`}>
              <div className="mountain-name">{name}</div>
            </NavLink>

            <div className="height">{Math.floor(mountain.altitude)}m</div>
          </div>
          <div className="address">
            {mountain.si} {mountain.gu} {mountain.dong}
          </div>
          <div className="difficulty">
            {mountain.difficulty === '어려움' ? (
              <div className="difficulty">
                <img src={mountain_selected} alt="difficulty" />
                <img src={mountain_selected} alt="difficulty" />
                <img src={mountain_selected} alt="difficulty" />
              </div>
            ) : null}
            {mountain.difficulty === '중간' ? (
              <div className="difficulty">
                <img src={mountain_selected} alt="difficulty" />
                <img src={mountain_selected} alt="difficulty" />
                <img src={mountain_unselected} alt="difficulty" />
              </div>
            ) : null}
            {mountain.difficulty === '쉬움' ? (
              <div className="difficulty">
                <img src={mountain_selected} alt="difficulty" />
                <img src={mountain_unselected} alt="difficulty" />
                <img src={mountain_unselected} alt="difficulty" />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={
          mountain.conquer ? 'conquer-mascott' : 'conquer-mascott not-conquered'
        }
      >
        <img src={MainRamgi} alt="MainRamgi" />
      </div>
    </div>
  );
}

export default ChallengeItems;
