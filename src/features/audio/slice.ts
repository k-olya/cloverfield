import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { audioPlayer } from "./player";

export interface AudioState {
  muted: boolean;
  volume: number; // 0..1
  initialized: boolean;
}

const initialState: AudioState = {
  muted: true,
  volume: 1,
  initialized: false,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {}, // No direct state-only reducers
});

// Thunks to wrap audioPlayer methods and update state
export const initializeAudio = (): AppThunk => async (dispatch, getState) => {
  await audioPlayer.init();
  dispatch({ type: "audio/setInitialized", payload: true });
};

export const playAudio = (): AppThunk => async (dispatch, getState) => {
  await audioPlayer.play();
  dispatch({ type: "audio/setInitialized", payload: true });
  dispatch({ type: "audio/setMuted", payload: false });
};

export const muteAudio = (): AppThunk => (dispatch, getState) => {
  audioPlayer.mute();
  dispatch({ type: "audio/setMuted", payload: true });
};

export const unmuteAudio = (): AppThunk => (dispatch, getState) => {
  audioPlayer.unmute();
  dispatch({ type: "audio/setMuted", payload: false });
};

export const setAudioVolume = (vol: number): AppThunk => (dispatch, getState) => {
  audioPlayer.setVolume(vol);
  dispatch({ type: "audio/setVolume", payload: vol });
};

// Custom reducer to handle state updates from thunks
export default function audioReducer(state = initialState, action: any): AudioState {
  switch (action.type) {
    case "audio/setMuted":
      return { ...state, muted: action.payload };
    case "audio/setVolume":
      return { ...state, volume: action.payload };
    case "audio/setInitialized":
      return { ...state, initialized: action.payload };
    default:
      return state;
  }
} 