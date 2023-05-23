import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialMountainState: ElasticList = {
  result: [],
};

// API 명세서 13번. 산,주소검색 목록출력 - 산seq, name, si, gu, dong
export const getMountainSearch = createAsyncThunk(
  'searchMountainSlice/getMountainSearch',
  async (searchMountainKey: string) => {
    const url = `${baseURL}mountain/search?key=${searchMountainKey}`; // 검색주소 key
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

export const searchMountainSlice = createSlice({
  name: 'searchMountains',
  initialState: initialMountainState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 13번. 산,주소검색
    builder.addCase(getMountainSearch.fulfilled, (state, action) => {
      state.result = action.payload;
      // console.log('13 성공!', state.result);
    });
    builder.addCase(getMountainSearch.rejected, (state, action) => {
      console.log('산,주소 검색 실패!', action.error);
    });
  },
});

export const searchMountain = (state: RootState) => state.searchMountains;

export default searchMountainSlice.reducer;
