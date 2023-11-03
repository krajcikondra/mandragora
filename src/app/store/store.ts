import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import playerReducer from '../store/playerSlice';
import storeReducer from '../store/storeSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    store: storeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
