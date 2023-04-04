import React from 'react';

// 이미지와 정보의 조합
function Card(props: { data: Mountain }) {
  const { data } = props;

  return (
    <div className="mountain-card">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-1"></div>
        <div className="col-span-10">
          <div className="one-discription">
            {data.mountain.si}
            {data.mountain.dong}
            {data.mountain.gu}
          </div>
          <div className="one-discription">{data.mountain.altitude}m</div>
          <div className="one-discription discription">
            {data.mountain.introduction}
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}

export default Card;
