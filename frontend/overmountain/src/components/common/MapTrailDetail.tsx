import path from 'path';
import React, { useEffect, useState } from 'react';
import toiletimg from '@assets/images/wc.png';
import practiceimg from '@assets/images/stretching.png';
import waterimg from '@assets/images/waterdrop.png';
import carparkimg from '@assets/images/parking.png';
import dotimg from '@assets/images/dot.png';
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
  // 해당 등산로 연결을 위한 trailspot 위경도만 추출
  const paths = props.trailListData.result.map((trail) => ({
    lat: trail.latitude,
    lng: trail.longitude,
  }));

  // 해당 산의 전체 스팟들
  const positions = props.spotListData.result.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));

  // 카테고리별 스팟들 좌표
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
  const practiceSpots = practicePositions.map((position) => ({
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
  const carparkSpots = carPositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));
  const startPositions = props.spotListData.result.filter(
    (spots) => spots.name === '시종점' || spots.introduction.includes('시종'),
  );
  const startSpots = startPositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));
  console.log(startSpots);

  const imageSize = { width: 24, height: 24 };

  const [selectedCategory, setSelectedCategory] = useState('toilet');

  const selectCategoryHandler = (e: any) => {
    console.log('selectCategoryHandler', e.target.value);
    setSelectedCategory(e.target.value);
  };
  useEffect(() => {
    const toiletMenu = document.getElementById('toiletMenu');
    const practiceMenu = document.getElementById('practiceMenu');
    const waterMenu = document.getElementById('waterMenu');
    const carparkMenu = document.getElementById('carparkMenu');
    const startMenu = document.getElementById('startMenu');
    if (toiletMenu && practiceMenu && waterMenu && carparkMenu && startMenu) {
      if (selectedCategory === 'toilet') {
        // 화장실 카테고리를 선택된 스타일로 변경하고
        toiletMenu.className = 'menu_selected';
        // 편의점과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
        practiceMenu.className = '';
        waterMenu.className = '';
        carparkMenu.className = '';
        startMenu.className = '';
        console.log('classname', toiletMenu);
      } else if (selectedCategory === 'practice') {
        toiletMenu.className = '';
        practiceMenu.className = 'menu_selected';
        waterMenu.className = '';
        carparkMenu.className = '';
        startMenu.className = '';
      } else if (selectedCategory === 'water') {
        // 편의점 카테고리가 클릭됐을 때
        // 편의점 카테고리를 선택된 스타일로 변경하고
        toiletMenu.className = '';
        practiceMenu.className = '';
        waterMenu.className = 'menu_selected';
        carparkMenu.className = '';
        startMenu.className = '';
      } else if (selectedCategory === 'carpark') {
        // 주차장 카테고리가 클릭됐을 때
        // 주차장 카테고리를 선택된 스타일로 변경하고
        toiletMenu.className = '';
        practiceMenu.className = '';
        waterMenu.className = '';
        carparkMenu.className = 'menu_selected';
        startMenu.className = '';
      } else if (selectedCategory === 'start') {
        toiletMenu.className = '';
        practiceMenu.className = '';
        waterMenu.className = '';
        carparkMenu.className = '';
        startMenu.className = 'menu_selected';
      }
    }
  }, [selectedCategory]);
  return (
    <>
      {/* <CategoryMarkerStyle /> */}
      <div id="mapwrap" className="map-wrap">
        <Map // 지도를 표시할 Container
          id={`map`}
          center={{
            // 지도의 중심좌표
            lat: paths.length ? paths[0].lat : 37.5009759,
            lng: paths.length ? paths[0].lng : 127.0373502,
          }}
          style={{
            // 지도의 크기
            width: '100%',
            height: '450px',
            zIndex: '0',
          }}
          level={5} // 지도의 확대 레벨
        >
          {selectedCategory === 'all' &&
            positions.map((position) => (
              <MapMarker
                key={`${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: dotimg,
                  size: imageSize,
                }}
              />
            ))}
          {selectedCategory === 'toilet' &&
            toiletSpots.map((position) => (
              <MapMarker
                key={`toilet-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: toiletimg,
                  size: imageSize,
                }}
              />
            ))}
          {selectedCategory === 'practice' &&
            practiceSpots.map((position) => (
              <MapMarker
                key={`practice-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: practiceimg,
                  size: imageSize,
                }}
              />
            ))}
          {selectedCategory === 'water' &&
            waterSpots.map((position) => (
              <MapMarker
                key={`water-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: waterimg,
                  size: imageSize,
                }}
              />
            ))}
          {selectedCategory === 'carpark' &&
            carparkSpots.map((position) => (
              <MapMarker
                key={`carpark-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: carparkimg,
                  size: imageSize,
                }}
              />
            ))}
          {selectedCategory === 'start' &&
            startSpots.map((position) => (
              <MapMarker
                key={`start-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: carparkimg,
                  size: imageSize,
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
          <select
            className="dropdown-category"
            onChange={(e) => selectCategoryHandler(e)}
          >
            <option value="all" id="allMenu">
              전체
            </option>
            <option value="toilet" id="toiletMenu">
              화장실
            </option>
            <option value="practice" id="practiceMenu">
              운동
            </option>
            <option value="water" id="waterMenu">
              음수대
            </option>
            <option value="carpark" id="carparkMenu">
              주차장
            </option>
            <option value="start" id="startMenu">
              시종점
            </option>
          </select>
        </div>
      </div>
    </>
  );
}

export default MapTrailDetail;
