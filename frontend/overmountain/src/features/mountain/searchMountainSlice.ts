import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialMountainState: elasticList = {
  result: [],
};

// API 명세서 13번. 산,주소검색 목록출력 - 산seq, name, si, gu, dong
export const getMountainSearch = createAsyncThunk(
  'searchMountainSlice/getMountainSearch', // -> 이것이 액션 타입 -> 파일이름/함수이름

  // 액션이 실행되었을 때 처리되어야 하는 작업
  async (searchMountainKey: string) => {
    const url = `${baseURL}main/search?key=${searchMountainKey}`; // 검색주소 key
    const response = await axios({
      method: 'GET',
      url: url,
    });
    return response.data.result;
  },
);

// API 명세서 n번. 검색목록클릭시 산정보수신 - 22번과 동일한리턴: name, lat, lng, alt, diff
export const getElasticMountain = createAsyncThunk(
  'searchMountainSlice/getElasticMountain',
  async (mountainIdx: string) => {
    const url = `${baseURL}main/search/${mountainIdx}`; // 산 정보용
    const response = await axios({ method: 'GET', url: url });
    return response.data.result;
  },
);

// action creator는 3가지 상태를 갖는다.(약속된것)
// 1. pending: 시작했을 때의 상태
// 2. fulfilled: 비동기 작업이 끝났을 때 (데이터를 가져왔을 때)
// 3. rejected: 오류가 생겨서 중단되었을 때
// 이 세 가지 상태별로 reducer가 필요하다.
export const searchMountainSlice = createSlice({
  name: 'searchMountains',
  initialState: initialMountainState,
  // 동기 처리 (action creator를 자동으로 만듦)
  reducers: {},
  // 비동기 처리 (action creator를 자동으로 만들지 못함)
  extraReducers: (builder) => {
    // API 명세서 13번. 산,주소검색
    // builder.addCase(getMountainDetail.pending, (state, action) => {
    //   // state.status = 'Loading';
    // });
    builder.addCase(getMountainSearch.fulfilled, (state, action) => {
      state = action.payload;
      console.log('13 성공!', state);
    });
    builder.addCase(getMountainSearch.rejected, (state, action) => {
      console.log('13 실패!', action.error);
    });
  },
});

export const searchMountain = (state: RootState) => state.searchMountains;

export default searchMountainSlice.reducer;
