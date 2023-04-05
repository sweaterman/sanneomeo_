import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialState: RecomTrailList = {
  result: {
    target: {
      sequence: 0,
      name: '',
      length: 0,
      difficulty: '',
      keepCount: 0,
      recommend: null,
      isLike: false,
      time: 0,
      mountainSeq: '',
    },
    result: [],
  },
};

// API 명세서 15번. 추천받은 등산로 리스트
export const getRecomTrail = createAsyncThunk(
  'recomSlice/getRecomTrail',
  async (sendData: {
    level: number;
    region: string;
    purpose: number;
    time: number;
  }) => {
    const url = `${baseURL}trail/recommend/survey?level=${sendData.level}&region=${sendData.region}&purpose=${sendData.purpose}&time=${sendData.time}`;
    const response = await axios({
      method: 'GET',
      url: url,
    });
    return response.data.result;
  },
);

export const recomSlice = createSlice({
  name: 'recomSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 15번. 추천받은 등산로 리스트
    builder.addCase(getRecomTrail.fulfilled, (state, action) => {
      state.result = action.payload;
      console.log('추천 성공!', state.result);
    });
    builder.addCase(getRecomTrail.rejected, (state, action) => {
      console.log('추천 실패!', action.error);
    });
  },
});

export const recomm = (state: RootState) => state.recomms;

export default recomSlice.reducer;
