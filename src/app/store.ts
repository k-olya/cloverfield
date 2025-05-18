import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from "react-redux";
import haystack from "../features/game/slice";
import audioReducer from "../features/audio/slice";
import saveReducer from "../features/save/slice";

export const store = configureStore({
  reducer: {
    haystack,
    audio: audioReducer,
    save: saveReducer,
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

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => _useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
