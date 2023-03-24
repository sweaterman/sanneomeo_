import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
  mapViewState: boolean;
  callback: (e: React.MouseEvent) => void;
}

interface PlaceType {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
}

function MapContainer() {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 33.452613, lng: 126.570888 },
    // 지도 위치 변경시 panto를 이용할지에 대한 정의
    isPanto: false,
  });

  // 마커 담는 배열
  let markers: any[] = [];

  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const mapCenter = new window.kakao.maps.LatLng(37.586272, 127.029015);
    let options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: mapCenter, // 지도의 중심좌표
      level: 1, // 지도의 레벨(확대, 축소 정도)
    };

    // 지도 생성 및 객체 리턴
    const map = new window.kakao.maps.Map(container, options);
    // ---> 기본 맵 container, options, map 설정.

    // 장소 검색 객체를 생성합니다
    const ps = new window.kakao.maps.services.Places();

    // 키워드 검색을 요청하는 함수
    // function searchPlaces() {
    //   let keyword = '역삼';

    //   if (!keyword.replace(/^\s+|\s+$/g, '')) {
    //     console.log('키워드를 입력해주세요!');
    //     return false;
    //   }

    //   // 장소검색 객체를 통해 키워드로 장소검색을 요청
    //   ps.keywordSearch(keyword, placesSearchCB);
    // }
    // searchPlaces();

    // 마커를 생성하고 지도위에 마커 표시하는 함수
    function addMarker(position: any, idx: number, title: undefined) {
      let imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지
        imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions,
        ),
        marker = new window.kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출
      markers.push(marker); // 배열에 생성된 마커를 추가

      return marker;
    }

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    // function placesSearchCB(data: any, status: any, pagination: any) {
    //   if (status === window.kakao.maps.services.Status.OK) {
    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가합니다
    //     let bounds = new window.kakao.maps.LatLngBounds();

    //     // for (let i = 0; i < data.length; i++) {
    //     //   displayMarker(data[i]);
    //     //   bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    //     // }

    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //     map.setBounds(bounds);
    //   }
    // }

    // 인포윈도우 클릭 이벤트
    function handleIwClick(e: any) {
      console.log(e.target);
    }

    function displayMarker<
      T extends {
        name: string;
        location_y: number;
        location_x: number;
        active: boolean;
        point: number;
      },
    >(data: T, i: number) {
      // 인포윈도우 표시될 위치(좌표)
      let iwPosition = new window.kakao.maps.LatLng(
        data.location_y,
        data.location_x,
      );

      // 인포윈도우에 표출될 내용. HTML 문자열이나 document element 등이 가능하다.
      let inactiveInfoWindow = `<div class="inactive infowindow""><span>${data.name}</span></div>`;

      // 인포윈도우
      let infowindow = new window.kakao.maps.InfoWindow({
        zIndex: 1,
        position: iwPosition,
        content: inactiveInfoWindow,
        disableAutoPan: false,
        map: map, // map에 해당 인포윈도우를 적용한다.
      });

      let infoTitle = document.querySelectorAll('.infowindow');
      // 코드에 적용한 '인포윈도우에 표출될 내용'을 담은 태그에 적용한 class명(혹은id명)을 선택자를 이용하여 불러온다.
      infoTitle.forEach(function (e: any) {
        let w = e.offsetWidth + 10;
        e.parentElement.style.width = w;
        e.parentElement.style.position = 'relative';
        if (e.className.includes('inactive')) {
          e.parentElement.previousSibling.style.backgroundImage =
            "url('https://user-images.githubusercontent.com/81412212/174342201-0ec0c927-97f1-49dd-8c23-d6a872d9dfad.png')"; // 꼭지
        } else {
          e.parentElement.previousSibling.style.backgroundImage =
            "url('https://user-images.githubusercontent.com/81412212/174341207-bbaa6a46-2d67-4731-8a51-9a429488affa.png')"; // 꼭지
        }
        e.parentElement.parentElement.style.display = 'flex';
        e.parentElement.parentElement.style.background = 'none';
        e.parentElement.parentElement.style.border = 'none';
        e.parentElement.parentElement.style.justifyContent = 'center';
        e.childNodes[1].style.display = 'block';
        e.childNodes[1].style.margin = '-8px';
        e.parentElement.style.top = '-12px';
        e.parentElement.style.top = '3px';
        e.parentElement.parentElement.onclick = handleIwClick; // 인포윈도우 클릭이벤트
      });
    }

    // 마커위에 인포윈도우 표시
    // infowindow.open(map, mapMarker);

    // 중심좌표 재설정
    // let position = new window.kakao.maps.LatLng(37.586272, 127.029405);
    // map.setCenter(position);
  }, []);

  function moveToCenter() {
    setState({
      center: { lat: 33.56058, lng: 126.574942 },
      isPanto: true,
    });
  }
  return (
    <div>
      <div id="map" style={{ width: '350px', height: '300px' }} />
      <button type="button" onClick={moveToCenter}>
        지도 중심좌표 부드럽게 이동
      </button>
    </div>
  );
}

export default MapContainer;
