import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialTrailListState: TrailList = {
  result: [
    {
      sequence: 0,
      name: '',
      length: 0,
      difficulty: '',
      keepCount: 0,
      recommend: false,
    },
  ],
};

// API 명세서 16번. 산에 해당하는 등산로 리스트
export const getMountainTrailList = createAsyncThunk(
  'trailListSlice/getMountainTrailList',
  async (mountainIdx: string) => {
    const url = `${baseURL}mountain/trail/${mountainIdx}`;
    const response = await axios({ method: 'GET', url: url });
    return response.data.result;
  },
);

export const trailListSlice = createSlice({
  name: 'trailListSlice',
  initialState: initialTrailListState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 16번. 등산로 상세 정보
    builder.addCase(getMountainTrailList.fulfilled, (state, action) => {
      state.result = action.payload;
      console.log('16 성공!', state.result);
    });
    builder.addCase(getMountainTrailList.rejected, (state, action) => {
      console.log('16 실패!', action.error);
    });
  },
});

export const trailList = (state: RootState) => state.trailLists;
export default trailListSlice.reducer;
