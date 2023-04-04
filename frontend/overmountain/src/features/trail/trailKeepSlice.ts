import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialTrailState: TrailLike = {
  trailSeq: 0,
  name: '',
  mountainSeq: '',
  difficulty: '',
  uptime: 0,
  downtime: 0,
  length: 0,
  keep: false,
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
    builder.addCase(updateTrailKeep.fulfilled, (state, action) => {
      console.log('15 성공!');
    });
    builder.addCase(updateTrailKeep.rejected, (state, action) => {
      console.log('15 실패!', action.error);
    });
  },
});

export const trailKeep = (state: RootState) => state.trailKeeps;
export default trailKeepSlice.reducer;
