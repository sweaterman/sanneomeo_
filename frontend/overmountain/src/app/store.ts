import { configureStore, ThunkAction, Action, MiddlewareArray } from '@reduxjs/toolkit';
// import additionalMiddleware from 'additional-middleware'
import logger from 'redux-logger'
import counterReducer from '@features/counter/counterSlice';
import mountainsReducer from '@features/counter/counterSlice';
import trailsReducer from '@features/counter/counterSlice';
import usersReducer from '@features/user/userSlice';

export const store = configureStore({
  reducer: {
    // slice 삽입. slice의 name을 key값으로 사용
    counter: counterReducer,
    mountains: mountainsReducer,
    trails: trailsReducer,
    users: usersReducer,
  },
  // saga 쓰면 여기에 추가
  // middleware: new MiddlewareArray().concat(additionalMiddleware, logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
