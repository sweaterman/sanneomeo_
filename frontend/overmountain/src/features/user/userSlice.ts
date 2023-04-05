import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, store } from '@app/store';
import axios from 'axios';
import { baseURL } from '@features/port';

const initialUserState: User = {
  result: {
    level: 0,
    region: 0,
    purpose: 0,
    time: 0,
    modifiedAt: 0,
    login: false,
  },
};

// API 명세서 8번. 회원정보 수정(선택 정보) - 설문내용
export const putUserInfo = createAsyncThunk(
  'userSlice/putUserInfo',
  async ({
    userLevel,
    userRegion,
    userPurpose,
    userTime,
  }: {
    userLevel: number;
    userRegion: number;
    userPurpose: number;
    userTime: number;
  }) => {
    // Redux store에서 현재상태 가져오기
    const currentState = (store.getState() as RootState).users;
    // request에 필요한 상태만 업데이트
    const request = {
      ...currentState,
      level: userLevel,
      region: userRegion,
      purpose: userPurpose,
      time: userTime,
    };
    console.log('유저 보내는정보:', request);
    const url = `${baseURL}user/info`;
    const response = await axios({
      method: 'PUT',
      headers: { Authorization: localStorage.getItem('token') },
      url: url,
      data: request,
    });
    return response.data;
  },
);

// API 명세서 7번. 회원정보 가져오기
export const getUserInfo = createAsyncThunk(
  'userSlice/getUserInfo',
  async () => {
    const url = `${baseURL}user/info`;
    const response = await axios({
      method: 'GET',
      url: url,
      headers: { Authorization: localStorage.getItem('token') },
    });
    return response.data.result;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 8번. 회원정보 수정(선택 정보) - 설문내용
    builder.addCase(putUserInfo.fulfilled, (state, action) => {
      console.log('8 성공!', state.result);
    });
    builder.addCase(putUserInfo.rejected, (state, action) => {
      console.log('8 실패!', action.error);
    });

    // API 명세서 7번. 회원정보 가져오기
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.result = action.payload;
      console.log('7 성공!', state.result);
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      console.log('7 실패!', action.error);
    });
  },
});

export const user = (state: RootState) => state.users;

export default userSlice.reducer;
