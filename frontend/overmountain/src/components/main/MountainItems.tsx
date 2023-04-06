/* eslint-disable react/jsx-key */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';
import MountainItemsButton from '@components/main/MountainItemsButton';

// title, mountainList 전달받기
function MountainItems(props: {
  title: string;
  data: Mountain[];
  is100: boolean;
  scrollPosition: number;
}) {
  const { data, title, is100 } = props;

  // 캐러셀 데이터 나누기
  const divdeData: Mountain[][] = [];
  const { length } = data;
  for (let i = 0; i < length; i += 6) {
    const chunk: Mountain[] = data.slice(i, i + 6);
    divdeData.push(chunk);
  }

  return (
    <div className="mountain-suggestion">
      <div
        className={
          props.scrollPosition > 100
            ? 'suggestion-text'
            : 'suggestion-text after'
        }
      >
        {title}
        {is100 && <MountainItemsButton />}
      </div>
      <Swiper
        scrollbar={{
          hide: false,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {divdeData &&
          divdeData.map((onePage, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <SwiperSlide key={index}>
              <div className="grid grid-rows-2 grid-flow-col grid-wrapper">
                {onePage.map((oneMountain) => (
                  <NavLink
                    to={`/mountain/detail/${oneMountain.mountain.mountainSeq}`}
                    key={oneMountain.mountain.mountainSeq}
                  >
                    <figure>
                      <img src={oneMountain.mountain.photo} alt="산이미지" />
                      <div>
                        <figcaption className="figcaption-title">
                          {oneMountain.mountain.name}
                        </figcaption>
                        <figcaption className="figcaption-discription">
                          {oneMountain.mountain.gu}
                        </figcaption>
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
