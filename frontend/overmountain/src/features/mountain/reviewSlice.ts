import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '@features/port';
import { RootState } from '@app/store';

const initialReviewListState: ReviewList = {
  reviewList: [],
};

// API 명세서 23번. 후기 리스트 GET
export const getReviewList = createAsyncThunk(
  'reviewSlice/getReviewList',
  async (mountainIdx: string) => {
    const url = `${baseURL}mountain/review/${mountainIdx}`;
    const response = await axios({
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') },
      url: url,
    });
    return response.data.result.reviewList;
  },
);

// API 명세서 24. 후기 작성 POST
export const writeReview = createAsyncThunk(
  'reviewSlice/writeReview',
  async (review: {
    mountainSeq: string;
    userSeq: number;
    content: string;
    rate: number;
  }) => {
    const url = `${baseURL}mountain/review`;
    const response = await axios({
      method: 'POST',
      headers: { Authorization: localStorage.getItem('token') },
      data: review,
      url: url,
    });
    console.log('24:', review);
    return response.data.result;
  },
);

// API 명세서 25. 후기 삭제 DELETE
export const deleteReview = createAsyncThunk(
  'reviewSlice/deleteReview',
  async (reviewIdx: number) => {
    const url = `${baseURL}mountain/review/${reviewIdx}`;
    const response = await axios({
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      url: url,
    });
    return response.data.result;
  },
);

export const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState: initialReviewListState,
  reducers: {},
  extraReducers: (builder) => {
    // API 명세서 23번. 후기 리스트 GET
    builder.addCase(getReviewList.fulfilled, (state, action) => {
      state.reviewList = action.payload;
      // console.log('23 성공!', state.reviewList);
    });
    builder.addCase(getReviewList.rejected, (state, action) => {
      console.log('후기 리스트 실패!', action.error);
    });

    // API 명세서 24. 후기 작성 POST
    builder.addCase(writeReview.fulfilled, () => {
      // console.log('24 성공!');
    });
    builder.addCase(writeReview.rejected, (state, action) => {
      console.log('후기 작성 실패!', action.error);
    });

    // API 명세서 25. 후기 삭제 DELETE
    builder.addCase(deleteReview.fulfilled, () => {
      // console.log('25 성공!');
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      console.log('후기 삭제 실패!', action.error);
    });
  },
});

export const review = (state: RootState) => state.reviews;

export default reviewSlice.reducer;
