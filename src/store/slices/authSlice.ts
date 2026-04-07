import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
}

const initialState: AuthState = {
  userId: null,
  email: null,
  isAuthenticated: false,
  isGuest: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{userId: string; email: string}>,
    ) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.isGuest = false;
    },
    setGuest: (state, action: PayloadAction<boolean>) => {
      state.isGuest = action.payload;
      state.isAuthenticated = false;
    },
    logout: state => {
      state.userId = null;
      state.email = null;
      state.isAuthenticated = false;
      state.isGuest = false;
    },
  },
});

export const {setAuth, setGuest, logout} = authSlice.actions;
export default authSlice.reducer;
