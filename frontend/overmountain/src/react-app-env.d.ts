/// <reference types="react-scripts" />

// 한 개 산의 상세 정보
interface Mountain {
  mountain: {
    mountainSeq: string; // 산코드
    latitude: number; // 위도
    longitude: number; // 경도
    altitude: number; // 해발고도
    si: string; // 시
    gu: string; // 구
    dong: string; // 동
    name: string; // 산이름
    img: string; // 산 이미지
    introduction: string; // 산 설명
    difficulty: string; // 난이도
    top100: number; // 백대명산
    spring: number; // 봄산
    summer: number; // 여름산
    fall: number; // 가을산
    winter: number; // 겨울산
    sunrise: number; // 일출명산
    sunset: number; // 일몰명산
  };
}

// 등산로 하나의 작은 정보
interface miniTrail {
  latitude: number;
  longitude: number;
  altitude: number;
}

// 계절 산 리스트
interface SeasonMountains {
  result: {
    season: string; // 계절
    seasonList: Array<Mountain>; // 산 리스트
  };
}

// 등산로 하나의 모든 위경도값
interface TrailPath {
  result: Array<miniTrail>;
}

// 한 개 등산로 상세 정보
interface Trail {
  sequence: number;
  name: string;
  length: number;
  difficulty: string;
  keepCount: number;
  recommend: boolean | null;
}

// 등산로 리스트
interface TrailList {
  result: Array<Trail>;
}

// 한 개 스팟의 상세 정보
interface miniSpot {
  mountainSeq: string;
  name: string;
  code: number;
  introduction: string;
  etc: string | null;
  latitude: number;
  longitude: number;
  distance: number;
}

// 스팟 리스트
interface SpotList {
  result: Array<miniSpot>;
}
