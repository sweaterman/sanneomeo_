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
    photo: string; // 산 이미지
    introduction: string; // 산 설명
    difficulty: string; // 난이도
    top100: number | null; // 백대명산
    spring: number | null; // 봄산
    summer: number | null; // 여름산
    fall: number | null; // 가을산
    winter: number | null; // 겨울산
    sunrise: number | null; // 일출명산
    sunset: number | null; // 일몰명산
    conquer: boolean; // 100대 명산용
    trailSeq: number; // 대표 등산로
  };
}

// elastic 검색위한 산정보
interface elasticMountain {
  mountainSeq: string;
  name: string;
  si: string;
  gu: string;
  dong: string;
  latitude: number;
  longitude: number;
  altitude: number;
  difficulty: string;
}

interface elasticList {
  result: Array<elasticMountain>;
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
  isLike: boolean;
  time: number;
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

// 내 위치와 가까운 등산로 반환할 때 쓰는 타입
interface PositionTrail {
  result: {
    trailSeq: number;
    latitude: number;
    longitude: number;
    distance: number;
  };
}
// 유저 정보
interface User {
  userSeq: number; // 유저시퀀스
  nickname: string; // 닉네임
  gender: string; // 성별
  age: number; // 나이대
  si: string; // 시
  gu: string; // 구
  dong: string; // 동
  latitude: number; // 위도
  longitude: number; // 경도
  level: number; // 설문레벨
  difficulty: number | null; // 난이도: 하1/중2/상3
  region: number | null; // 지역선호도: 집근처1/전국2
  purpose: number | null; // 목적: 힐링1/도전2
  time: number; // 선호등반시간: 3시간이내1/3-5 2/5-7 3/7-10 4/10이상 5
  social: string; // 소셜정보
  socialId: string; // 소셜고유아이디
  totalDuration: string | null; // 총등산시간
  totalDistance: string | null; // 총등산거리
  totalNumber: number | null; // 총등산횟수
  profileImage: string | null; // 프로필이미지
}

// 100대 명산 챌린지 리스트
interface ChallengeList {
  result: {
    challengeList: Array<Mountain>;
    conquerNo: number;
  };
}

// 찜한 등산로
interface TrailLike {
  trailSeq: number;
  name: string;
  mountainSeq: string;
  difficulty: string;
  uptime: number;
  downtime: number;
  length: number;
  keep: boolean;
}

// 찜한 등산로 리스트
interface TrailLikeList {
  result: Array<TrailLike>;
}
