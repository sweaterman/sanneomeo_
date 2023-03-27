import React from 'react';

// 이미지와 정보의 조합
function Card(props: { data: Mountain }) {
  const { data } = props;

  return (
    <>
      <div className="container">
        {/* 산의 이미지 */}
        <div className="col-6">
          <h4>이미지임다</h4>
        </div>
        {/* 산의 정보 */}
        <div className="col-6">
          <h4>위치: </h4>
          <h4>고도: </h4>
          <h4>면적: </h4>
          <h4>설명: </h4>
          <h4>데이터 : {data.mountain.name}</h4>
        </div>
      </div>
    </>
  );
}

export default Card;
