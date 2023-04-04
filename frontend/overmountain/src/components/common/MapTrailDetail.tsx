import path from 'path';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker, MapTypeId, Polyline } from 'react-kakao-maps-sdk';

// 기타
// 조망점
// 화장실 o
// 주요나무
// 시종점
// 분기점 x
// 정상
// 기타건물
// 시설물(운동기구 등)
// 가로등
// 이정표
// 안내판또는지도
// 헬기장
// "유적(문화, 역사)"
// 음수대 o
// 주차장 o
// 벤치
// 정자
// 훼손지
// 위험지역
// 대피소
// 동굴
// 야영장
// 정상부
// "유적(문화,역사)"
// 시설물(운동기구등)
// 안내판
// 노선내분기
// 시작점
// 시설물

function MapTrailDetail(props: {
  trailListData: TrailPath;
  spotListData: SpotList;
}) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  // 해당 등산로 연결을 위한 trailspot 위경도만 추출
  const paths = props.trailListData.result.map((trail) => ({
    lat: trail.latitude,
    lng: trail.longitude,
  }));

  // 해당 산의 스팟들
  const positions = props.spotListData.result.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));

  const toiletPositions = props.spotListData.result.filter(
    (spots) => spots.name === '화장실' || spots.introduction.includes('휴게'),
  );
  const toiletSpots = toiletPositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));
  const practicePositions = props.spotListData.result.filter(
    (spots) =>
      spots.name.includes('운동') || spots.introduction.includes('운동'),
  );
  const practiceSpots = toiletPositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));
  const waterPositions = props.spotListData.result.filter(
    (spots) => spots.name === '음수대' || spots.introduction.includes('약수터'),
  );
  const waterSpots = waterPositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));
  const carPositions = props.spotListData.result.filter(
    (spots) => spots.name === '주차장' || spots.introduction.includes('주차'),
  );
  const carSpots = carPositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));

  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
  const markerImageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
  const imageSize = { width: 22, height: 26 };
  const spriteSize = { width: 36, height: 98 };
  // 화장실 마커가 표시될 좌표 배열입니다
  const coffeePositions = toiletSpots;

  const coffeeOrigin = { x: 10, y: 0 };
  // 음수대 마커가 표시될 좌표 배열입니다
  const storePositions = waterSpots;
  const storeOrigin = { x: 10, y: 36 };
  // 주차장 마커가 표시될 좌표 배열입니다
  const carparkPositions = carSpots;

  const carparkOrigin = { x: 10, y: 72 };
  const [selectedCategory, setSelectedCategory] = useState('coffee');

  const selectCategoryHandler = () => {
    console.log('selectCategoryHandler');
  };
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
            lat: 37.5711934678,
            lng: 127.0880958443,
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
            path={[paths]}
            strokeWeight={5} // 선의 두께 입니다
            strokeColor={'#AA5656'} // 선의 색깔입니다
            strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
          />
        </Map>
        {/* 지도 위에 표시될 마커 카테고리 */}
        <div className="category">
          <button
            type="button"
            className="dropdown-category"
            onChange={(e) => setIsOpenDropdown(!isOpenDropdown)}
          >
            선택하세요
          </button>
          <div className="dropdown-content">
            <div
              id="coffeeMenu"
              role="presentation"
              onClick={() => setSelectedCategory('coffee')}
              onKeyDown={() => setSelectedCategory('coffee')}
            >
              <span className="ico_comm ico_coffee"></span>
              화장실
            </div>
            <div
              id="storeMenu"
              role="presentation"
              onClick={() => setSelectedCategory('store')}
              onKeyDown={() => setSelectedCategory('store')}
            >
              <span className="ico_comm ico_store"></span>
              음수대
            </div>
            <div
              id="carparkMenu"
              role="presentation"
              onClick={() => setSelectedCategory('carpark')}
              onKeyDown={() => setSelectedCategory('carpark')}
            >
              <span className="ico_comm ico_carpark"></span>
              주차장
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapTrailDetail;
