import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@app/store';
import axios from 'axios';
import { fetchCount } from '@features/counter/counterAPI';

export interface UserState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  value: 0,
  status: 'idle',
};

const fetchUser = createAsyncThunk("FETCH_USER", async () =>{
  try{
    const response = await axios.get("http://localhost:8080");
    return response.data;
  }catch(error){
    console.log(error);
  }
});

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder
		// 	.addCase(fetchUser.pending, (state, action) ={})  // 데이터 통신 대기중일 때
		// 	.addCase(fetchUser.fulfilled, (state, action) => {
	  //     return { ...state, data: [ ...action.payload ] }
	  //   });                                               // 데이터 통신 성공했을 때
		// 	.addCase(fetchUser.reject, (state, action) => {}) // 데이터 통신 실패했을 때
  },  
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export const selectCount = (state: RootState) => state.users.value;

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default userSlice.reducer;
