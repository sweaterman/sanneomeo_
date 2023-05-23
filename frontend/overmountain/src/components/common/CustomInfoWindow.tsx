import React from 'react';
import { useNavigate } from 'react-router-dom';
import mountain_selected from '@assets/images/mountain_selected.png';
import mountain_unselected from '@assets/images/mountain_unselected.png';

function CustomInfoWindow(props: { mountain: ElasticMountain }) {
  const navigate = useNavigate();
  const { mountain } = props;

  const altitudeString = `${Math.floor(mountain.altitude)}m`;

  const toMountainDetail = () => {
    navigate(`/mountain/detail/${mountain.sequence}`);
  };

  return (
    <div className="custom-info-window">
      <div className="info-container">
        <div className="info-title">
          <div className="info-name">
            {mountain.name === '' ? `잘못된 위치에요!` : mountain.name}{' '}
          </div>
          <div className="info-address">
            {mountain.si} {mountain.gu} {mountain.dong}
          </div>
        </div>
        <div className="info-body">
          <div className="info-altitude">
            {mountain.name === '' ? `` : altitudeString}
          </div>
          {mountain.name !== '' && (
            <div
              className="info-route"
              role="presentation"
              onClick={toMountainDetail}
              onKeyDown={toMountainDetail}
            >
              상세보기&gt;
            </div>
          )}
        </div>
      </div>
      <div className="info-triangle"></div>
    </div>
  );

  // <div className="balloon">{props.message}</div>;
}

export default CustomInfoWindow;
