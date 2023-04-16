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
interface ElasticMountain {
  name: string;
  si: string;
  gu: string;
  dong: string;
  sequence: string;
  latitude: number;
  longitude: number;
  altitude: number;
  difficulty: string;
}

interface ElasticList {
  result: Array<ElasticMountain>;
}

// 등산로 하나의 작은 정보
interface MiniTrail {
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
  result: Array<MiniTrail>;
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
  mountainSeq: string;
}

// 등산로 리스트
interface TrailList {
  result: Array<Trail>;
}

// 한 개 스팟의 상세 정보
interface MiniSpot {
  spotSeq: number;
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
  result: {
    mountainName: string;
    trailName: string;
    spotList: Array<MiniSpot>;
  };
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
  result: {
    level: number;
    region: number;
    purpose: number;
    time: number;
    modifiedAt: number;
    login: boolean;
  };
}

// 100대 명산 챌린지 리스트
interface ChallengeList {
  result: {
    challengeList: Array<Mountain>;
    conquerNo: number;
  };
}

// 찜한 등산로 리스트
interface TrailLikeList {
  result: Array<Trail>;
}

// 한 개의 리뷰
interface Review {
  userSeq: number;
  mountainSeq: string;
  nickname: string;
  profileImage: string;
  reviewSeq: number;
  rate: number;
  content: string;
  createdAt: number;
  writer: true;
}

// 리뷰 리스트
interface ReviewList {
  reviewList: Array<Review>;
}

// 추천받은 등산로 리스트
interface RecomTrailList {
  result: {
    target: Trail;
    result: Trail[];
    loading: boolean;
  };
}
