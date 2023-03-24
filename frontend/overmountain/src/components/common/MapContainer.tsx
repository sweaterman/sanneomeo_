import React, { useEffect } from 'react';

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

function MapContainer() {
  useEffect(() => {
    let container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    let options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(37.586272, 127.029005), // 지도의 중심좌표
      level: 13, // 지도의 레벨(확대, 축소 정도)
    };
    let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    // ---> 기본 맵 container, options, map 설정.

    // for (let i = 0; i < dummy.data.length; i++) {
    //   displayMarker(dummy.data[i], i);
    // }

    // 장소 검색 객체를 생성합니다
    let ps = new window.kakao.maps.services.Places();

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    // function placesSearchCB(data, status, pagination) {
    //   if (status === window.kakao.maps.services.Status.OK) {
    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가합니다
    //     let bounds = new window.kakao.maps.LatLngBounds();

    //     for (let i = 0; i < data.length; i++) {
    //       displayMarker(data[i]);
    //       bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    //     }

    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //     map.setBounds(bounds);
    //   }
    // }

    // 키워드로 장소를 검색합니다
    // ps.keywordSearch('이태원 맛집', placesSearchCB);

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
      let infowindow;

      infowindow = new window.kakao.maps.InfoWindow({
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

    // 중심좌표 재설정
    let position = new window.kakao.maps.LatLng(37.586272, 127.029005);
    map.setCenter(position);
  }, []);

  return <div id="map" style={{ width: '300px', height: '400px' }} />;
}

export default MapContainer;
