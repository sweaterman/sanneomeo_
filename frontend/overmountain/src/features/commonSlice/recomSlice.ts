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
    loading: false,
  },
};

// API 명세서 15번. 추천받은 등산로 리스트
export const getRecomTrail = createAsyncThunk(
  'recomSlice/getRecomTrail',
  async (sendData: {
    level: number;
    region: number;
    purpose: number;
    time: number;
  }) => {
    const url = `${baseURL}trail/recommend/survey?level=${sendData.level}&region=${sendData.region}&purpose=${sendData.purpose}&time=${sendData.time}`;
    const response = await axios({
      method: 'GET',
      url: url,
      headers: { Authorization: localStorage.getItem('token') },
    });
    return response.data;
  },
);

export const recomSlice = createSlice({
  name: 'recomSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 15번. 추천받은 등산로 리스트
    builder.addCase(getRecomTrail.fulfilled, (state, action) => {
      if (action.payload.result !== 'OK') {
        state.result = action.payload.result;
        state.result.loading = false;
      } else {
        state.result.result = [];
      }
      state.result.loading = false;
    });
    builder.addCase(getRecomTrail.pending, (state) => {
      state.result.loading = true;
      // console.log('추천 중');
    });
    builder.addCase(getRecomTrail.rejected, (state, action) => {
      console.log('추천 API 실패!', action.error);
    });
  },
});

export const recomm = (state: RootState) => state.recomms;

export default recomSlice.reducer;
