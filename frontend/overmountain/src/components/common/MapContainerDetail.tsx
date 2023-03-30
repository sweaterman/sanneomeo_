import React, { useEffect, useState } from 'react';
import { Map, MapMarker, MapTypeId, Polyline } from 'react-kakao-maps-sdk';

function MapContainerDetail() {
  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
  const markerImageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
  const imageSize = { width: 22, height: 26 };
  const spriteSize = { width: 36, height: 98 };
  // 커피숍 마커가 표시될 좌표 배열입니다
  const coffeePositions = [
    { lat: 37.499590490909185, lng: 127.0263723554437 },
    { lat: 37.499427948430814, lng: 127.02794423197847 },
    { lat: 37.498553760499505, lng: 127.02882598822454 },
    { lat: 37.497625593121384, lng: 127.02935713582038 },
    { lat: 37.49646391248451, lng: 127.02675574250912 },
    { lat: 37.49629291770947, lng: 127.02587362608637 },
    { lat: 37.49754540521486, lng: 127.02546694890695 },
  ];
  const coffeeOrigin = { x: 10, y: 0 };
  // 편의점 마커가 표시될 좌표 배열입니다
  const storePositions = [
    { lat: 37.497535461505684, lng: 127.02948149502778 },
    { lat: 37.49671536281186, lng: 127.03020491448352 },
    { lat: 37.496201943633714, lng: 127.02959405469642 },
    { lat: 37.49640072567703, lng: 127.02726459882308 },
    { lat: 37.49640098874988, lng: 127.02609983175294 },
    { lat: 37.49932849491523, lng: 127.02935780247945 },
    { lat: 37.49996818951873, lng: 127.02943721562295 },
  ];
  const storeOrigin = { x: 10, y: 36 };
  // 주차장 마커가 표시될 좌표 배열입니다
  const carparkPositions = [
    { lat: 37.49966168796031, lng: 127.03007039430118 },
    { lat: 37.499463762912974, lng: 127.0288828824399 },
    { lat: 37.49896834100913, lng: 127.02833986892401 },
    { lat: 37.49893267508434, lng: 127.02673400572665 },
    { lat: 37.49872543597439, lng: 127.02676785815386 },
    { lat: 37.49813096097184, lng: 127.02591949495914 },
    { lat: 37.497680616783086, lng: 127.02518427952202 },
  ];
  const carparkOrigin = { x: 10, y: 72 };
  const [selectedCategory, setSelectedCategory] = useState('coffee');
  useEffect(() => {
    const coffeeMenu = document.getElementById('coffeeMenu');
    const storeMenu = document.getElementById('storeMenu');
    const carparkMenu = document.getElementById('carparkMenu');
    if (coffeeMenu && storeMenu && carparkMenu) {
      if (selectedCategory === 'coffee') {
        // 커피숍 카테고리를 선택된 스타일로 변경하고
        coffeeMenu.className = 'menu_selected';
        // 편의점과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
        storeMenu.className = '';
        carparkMenu.className = '';
      } else if (selectedCategory === 'store') {
        // 편의점 카테고리가 클릭됐을 때
        // 편의점 카테고리를 선택된 스타일로 변경하고
        coffeeMenu.className = '';
        storeMenu.className = 'menu_selected';
        carparkMenu.className = '';
      } else if (selectedCategory === 'carpark') {
        // 주차장 카테고리가 클릭됐을 때
        // 주차장 카테고리를 선택된 스타일로 변경하고
        coffeeMenu.className = '';
        storeMenu.className = '';
        carparkMenu.className = 'menu_selected';
      }
    }
  }, [selectedCategory]);
  return (
    <>
      {/* <CategoryMarkerStyle /> */}
      <div id="mapwrap">
        <Map // 지도를 표시할 Container
          id={`map`}
          center={{
            // 지도의 중심좌표
            lat: 37.498004414546934,
            lng: 127.02770621963765,
          }}
          style={{
            // 지도의 크기
            width: '100%',
            height: '450px',
          }}
          level={4} // 지도의 확대 레벨
        >
          {selectedCategory === 'coffee' &&
            coffeePositions.map((position) => (
              <MapMarker
                key={`coffee-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: markerImageSrc,
                  size: imageSize,
                  options: {
                    spriteSize: spriteSize,
                    spriteOrigin: coffeeOrigin,
                  },
                }}
              />
            ))}
          {selectedCategory === 'store' &&
            storePositions.map((position) => (
              <MapMarker
                key={`store-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: markerImageSrc,
                  size: imageSize,
                  options: {
                    spriteSize: spriteSize,
                    spriteOrigin: storeOrigin,
                  },
                }}
              />
            ))}
          {selectedCategory === 'carpark' &&
            carparkPositions.map((position) => (
              <MapMarker
                key={`carpark-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: markerImageSrc,
                  size: imageSize,
                  options: {
                    spriteSize: spriteSize,
                    spriteOrigin: carparkOrigin,
                  },
                }}
              />
            ))}
          {/* 지도에 지형정보를 표시하도록 지도타입을 추가합니다 */}
          <MapTypeId type={kakao.maps.MapTypeId.TERRAIN} />

          {/* 지도 위에 선그리기 */}
          <Polyline
            path={[
              [
                { lat: 37.50049778578472, lng: 127.03658473473631 },
                { lat: 37.50086705721686, lng: 127.0370372785959 },
                { lat: 37.50034397422333, lng: 127.03859766407413 },
              ],
            ]}
            strokeWeight={5} // 선의 두께 입니다
            strokeColor={'#AA5656'} // 선의 색깔입니다
            strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
          />
        </Map>
        {/* 지도 위에 표시될 마커 카테고리 */}
        <div className="category">
          <ul>
            <li
              id="coffeeMenu"
              role="presentation"
              onClick={() => setSelectedCategory('coffee')}
              onKeyDown={() => setSelectedCategory('coffee')}
            >
              <span className="ico_comm ico_coffee"></span>
              커피숍
            </li>
            <li
              id="storeMenu"
              role="presentation"
              onClick={() => setSelectedCategory('store')}
              onKeyDown={() => setSelectedCategory('coffee')}
            >
              <span className="ico_comm ico_store"></span>
              편의점
            </li>
            <li
              id="carparkMenu"
              role="presentation"
              onClick={() => setSelectedCategory('carpark')}
              onKeyDown={() => setSelectedCategory('coffee')}
            >
              <span className="ico_comm ico_carpark"></span>
              주차장
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MapContainerDetail;
