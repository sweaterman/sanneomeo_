import React, { useEffect, useState } from 'react';
import toiletimg from '@assets/images/wc.png';
import practiceimg from '@assets/images/stretching.png';
import waterimg from '@assets/images/waterdrop.png';
import carparkimg from '@assets/images/parking.png';
import dotimg from '@assets/images/dot.png';
import flaglight from '@assets/images/flag_light.png';
import redflag from '@assets/images/redflag.png';
import curMarker from '@assets/images/target.png';
import ramgiHere from '@assets/images/ramgi_here.png';
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
  const [state, setState] = useState({
    center: {
      lat: paths.length ? paths[0].lat : 37.5009759,
      lng: paths.length ? paths[0].lng : 127.0373502,
    },
    isPanto: false,
    isLoading: true,
  });

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
  console.log('loading', state.isLoading);
  console.log('center', state.center);
  // console.log('path[0]', paths[0].lat, paths[0].lng);

  const imageSize = { width: 24, height: 24 };

  const [selectedCategory, setSelectedCategory] = useState('toilet');

  const selectCategoryHandler = (e: any) => {
    console.log('selectCategoryHandler', e);
    setSelectedCategory(e);
  };
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      center: {
        lat: paths.length ? paths[0].lat : 37.5009759,
        lng: paths.length ? paths[0].lng : 127.0373502,
      },
      isLoading: true,
    }));
  }, []);

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

  const toMapCenter = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setState((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          isLoading: false,
          isPanto: true,
        }));
      });
    }
  };
  return (
    <>
      {/* <CategoryMarkerStyle /> */}
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
          onDragStart={(map) =>
            setState((prev) => ({
              ...prev,
              isLoading: true,
            }))
          }
          // 중심이동시 해당위치로 좌표갱신
          onCenterChanged={(map) =>
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
              position={state.center}
            >
              {/* 커스텀 오버레이에 표시할 내용입니다 */}
              <div className="ramgi-here">
                <img src={ramgiHere} alt="ramgiHere" />
              </div>
            </CustomOverlayMap>
          )}
          {selectedCategory === 'all' &&
            positions.map((position) => (
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
                      x: 2,
                      y: 25,
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
          <div
            id="allMenu"
            className="all-button"
            role="presentation"
            onClick={(e) => selectCategoryHandler('all')}
            onKeyDown={(e) => selectCategoryHandler('all')}
          >
            전체
          </div>
          <div
            id="toiletMenu"
            className="toilet-button"
            role="presentation"
            onClick={(e) => selectCategoryHandler('toilet')}
            onKeyDown={(e) => selectCategoryHandler('toilet')}
          >
            화장실
          </div>
          <div
            id="practiceMenu"
            className="practice-button"
            role="presentation"
            onClick={(e) => selectCategoryHandler('practice')}
            onKeyDown={(e) => selectCategoryHandler('practice')}
          >
            운동
          </div>
          <div
            id="waterMenu"
            className="water-button"
            role="presentation"
            onClick={(e) => selectCategoryHandler('water')}
            onKeyDown={(e) => selectCategoryHandler('water')}
          >
            음수대
          </div>
          <div
            id="carparkMenu"
            className="carpark-button"
            role="presentation"
            onClick={(e) => selectCategoryHandler('carpark')}
            onKeyDown={(e) => selectCategoryHandler('carpark')}
          >
            주차장
          </div>
          <div
            id="startMenu"
            className="start-button"
            role="presentation"
            onClick={(e) => selectCategoryHandler('start')}
            onKeyDown={(e) => selectCategoryHandler('start')}
          >
            시종점
          </div>
        </div>
      </div>
    </>
  );
}

export default MapTrailDetail;
