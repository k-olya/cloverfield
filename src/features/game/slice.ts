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
    tick: (state) => {
      if (state.gameState === "playing") {
        state.ticks = clamp(state.ticks - 1, 0, WAIT_TICKS);
        if (state.ticks === 0) {
          state.gameState = "finished";
          state.finish = Date.now();
        }
      }
    },
  },
});

export const { setDimensions, reset, setModifiers, setActivePairId, increment, tick, setPaused } = haystackSlice.actions;

export default haystackSlice.reducer;

/*

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cloverfieldSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { increment, decrement, incrementByAmount } = cloverfieldSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectClover = (state: RootState) => state.cloverfield.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectClover(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default cloverfieldSlice.reducer;
*/
