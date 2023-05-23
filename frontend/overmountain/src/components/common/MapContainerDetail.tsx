import React, { useEffect, useState } from 'react';
import redflag from '@assets/images/redflag.png';
import { Map, MapMarker, MapTypeId, Polyline } from 'react-kakao-maps-sdk';

function MapContainerDetail(props: { trailPath: TrailPath }) {
  // 해당 등산로 연결을 위한 trailspot 위경도만 추출
  const paths = props.trailPath.result.map((trail) => ({
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
  const imageSize = { width: 24, height: 24 };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      center: {
        lat: paths.length > 0 ? paths[paths.length - 1].lat : 37.5009759,
        lng: paths.length > 0 ? paths[paths.length - 1].lng : 127.0373502,
      },
      isLoading: true,
      isPanto: true,
    }));
  }, [props.trailPath]);

  return (
    <>
      {/* <CategoryMarkerStyle /> */}
      <div id="mapwrap">
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
      </div>
    </>
  );
}

export default MapContainerDetail;
