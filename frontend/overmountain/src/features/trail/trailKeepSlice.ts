import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialTrailState: Trail = {
  sequence: 0,
  name: '',
  mountainSeq: '',
  difficulty: '',
  time: 0,
  length: 0,
  isLike: false,
  keepCount: 0,
  recommend: null,
};

// API 명세서 15번. 찜 등록
export const updateTrailKeep = createAsyncThunk(
  'trailKeepSlice/updateTrailKeep',
  async (trailSeq: number) => {
    const request = {
      courseSeq: trailSeq,
    };
    const url = `${baseURL}trail/keep`;
    const response = await axios({
      method: 'POST',
      headers: { Authorization: localStorage.getItem('token') },
      url: url,
      data: request,
    });
    return response.data;
  },
);

export const trailKeepSlice = createSlice({
  name: 'trailKeepSlice',
  initialState: initialTrailState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 15번. 찜 등록
    builder.addCase(updateTrailKeep.fulfilled, () => {});
    builder.addCase(updateTrailKeep.rejected, (_, action) => {
      console.log('15 실패!', action.error);
    });
  },
});

export const trailKeep = (state: RootState) => state.trailKeeps;
export default trailKeepSlice.reducer;
