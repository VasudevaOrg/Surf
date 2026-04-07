import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SearchState {
  history: string[];
}

const initialState: SearchState = {
  history: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.trim();
      if (!searchTerm) return;

      // Remove existing occurrence to move it to the top
      state.history = state.history.filter(item => item !== searchTerm);

      // Add to beginning of array
      state.history.unshift(searchTerm);

      // Keep only last 10 searches
      if (state.history.length > 10) {
        state.history.pop();
      }
    },
    removeSearch: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(item => item !== action.payload);
    },
    clearHistory: state => {
      state.history = [];
    },
  },
});

export const {addSearch, removeSearch, clearHistory} = searchSlice.actions;
export default searchSlice.reducer;
