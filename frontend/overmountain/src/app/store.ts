import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import additionalMiddleware from 'additional-middleware'
// import logger from 'redux-logger';
import counterReducer from '@features/counter/counterSlice';
import mountainReducer from '@features/mountain/mountainSlice';
import searchMountainReducer from '@features/mountain/searchMountainSlice';
import trailsReducer from '@features/trail/trailSlice';
import usersReducer from '@features/user/userSlice';
import seasonMountainReducer from '@features/mountain/seasonMountainSlice';
import trailListReducer from '@features/trail/trailListSlice';
import spotListReducer from '@features/trail/spotSlice';
import positionTrailReducer from '@features/trail/positionTrailSlice';
import userChallengeSlice from '@features/user/userChallengeSlice';
import userTrailLikeSlice from '@features/user/userTrailLikeSlice';
import trailKeepSlice from '@features/trail/trailKeepSlice';
import selectedTrailSlice from '@features/trail/selectedTrailSlice';
import routingTrailSlice from '@features/trail/routingTrailSlice';

export const store = configureStore({
  reducer: {
    // slice 삽입. slice의 name을 key값으로 사용
    counter: counterReducer,
    mountains: mountainReducer,
    searchMountains: searchMountainReducer,
    seasonMountains: seasonMountainReducer,
    trails: trailsReducer,
    trailLists: trailListReducer,
    trailKeeps: trailKeepSlice,
    users: usersReducer,
    spotLists: spotListReducer,
    positionTrails: positionTrailReducer,
    userChallenge: userChallengeSlice,
    userTrailLike: userTrailLikeSlice,
    selectedKey: selectedTrailSlice,
    rountingKey: routingTrailSlice,
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
