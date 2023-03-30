import React from 'react';
import sample from '@assets/images/mountsample.png';
import { NavLink } from 'react-router-dom';

// title, mountainList 전달받기
function MountainItems(props: { title: string; data: Mountain[] }) {
  const { data } = props;
  const { title } = props;

  return (
    <div className="mountain-suggestion">
      <div className="suggestion-text">{title}</div>
      <div className="mountain-items">
        {data &&
          data.map((oneMountain) => (
            <div className="itembox" key={oneMountain.mountain.mountainSeq}>
              <NavLink
                to={`/mountain/detail/${oneMountain.mountain.mountainSeq}`}
              >
                <figure>
                  <img src={oneMountain.mountain.photo} alt="산이미지" />
                  <figcaption>{oneMountain.mountain.name}</figcaption>
                </figure>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MountainItems;
