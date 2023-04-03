import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';

// title, mountainList 전달받기
function MountainItems(props: { title: string; data: Mountain[] }) {
  const { data } = props;
  const { title } = props;

  // 캐러셀 데이터 나누기
  const divdeData: Mountain[][] = [];
  const { length } = data;
  for (let i = 0; i < length; i += 6) {
    const chunk: Mountain[] = data.slice(i, i + 6);
    divdeData.push(chunk);
  }

  return (
    <div className="mountain-suggestion">
      <div className="suggestion-text">{title}</div>
      <Swiper
        scrollbar={{
          hide: false,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {divdeData &&
          divdeData.map((onePage) => (
            <SwiperSlide>
              <div className="grid grid-rows-2 grid-flow-col">
                {onePage.map((oneMountain) => (
                  <NavLink
                    to={`/mountain/detail/${oneMountain.mountain.mountainSeq}`}
                  >
                    <figure>
                      <img src={oneMountain.mountain.photo} alt="산이미지" />
                      <figcaption>{oneMountain.mountain.name}</figcaption>
                    </figure>
                  </NavLink>
                ))}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default MountainItems;
