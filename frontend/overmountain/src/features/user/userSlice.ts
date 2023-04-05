import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, store } from '@app/store';
import axios from 'axios';
import { baseURL } from '@features/port';

const initialUserState: User = {
  userSeq: 0,
  nickname: '',
  gender: '',
  age: 0,
  si: '',
  gu: '',
  dong: '',
  latitude: 0,
  longitude: 0,
  level: 0,
  difficulty: 0,
  region: 0,
  purpose: 0,
  time: 0,
  social: '',
  socialId: '',
  totalDuration: '',
  totalDistance: '',
  totalNumber: 0,
  profileImage: '',
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
    userRegion: string;
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

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 8번. 회원정보 수정(선택 정보) - 설문내용
    builder.addCase(putUserInfo.fulfilled, (state, action) => {
      state = action.payload;
      console.log('8 성공!', state);
    });
    builder.addCase(putUserInfo.rejected, (state, action) => {
      console.log('8 실패!', action.error);
    });
  },
});

export const user = (state: RootState) => state.users;

export default userSlice.reducer;
