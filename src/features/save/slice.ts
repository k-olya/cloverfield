import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";

const SAVE_STATE_KEY = "clover_save_state";

export interface SaveState {
  gold: number;
  purchasedPairIds: number[];
}

const getInitialState = (): SaveState => {
  try {
    const savedState = localStorage.getItem(SAVE_STATE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Validate the state structure
      if (typeof parsedState.gold === 'number' && Array.isArray(parsedState.purchasedPairIds)) {
        return parsedState;
      }
    }
  } catch (error) {
    console.warn('Failed to load save state:', error);
  }
  
  // Return default state if no valid save state exists
  return {
    gold: 0,
    purchasedPairIds: [1, 492] // Default unlocked pairs
  };
};

export const saveSlice = createSlice({
  name: "save",
  initialState: getInitialState(),
  reducers: {
    setGold: (state, action: PayloadAction<number>) => {
      state.gold = action.payload;
      // Sync with localStorage
      try {
        localStorage.setItem(SAVE_STATE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save state:', error);
      }
    },
    addGold: (state, action: PayloadAction<number>) => {
      state.gold += action.payload;
      // Sync with localStorage
      try {
        localStorage.setItem(SAVE_STATE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save state:', error);
      }
    },
    purchasePair: (state, action: PayloadAction<{ id: number; price: number }>) => {
      const { id, price } = action.payload;
      if (state.gold >= price && !state.purchasedPairIds.includes(id)) {
        state.gold -= price;
        state.purchasedPairIds.push(id);
        // Sync with localStorage
        try {
          localStorage.setItem(SAVE_STATE_KEY, JSON.stringify(state));
        } catch (error) {
          console.error('Failed to save state:', error);
        }
      }
    },
    resetSave: (state) => {
      state.gold = 0;
      state.purchasedPairIds = [1, 492];
      try {
        localStorage.setItem(SAVE_STATE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save state:', error);
      }
    }
  }
});

export const { setGold, addGold, purchasePair, resetSave } = saveSlice.actions;

export default saveSlice.reducer; 