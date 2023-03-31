import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';

// title, mountainList 전달받기
function MountainItems(props: { title: string; data: Mountain[] }) {
  const { data } = props;
  const { title } = props;

  // 캐러셀 관련 코드
  const moveNum = 6;
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = data.slice(currentIndex, currentIndex + moveNum);
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - moveNum));
  };
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + moveNum > data.length - 1 ? prevIndex : prevIndex + moveNum,
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mountain-suggestion">
      <div className="suggestion-text">{title}</div>
      <div className="mountain-items grid grid-cols-10">
        {/* 왼쪽 화살표 */}
        <div
          className="arrow prev"
          onClick={handlePrevClick}
          onKeyDown={handlePrevClick}
          role="presentation"
        >
          ◀
        </div>

        {/* 윈도우 */}
        <div className="mountain-window col-span-8 grid grid-rows-2 grid-flow-col gap-2">
          {itemsToShow &&
            itemsToShow.map((oneMountain) => (
              <div
                className="itembox grid-cols-"
                key={oneMountain.mountain.mountainSeq}
              >
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

        {/* 오른쪽 화살표 */}
        <div
          className="arrow next"
          onClick={handleNextClick}
          onKeyDown={handleNextClick}
          role="presentation"
        >
          ▶
        </div>
      </div>

      {/* 슬라이더부분 수정하기 */}
      <Slider className="my-slider" {...settings}>
        {data.map((oneMountain) => (
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
      </Slider>
    </div>
  );
}

export default MountainItems;
