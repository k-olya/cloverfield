import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cloverfield from '../features/cloverfield/slice';

export const store = configureStore({
  reducer: {
    cloverfield,
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
