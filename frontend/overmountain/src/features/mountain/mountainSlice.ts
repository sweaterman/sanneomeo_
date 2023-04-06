import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialMountainState: Mountain = {
  mountain: {
    mountainSeq: '',
    latitude: 0,
    longitude: 0,
    altitude: 0,
    si: '',
    gu: '',
    dong: '',
    name: '',
    photo: '',
    introduction: '',
    difficulty: '',
    top100: 0,
    spring: 0,
    summer: 0,
    fall: 0,
    winter: 0,
    sunrise: 0,
    sunset: 0,
    conquer: false,
    trailSeq: 0,
  },
};

// 여기서 getMountainDetail은 Action Creator로서 타입이 있어야한다.
// API 명세서 18번. 산 상세정보
export const getMountainDetail = createAsyncThunk(
  'mountainSlice/getMountainDetail', // -> 이것이 액션 타입 -> 파일이름/함수이름

  // 액션이 실행되었을 때 처리되어야 하는 작업
  async (mountainIdx: string) => {
    const url = `${baseURL}mountain/info/${mountainIdx}`; // 산 메인용
    const response = await axios({
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') },
      url: url,
    });
    return response.data.result;
  },
);

// API 명세서 19번. 산 위치정보
export const getMountainPlace = createAsyncThunk(
  'mountainSlice/getMountainPlace',
  async (mountainIdx: string) => {
    const url = `${baseURL}mountain/position/${mountainIdx}`; // 산 정보용
    const response = await axios({ method: 'GET', url: url });
    return response.data.result;
  },
);

// action creator는 3가지 상태를 갖는다.(약속된것)
// 1. pending: 시작했을 때의 상태
// 2. fulfilled: 비동기 작업이 끝났을 때 (데이터를 가져왔을 때)
// 3. rejected: 오류가 생겨서 중단되었을 때
// 이 세 가지 상태별로 reducer가 필요하다.
export const mountainSlice = createSlice({
  name: 'mountainSlice',
  initialState: initialMountainState,
  // 동기 처리 (action creator를 자동으로 만듦)
  reducers: {},
  // 비동기 처리 (action creator를 자동으로 만들지 못함)
  extraReducers: (builder) => {
    // API 명세서 17. 산 상세 정보
    // builder.addCase(getMountainDetail.pending, (state, action) => {
    //   // state.status = 'Loading';
    // });
    builder.addCase(getMountainDetail.fulfilled, (state, action) => {
      state.mountain = action.payload;
      // console.log('17 성공!', state.mountain);
    });
    builder.addCase(getMountainDetail.rejected, (state, action) => {
      console.log('산 상세정보 실패!', action.error);
    });

    // API 명세서 18. 산 위치 정보
    builder.addCase(getMountainPlace.fulfilled, (state, action) => {
      state.mountain = action.payload;
      // console.log('18 성공!', state.mountain);
    });
    builder.addCase(getMountainPlace.rejected, (state, action) => {
      console.log('산 위치 정보 실패!', action.error);
    });
  },
});

export const mountain = (state: RootState) => state.mountains;

export default mountainSlice.reducer;
