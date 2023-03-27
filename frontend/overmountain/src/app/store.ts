import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import additionalMiddleware from 'additional-middleware'
// import logger from 'redux-logger';
import counterReducer from '@features/counter/counterSlice';
import mountainReducer from '@features/mountain/mountainSlice';
import trailsReducer from '@features/trail/trailSlice';
import usersReducer from '@features/user/userSlice';
import seasonMountainReducer from '@features/mountain/seasonMountainSlice';
import trailListReducer from '@features/trail/trailListSlice';
import spotListReducer from '@features/trail/spotSlice';

export const store = configureStore({
  reducer: {
    // slice 삽입. slice의 name을 key값으로 사용
    counter: counterReducer,
    mountains: mountainReducer,
    seasonMountains: seasonMountainReducer,
    trails: trailsReducer,
    trailLists: trailListReducer,
    users: usersReducer,
    spotLists: spotListReducer,
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
