import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialTrailState: TrailPath = {
  result: [],
};

// API 명세서 15번. 등산로 상세 정보
export const getTrailDetail = createAsyncThunk(
  'trailSlice/getTrailDetail',
  async (trailIdx: number) => {
    const url = `${baseURL}trail/info/${trailIdx}`;
    const response = await axios({ method: 'GET', url: url });
    return response.data.result;
  },
);

export const trailSlice = createSlice({
  name: 'trailSlice',
  initialState: initialTrailState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 15번. 등산로 상세 정보
    builder.addCase(getTrailDetail.fulfilled, (state, action) => {
      state.result = action.payload;
      // console.log('15 성공!', state.result);
    });
    builder.addCase(getTrailDetail.rejected, (state, action) => {
      console.log('등산로 상세 실패!', action.error);
    });
  },
});

export const trailDetail = (state: RootState) => state.trails;
export default trailSlice.reducer;
