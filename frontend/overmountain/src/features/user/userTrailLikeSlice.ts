import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@app/store';
import axios from 'axios';
import { baseURL } from '@features/port';

const initialTrailLikeState: TrailLikeList = {
  result: [],
};

// API 명세서 8번. 찜한 등산로 리스트
const getUserTrailLike = createAsyncThunk(
  'userChallengeSlice/getUserTrailLike',
  async (userSeq: number) => {
    const url = `${baseURL}user/${userSeq}/trailLike`;
    const response = await axios({
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') },
      url: url,
    });
    return response.data.result;
  },
);

export const userTrailLikeSlice = createSlice({
  name: 'userTrailLike',
  initialState: initialTrailLikeState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 8번. 찜한 등산로 리스트
    builder.addCase(getUserTrailLike.fulfilled, (state, action) => {
      state.result = action.payload;
      console.log('8 성공!', state.result);
    });
    builder.addCase(getUserTrailLike.rejected, (state, action) => {
      console.log('8 실패!', action.error);
    });
  },
});

export const userTrailLike = (state: RootState) => state.userTrailLike;

export default userTrailLikeSlice.reducer;
