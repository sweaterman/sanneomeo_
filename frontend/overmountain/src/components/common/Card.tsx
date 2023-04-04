import React from 'react';

// 이미지와 정보의 조합
function Card(props: { data: Mountain }) {
  const { data } = props;

  return (
    <div className="mountain-card">
      <div className="card-title">
        어떤 산인가요?
      </div>

      <div className="card-body">
        <div className="body-title">
          위치
        </div>
        <div className="body-discription">
          {data.mountain.si} {data.mountain.dong} {data.mountain.gu}
        </div>
        <div className="body-title">
          고도
        </div>
        <div className="body-discription">
          {data.mountain.altitude}m
        </div>
        <div className="body-title">
          설명
        </div>
        <div className="body-discription">
          {data.mountain.introduction==null?"설명이 존재하지 않아요":data.mountain.introduction}
        </div>
      </div>

{/* 
      <div className="card-name">
            {data.mountain.name}
      </div>


      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-1"></div>
        <div className="col-span-10 card-discription">
          <div className="card-name">
            {data.mountain.name}
          </div>

          <div className="one-discription">
            
            {data.mountain.si}
            {data.mountain.dong}
            {data.mountain.gu}
          </div>
          <div className="one-discription">{data.mountain.altitude}m</div>
          <div className="one-discription discription">
            
          </div>
        </div>
      </div>
      <div className="col-span-1"></div> */}
    </div>
  );
}

export default Card;
