import { RootState } from '@app/store';
import { createSlice } from '@reduxjs/toolkit';

// 로그인 상태관리

type LoginState = {
  isLogin: boolean;
};

const initialState: LoginState = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isLoginCheck: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { isLoginCheck } = loginSlice.actions;
export const loginState = (state: RootState) => state.loginCheck;
export default loginSlice.reducer;
