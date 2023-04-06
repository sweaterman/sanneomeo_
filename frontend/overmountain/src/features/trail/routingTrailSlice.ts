import { RootState } from '@app/store';
import { createSlice } from '@reduxjs/toolkit';

// 추천받은 등산로 -> 산 상세페이지로 넘어갈 때,
// 추천받은 등산로를 기본적으로 선택해서 보여주기 위한 slice
// 만약 null이라면, 대표 등산로를 선택해서 보여줌.

type RountingTrail = {
  rountingTrailKey: number;
};
const initialState: RountingTrail = {
  rountingTrailKey: 0,
};

const rountingTrailSlice = createSlice({
  name: 'rountingTrailSlice',
  initialState: initialState,
  reducers: {
    setRountingTrailKey: (state, action) => {
      state.rountingTrailKey = action.payload;
      // console.log('라우팅 키 변경', state.rountingTrailKey);
    },
  },
});

export const { setRountingTrailKey } = rountingTrailSlice.actions;
export const rountingTrailKey = (state: RootState) => state.rountingKey;
export default rountingTrailSlice.reducer;
