import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialSpotListState: SpotList = {
  result: {
    mountainName: '',
    trailName: '',
    spotList: [],
  },
};

// API 명세서 28번. 산->지도 스팟 상세정보
export const getTrailSpotList = createAsyncThunk(
  'spotSlice/getTrailSpotList',
  async (trailIdx: number) => {
    const url = `${baseURL}spot/trail/${trailIdx}`;
    const response = await axios({ method: 'GET', url: url });
    return response.data.result;
  },
);

export const spotSlice = createSlice({
  name: 'spotSlice',
  initialState: initialSpotListState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 28번. 산->지도 스팟 상세정보
    builder.addCase(getTrailSpotList.fulfilled, (state, action) => {
      state.result = action.payload;
      // console.log('28 성공!', state.result);
    });
    builder.addCase(getTrailSpotList.rejected, (state, action) => {
      console.log('스팟 실패!', action.error);
    });
  },
});

export const spotList = (state: RootState) => state.spotLists;
export default spotSlice.reducer;
