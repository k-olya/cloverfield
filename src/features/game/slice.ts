import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clamp, irand } from "app/math";
import { LEVELS } from "config/emoji-pairs";

export const ALL_MODIFIERS = ["speedrun", "headstart", "reduced-motion"] as const;
export type Modifier = typeof ALL_MODIFIERS[number];

export const isModifier = (x: string): x is Modifier =>
  ALL_MODIFIERS.includes(x as Modifier);

export interface EmojiPair {
  id: number;
  needle: string;
  hay: string;
  name: string;
  difficulty: number;
  price: number;
}

export type NamedLevelList = { name: string; levels: EmojiPair[]}[];

export interface Haystack {
  w: number;
  h: number;
  x: number;
  y: number;
  count: number;
  ticks: number;
  gameState: "initial" | "playing" | "paused" | "finished";
  modifiers: Modifier[];
  start?: number | null;
  finish?: number | null;
  activePairId: number;
  levels: NamedLevelList;
  revives: number;
  toMenuClicks: number;
}

// the game will continue playing upon reaching max score
// but field size will not increase anymore
export const MAX_SCORE = 41;
export const WAIT_TICKS = 15.3 * 50;
export const TICK_T = 20;

const initialState: Haystack = {
  w: 2,
  h: 2,
  x: 0,
  y: 0,
  count: 0,
  ticks: 0,
  gameState: "initial",
  modifiers: [],
  activePairId: 1, // Default to first level in Classic set
  levels: LEVELS,
  revives: 2,
  toMenuClicks: 0
};

export const getActivePair = (state: Haystack): EmojiPair => {
  for (const levelSet of state.levels) {
    const pair = levelSet.levels.find(level => level.id === state.activePairId);
    if (pair) return pair;
  }
  return state.levels[0].levels[0]; // Fallback to first level if ID not found
};

export const haystackSlice = createSlice({
  name: "haystack",
  initialState,
  reducers: {
    setDimensions: (
      state,
      { payload }: PayloadAction<Pick<Haystack, "w" | "h">>
    ) => {
      state.w = payload.w;
      state.h = payload.h;
    },
    setPaused: (state, { payload }: PayloadAction<boolean>) => {
      if (state.gameState === "playing" && payload) {
        state.gameState = "paused";
      } else if (state.gameState === "paused" && !payload) {
        state.gameState = "playing";
      }
    },
    reset: (state) => {
      const headstart = state.modifiers.includes("headstart") ? MAX_SCORE : 0;
      const w = headstart + initialState.w;
      const h = headstart + initialState.h;
      return {
        ...initialState,
        modifiers: state.modifiers,
        activePairId: state.activePairId,
        levels: state.levels,
        toMenuClicks: state.toMenuClicks,
        w,
        h,
        x: irand(w),
        y: irand(h),
      };
    },
    setModifiers: (state, { payload }: PayloadAction<Modifier[]>) => {
      state.modifiers = payload;
      haystackSlice.caseReducers.reset(state);
    },
    setActivePairId: (state, { payload }: PayloadAction<number>) => {
      state.activePairId = payload;
      haystackSlice.caseReducers.reset(state);
    },
    increment: (state) => {
      if (state.gameState !== "finished") {
        if (state.gameState === "initial") {
          state.start = Date.now();
          state.count = -1;
        }
        if (state.modifiers.includes("headstart")) {
          state.w = MAX_SCORE + initialState.w;
          state.h = MAX_SCORE + initialState.h;
        } else {
          state.w = clamp(
            state.w + 1,
            initialState.w,
            MAX_SCORE + initialState.w
          );
          state.h = clamp(
            state.h + 1,
            initialState.h,
            MAX_SCORE + initialState.h
          );
        }
        state.count++;
        state.ticks = WAIT_TICKS;
        state.gameState = "playing";

        if (state.count === MAX_SCORE + 1) {
          state.finish = Date.now();
        }

        if (
          state.modifiers.includes("speedrun") &&
          typeof state.finish === "number"
        ) {
          state.gameState = "finished";
        } else {
          state.x = irand(state.w);
          state.y = irand(state.h);
        }
      }
    },
    revive: (state) => {
      state.gameState = "playing";
      state.finish = null;
      state.ticks = WAIT_TICKS;
      // don't even move the needle
      // state.x = irand(state.w);
      // state.y = irand(state.h);
      state.revives--;
    },
    tick: (state) => {
      if (state.gameState === "playing") {
        state.ticks = clamp(state.ticks - 1, 0, WAIT_TICKS);
        if (state.ticks === 0) {
          state.gameState = "finished";
          state.finish = Date.now();
        }
      }
    },
    toMenu: (state) => {
      state.toMenuClicks++;
    }
  },
});

export const { setDimensions, reset, setModifiers, setActivePairId, increment, tick, setPaused, revive, toMenu } = haystackSlice.actions;

export default haystackSlice.reducer;