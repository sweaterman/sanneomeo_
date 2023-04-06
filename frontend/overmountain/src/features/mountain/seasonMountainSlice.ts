import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialSeasonMountainState: SeasonMountains = {
  result: {
    season: '',
    seasonList: [],
  },
};

// API 명세서 10번. 계절 산 추천 리스트
export const getSeasonMountains = createAsyncThunk(
  'mountainSlice/getSeasonMountains',
  async () => {
    const url = `${baseURL}main/season`;
    const response = await axios({ method: 'GET', url: url });
    return response.data.result;
  },
);

export const seasonMountainSlice = createSlice({
  name: 'seasonMountainSlice',
  initialState: initialSeasonMountainState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 10. 계절 산 추천 리스트
    builder.addCase(getSeasonMountains.fulfilled, (state, action) => {
      state.result = action.payload;
      // console.log('10 성공!', state.result);
    });
    builder.addCase(getSeasonMountains.rejected, (state, action) => {
      console.log('계절 산 실패!', action.error);
    });
  },
});

export const seasonMountains = (state: RootState) => state.seasonMountains;

export default seasonMountainSlice.reducer;
