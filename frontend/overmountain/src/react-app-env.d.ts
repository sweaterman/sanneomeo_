/// <reference types="react-scripts" />

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

interface SeasonMountains {
  result: {
    season: string; // 계절
    seasonList: Array<Mountain>; // 산 리스트
  };
}

interface miniTrail {
  latitude: number;
  longitude: number;
  altitude: number;
}

interface TrailPath {
  result: Array<miniTrail>;
}
