import React from 'react';

// 이미지와 정보의 조합
function Card(props: { data: Mountain }) {
  const { data } = props;

  return (
    <div className="mountain-card">
      <div className="card-body">
        <div className="body-title">위치</div>
        <div className="body-discription">
          {data.mountain.si} {data.mountain.dong} {data.mountain.gu}
        </div>
        <div className="body-title">고도</div>
        <div className="body-discription">{data.mountain.altitude}m</div>
        <div className="body-title">설명</div>
        <div className="body-discription">
          {data.mountain.introduction == null
            ? '설명이 존재하지 않아요'
            : data.mountain.introduction}
        </div>
      </div>
    </div>
  );
}

export default Card;
