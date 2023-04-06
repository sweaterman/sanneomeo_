import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialPositionTrailState: PositionTrail = {
  result: {
    trailSeq: 0,
    latitude: 0,
    longitude: 0,
    distance: 0,
  },
};

// API 명세서 24번. 기준 위도/경도와 가장 가까운 등산로 반환
export const getPositionTrail = createAsyncThunk(
  'positionTrailSlice/getPositionTrail',
  async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    // console.log('위경도', latitude, longitude);
    const url = `${baseURL}spot/main?latitude=${latitude}&longitude=${longitude}`;
    const response = await axios({ method: 'GET', url: url });
    return response.data.result;
  },
);

export const positionTrailSlice = createSlice({
  name: 'positionTrailSlice',
  initialState: initialPositionTrailState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 24번. 기준 위도/경도와 가장 가까운 등산로 반환
    builder.addCase(getPositionTrail.fulfilled, (state, action) => {
      state.result = action.payload;
      // console.log('24 성공!', state.result);
    });
    builder.addCase(getPositionTrail.rejected, (state, action) => {
      console.log('가까운 등산로 실패!', action.error);
    });
  },
});

export const positionTrail = (state: RootState) => state.positionTrails;
export default positionTrailSlice.reducer;
