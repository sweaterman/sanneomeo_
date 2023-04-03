import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';
import MountainItemsButton from '@components/main/MountainItemsButton';

// title, mountainList 전달받기
function MountainItems(props: { title: string; data: Mountain[]; is100: boolean }) {
  const { data } = props;
  const { title } = props;
  const { is100 } = props;

  // 캐러셀 데이터 나누기
  const divdeData: Mountain[][] = [];
  const { length } = data;
  for (let i = 0; i < length; i += 6) {
    const chunk: Mountain[] = data.slice(i, i + 6);
    divdeData.push(chunk);
  }

  if(is100){
    console.log(is100);
  }

  return (
    <div className="mountain-suggestion">
      <div className="suggestion-text">{title}
        {is100 && <MountainItemsButton></MountainItemsButton>}
      </div>
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
              <div className="grid grid-rows-2 grid-flow-col grid-wrapper">
                {onePage.map((oneMountain) => (
                  <NavLink
                    to={`/mountain/detail/${oneMountain.mountain.mountainSeq}`}
                  >
                    <figure>
                      <img src={oneMountain.mountain.photo} alt="산이미지" />
                      <div>
                        <figcaption className="figcaption-title">{oneMountain.mountain.name}</figcaption>
                        <figcaption className="figcaption-discription">{oneMountain.mountain.gu}</figcaption>
                      </div>
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
