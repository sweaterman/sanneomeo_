import React, { useState, useEffect } from 'react';

type SigleWeather = {
  dayOfWeek: string; // 요일
  dayOfMonth: number; // 날짜
  min: number; // 최저온도
  max: number; // 최대온도
  description: string; // 구름모양
};

function Weather(props: { lat: number; lon: number }) {
  const initialWeather: SigleWeather[] = [];

  const { lat, lon } = props;
  const [weatherData, setWeatherData] = useState(initialWeather);

  // 날씨 API 호출
  // API 호출 함수
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://sanneomeo.site/api/main/weather/location?lat=${lat}&lon=${lon}`,
      );
      const data = await response.json();
      setWeatherData(data.result); // API 결과를 state에 저장
      console.log(JSON.stringify(data));
    } catch (error) {
      console.error('Weather API 호출에 실패하였습니다.', error);
    }
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchWeatherData();
  }, [lat, lon]);

  return (
    <div className="weather-parent">
      <div className="card-title">어떤 산인가요?</div>

      <div className="weather-component">
        {weatherData.length > 0 ? (
          weatherData.map((weather, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="singleDay" key={index}>
              <div className="weather-img">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.description}.png`}
                  alt="날씨 아이콘"
                />
              </div>
              <div className="day">{weather.dayOfWeek}</div>
              <div className="temperature">
                <div className="down">{weather.min.toFixed(1)}</div>
                <div className="divide">/</div>
                <div className="up">{weather.max.toFixed(1)}</div>
              </div>
            </div>
          ))
        ) : (
          <div>날씨 정보를 불러오는 중입니다...</div>
        )}
      </div>
    </div>
  );
}

export default Weather;
