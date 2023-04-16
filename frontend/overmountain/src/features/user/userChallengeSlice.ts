import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@app/store';
import axios from 'axios';
import { baseURL } from '@features/port';

const initialChallengeState: ChallengeList = {
  result: {
    challengeList: [],
    conquerNo: 0,
  },
};

// API 명세서 9번. 100대 명산 챌린지 리스트
export const getChallengeList = createAsyncThunk(
  'userChallengeSlice/getChallengeList',
  async () => {
    const url = `${baseURL}user/challenge`;
    const response = await axios({
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') },
      url: url,
    });
    return response.data.result;
  },
);

export const userChallengeSlice = createSlice({
  name: 'userChallenge',
  initialState: initialChallengeState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 9번. 100대 명산 챌린지 리스트
    builder.addCase(getChallengeList.fulfilled, (state, action) => {
      state.result = action.payload;
      // console.log('9 성공!', state.result);
    });
    builder.addCase(getChallengeList.rejected, (state, action) => {
      console.log('100대명산 실패!', action.error);
    });
  },
});

export const userChallenge = (state: RootState) => state.userChallenge;

export default userChallengeSlice.reducer;
