import { RootState } from '@app/store';
import { createSlice } from '@reduxjs/toolkit';

// 산 상세 페이지에서 등산로를 선택했을 때,
// 지도의 경로와 고도를 바꿔서 보여주기 위한 Slice

type SelectedKey = {
  selectedTrailKey: number;
};

const initialState: SelectedKey = {
  selectedTrailKey: 0,
};

const selectedTrailSlice = createSlice({
  name: 'selectedTreailSlice',
  initialState: initialState,
  reducers: {
    setSelectedTrailKey: (state, action) => {
      state.selectedTrailKey = action.payload;
      // console.log(state.selectedTrailKey);
    },
  },
});

export const { setSelectedTrailKey } = selectedTrailSlice.actions;
export const selectedTrailKey = (state: RootState) => state.selectedKey;
export default selectedTrailSlice.reducer;
