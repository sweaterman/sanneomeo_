import React, { useEffect, useState } from 'react';
import toiletimg from '@assets/images/wc.png';
import practiceimg from '@assets/images/stretching.png';
import waterimg from '@assets/images/waterdrop.png';
import carparkimg from '@assets/images/parking.png';
import dotimg from '@assets/images/dot.png';
import flaglight from '@assets/images/flag_light.png';
import redflag from '@assets/images/redflag.png';
import curMarker from '@assets/images/target.png';
import ramgiHere from '@assets/images/ramgi_camera.png';
import {
  Map,
  MapMarker,
  MapTypeId,
  Polyline,
  CustomOverlayMap,
} from 'react-kakao-maps-sdk';

function MapTrailDetail(props: {
  trailListData: TrailPath;
  spotListData: SpotList;
}) {
  // 해당 등산로 연결을 위한 trailspot 위경도만 추출
  const paths = props.trailListData.result.map((trail) => ({
    lat: trail.latitude,
    lng: trail.longitude,
  }));
  const [pathState, setPathState] = useState(paths);

  const [state, setState] = useState({
    center: {
      lat: paths.length ? paths[0].lat : 37.5009759,
      lng: paths.length ? paths[0].lng : 127.0373502,
    },
    isPanto: false,
    isLoading: true,
  });
  const [currentPositionLat, setCurrentPositionLat] = useState(
    state.center.lat,
  );
  const [currentPositionLng, setCurrentPositionLng] = useState(
    state.center.lng,
  );

  // 해당 산의 전체 스팟들
  const positions = props.spotListData.result.spotList.filter(
    (spots) =>
      spots.name.includes('화장실') ||
      spots.name.includes('운동') ||
      spots.name.includes('음수') ||
      spots.name.includes('주차') ||
      spots.name.includes('시종') ||
      spots.introduction.includes('휴게') ||
      spots.introduction.includes('운동') ||
      spots.introduction.includes('약수') ||
      spots.introduction.includes('주차') ||
      spots.introduction.includes('이정'),
  );
  const allSpots = positions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));

  // 카테고리별 스팟들 좌표
  const toiletPositions = props.spotListData.result.spotList.filter(
    (spots) => spots.name === '화장실' || spots.introduction.includes('휴게'),
  );
  const toiletSpots = toiletPositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));
  const practicePositions = props.spotListData.result.spotList.filter(
    (spots) =>
      spots.name.includes('운동') || spots.introduction.includes('운동'),
  );
  const practiceSpots = practicePositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));
  const waterPositions = props.spotListData.result.spotList.filter(
    (spots) => spots.name === '음수대' || spots.introduction.includes('약수'),
  );
  const waterSpots = waterPositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));
  const carPositions = props.spotListData.result.spotList.filter(
    (spots) => spots.name === '주차장' || spots.introduction.includes('주차'),
  );
  const carparkSpots = carPositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));
  const startPositions = props.spotListData.result.spotList.filter(
    (spots) => spots.name === '시종점' || spots.introduction.includes('이정'),
  );
  const startSpots = startPositions.map((position) => ({
    lat: position.latitude,
    lng: position.longitude,
  }));

  const imageSize = { width: 24, height: 24 };

  const [selectedCategory, setSelectedCategory] = useState('all');

  const selectCategoryHandler = (e: any) => {
    setSelectedCategory(e);
  };
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      center: {
        lat: paths.length ? paths[paths.length - 1].lat : 37.5009759,
        lng: paths.length ? paths[paths.length - 1].lng : 127.0373502,
      },
      isLoading: true,
    }));
    setPathState(paths);
    console.log(pathState);
  }, [props.trailListData]);

  useEffect(() => {
    const allMenu = document.getElementById('allMenu');
    const toiletMenu = document.getElementById('toiletMenu');
    const practiceMenu = document.getElementById('practiceMenu');
    const waterMenu = document.getElementById('waterMenu');
    const carparkMenu = document.getElementById('carparkMenu');
    const startMenu = document.getElementById('startMenu');

    if (
      allMenu &&
      toiletMenu &&
      practiceMenu &&
      waterMenu &&
      carparkMenu &&
      startMenu
    ) {
      if (selectedCategory === 'all') {
        allMenu.className = 'menu-selected';
        toiletMenu.className = 'menu-unselected';
        practiceMenu.className = 'menu-unselected';
        waterMenu.className = 'menu-unselected';
        carparkMenu.className = 'menu-unselected';
        startMenu.className = 'menu-unselected';
      } else if (selectedCategory === 'toilet') {
        // 화장실 카테고리를 선택된 스타일로 변경하고
        toiletMenu.className = 'menu-selected';
        // 나머지 카테고리는 선택되지 않은 스타일로 바꿉니다
        allMenu.className = 'menu-unselected';
        practiceMenu.className = 'menu-unselected';
        waterMenu.className = 'menu-unselected';
        carparkMenu.className = 'menu-unselected';
        startMenu.className = 'menu-unselected';
      } else if (selectedCategory === 'practice') {
        allMenu.className = 'menu-unselected';
        toiletMenu.className = 'menu-unselected';
        practiceMenu.className = 'menu-selected';
        waterMenu.className = 'menu-unselected';
        carparkMenu.className = 'menu-unselected';
        startMenu.className = 'menu-unselected';
      } else if (selectedCategory === 'water') {
        // 편의점 카테고리가 클릭됐을 때
        // 편의점 카테고리를 선택된 스타일로 변경하고
        allMenu.className = 'menu-unselected';
        toiletMenu.className = 'menu-unselected';
        practiceMenu.className = 'menu-unselected';
        waterMenu.className = 'menu-selected';
        carparkMenu.className = 'menu-unselected';
        startMenu.className = 'menu-unselected';
      } else if (selectedCategory === 'carpark') {
        // 주차장 카테고리가 클릭됐을 때
        // 주차장 카테고리를 선택된 스타일로 변경하고
        allMenu.className = 'menu-unselected';
        toiletMenu.className = 'menu-unselected';
        practiceMenu.className = 'menu-unselected';
        waterMenu.className = 'menu-unselected';
        carparkMenu.className = 'menu-selected';
        startMenu.className = 'menu-unselected';
      } else if (selectedCategory === 'start') {
        allMenu.className = 'menu-unselected';
        toiletMenu.className = 'menu-unselected';
        practiceMenu.className = 'menu-unselected';
        waterMenu.className = 'menu-unselected';
        carparkMenu.className = 'menu-unselected';
        startMenu.className = 'menu-selected';
      }
    }
  }, [selectedCategory]);

  const toMapCenter = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPositionLat(position.coords.latitude);
        setCurrentPositionLng(position.coords.longitude);
        setState((prev) => ({
          ...prev,
          center: {
            lat: currentPositionLat,
            lng: currentPositionLng,
          },
          isLoading: false,
          isPanto: true,
        }));
      });
    }
  };

  const toFlagCenter = () => {
    setState((prev) => ({
      ...prev,
      center: {
        lat: paths.length ? paths[paths.length - 1].lat : 37.5009759,
        lng: paths.length ? paths[paths.length - 1].lng : 127.0373502,
      },
      isLoading: true,
      isPanto: true,
    }));
  };
  return (
    <div className="map-trail-detail">
      {/* 지도 위에 표시될 마커 카테고리 */}
      <div className="category">
        <div
          id="allMenu"
          className="button-selected"
          role="presentation"
          onClick={() => selectCategoryHandler('all')}
          onKeyDown={() => selectCategoryHandler('all')}
        >
          전체
        </div>
        <div
          id="toiletMenu"
          className="button-unselected"
          role="presentation"
          onClick={() => selectCategoryHandler('toilet')}
          onKeyDown={() => selectCategoryHandler('toilet')}
        >
          화장실
        </div>
        <div
          id="practiceMenu"
          className="button-unselected"
          role="presentation"
          onClick={() => selectCategoryHandler('practice')}
          onKeyDown={() => selectCategoryHandler('practice')}
        >
          운동
        </div>
        <div
          id="waterMenu"
          className="button-unselected"
          role="presentation"
          onClick={() => selectCategoryHandler('water')}
          onKeyDown={() => selectCategoryHandler('water')}
        >
          음수대
        </div>
        <div
          id="carparkMenu"
          className="button-unselected"
          role="presentation"
          onClick={() => selectCategoryHandler('carpark')}
          onKeyDown={() => selectCategoryHandler('carpark')}
        >
          주차장
        </div>
        <div
          id="startMenu"
          className="button-unselected"
          role="presentation"
          onClick={() => selectCategoryHandler('start')}
          onKeyDown={() => selectCategoryHandler('start')}
        >
          시종점
        </div>
      </div>
      <div id="mapwrap" className="map-wrap">
        <Map // 지도를 표시할 Container
          id={`map`}
          center={state.center}
          isPanto={state.isPanto}
          style={{
            // 지도의 크기
            width: '100%',
            height: '450px',
            zIndex: '0',
          }}
          level={7} // 지도의 확대 레벨
          // 지도 드래그시 이벤트
          onDragEnd={(map) =>
            setState((prev) => ({
              ...prev,
              center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
              },
            }))
          }
        >
          {/* 현재 등산로의 종점(정상) 빨간깃발 */}
          <MapMarker
            position={{
              lat: paths.length > 0 ? paths[paths.length - 1].lat : 1,
              lng: paths.length > 0 ? paths[paths.length - 1].lng : 1,
            }}
            image={{
              src: redflag,
              size: imageSize,
              options: {
                offset: {
                  x: 2,
                  y: 25,
                },
              },
            }}
          />
          {/* 현재위치 마커표시 */}
          {!state.isLoading && (
            <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
              // 커스텀 오버레이가 표시될 위치입니다
              position={{
                lat: currentPositionLat,
                lng: currentPositionLng,
              }}
            >
              {/* 커스텀 오버레이에 표시할 내용입니다 */}
              <div className="ramgi-here">
                <img src={ramgiHere} alt="ramgiHere" />
              </div>
            </CustomOverlayMap>
          )}
          {selectedCategory === 'all' &&
            allSpots.map((position) => (
              <MapMarker
                key={`${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: dotimg,
                  size: imageSize,
                  options: {
                    offset: {
                      x: 10,
                      y: 13,
                    },
                  },
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
                  src: flaglight,
                  size: imageSize,
                  options: {
                    offset: {
                      x: 12,
                      y: 20,
                    },
                  },
                }}
              />
            ))}
          {/* 지도에 지형정보를 표시하도록 지도타입을 추가합니다 */}
          <MapTypeId type={kakao.maps.MapTypeId.TERRAIN} />
          {/* 버튼 클릭시 현재위치로 이동 */}
          <div className="map-button-container">
            <button className="map-button" type="button" onClick={toMapCenter}>
              <img src={curMarker} alt="current location" />
            </button>
          </div>

          <div className="flag-button-container">
            <button
              className="flag-button"
              type="button"
              onClick={toFlagCenter}
            >
              <img src={redflag} alt="flag location" />
            </button>
          </div>
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
      </div>
    </div>
  );
}

export default MapTrailDetail;
