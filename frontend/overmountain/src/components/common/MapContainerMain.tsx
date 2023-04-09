import React, { useEffect, useState } from 'react';
import {
  Map,
  MapMarker,
  MapTypeId,
  CustomOverlayMap,
} from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import mapMarker from '@assets/images/map-marker.png';
import curMarker from '@assets/images/target.png';
import closeMarker from '@assets/images/close.png';

function MapContainerMain(props: { searchResult: ElasticMountain }) {
  // 검색결과 담기
  const result = props.searchResult;

  // 인포윈도우 관리
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    center: {
      lat: result.latitude > 0 ? result.latitude : 37.5009759,
      lng: result.latitude > 0 ? result.longitude : 127.0373502,
    },
    errMsg: null,
    isLoading: true,
    isPanto: false,
  });
  const [currentPositionLat, setCurrentPositionLat] = useState(
    state.center.lat,
  );
  const [currentPositionLng, setCurrentPositionLng] = useState(
    state.center.lng,
  );

  const navigate = useNavigate();

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

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      center: {
        lat: result.latitude, // 위도
        lng: result.longitude, // 경도
      },
      isLoading: true,
      isPanto: true,
    }));
  }, [result]);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: true,
          }));
        },
        (err) => {
          setState((prev: any) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev: any) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
    toMapCenter();
    toMapCenter();
  }, []);

  const toMountainDetail = () => {
    navigate(`/mountain/detail/${result.sequence}`);
  };

  const altitudeString = `${Math.floor(result.altitude)}m`;

  const customMaker = {
    src: { mapMarker },
    size: {
      width: 27,
      height: 40,
    },
  };

  return (
    <div className="kakao-map">
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{ width: '100%', height: '360px', zIndex: '1' }}
        level={7}
        // 지도 드래그시 이벤트
        onDragStart={() => {
          setState((prev) => ({
            ...prev,
            isLoading: true,
          }));
          setIsOpen(false);
        }}
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
        {result && (
          <MapMarker
            image={{
              src: mapMarker,
              size: customMaker.size,
            }}
            position={{
              lat: result.latitude,
              lng: result.longitude,
            }}
            clickable
            onClick={() => setIsOpen(true)}
          />
        )}

        {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
        {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
        {isOpen && (
          <CustomOverlayMap
            position={{
              lat: result ? result.latitude : currentPositionLat,
              lng: result ? result.longitude : currentPositionLng,
            }}
          >
            <div className="custom-info-window">
              <img
                alt="close"
                src={closeMarker}
                className="delete-button"
                role="presentation"
                onClick={() => setIsOpen(false)}
                onKeyDown={() => setIsOpen(false)}
              />
              <div className="info-container">
                <div className="info-title">
                  <div className="info-name">
                    {result.name === '' ? `잘못된 위치에요!` : result.name}{' '}
                  </div>
                  <div className="info-address">
                    {result.si} {result.gu} {result.dong}
                  </div>
                </div>
                <div className="info-body">
                  <div className="info-altitude">
                    {result.name === '' ? `` : altitudeString}
                  </div>
                  {result.name !== '' && (
                    <div
                      className="info-route"
                      role="presentation"
                      onClick={toMountainDetail}
                      onKeyDown={toMountainDetail}
                    >
                      상세보기&gt;
                    </div>
                  )}
                </div>
              </div>
              <div className="info-triangle"></div>
            </div>
          </CustomOverlayMap>
        )}

        {/* 지도에 지형정보를 표시하도록 지도타입을 추가합니다 */}
        <MapTypeId type={kakao.maps.MapTypeId.TERRAIN} />
        <div className="map-button-container">
          <button className="map-button" type="button" onClick={toMapCenter}>
            <img src={curMarker} alt="current location" />
            {/* 현재 위치 */}
          </button>
        </div>
      </Map>
    </div>
  );
}

export default MapContainerMain;
