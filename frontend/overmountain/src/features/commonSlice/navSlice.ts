import { RootState } from '@app/store';
import { createSlice } from '@reduxjs/toolkit';

// 네비바 open,close 관리

type NavState = {
  toogle: boolean;
};

const initialState: NavState = {
  toogle: false,
};

const navSlice = createSlice({
  name: 'navSlice',
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toogleNavBar: (state, action) => {
      // console.log(state.toogle, '이것은 toogle값.');
      state.toogle = action.payload;
    },
  },
});

export const { toogleNavBar } = navSlice.actions;
export const navbarState = (state: RootState) => state.navBars;
export default navSlice.reducer;
