import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isLoading: boolean;
  error: string | null;
  data: any;
  supportWhatsApp: string | null;
  supportEmail: string | null;
  pageIds: {
    about_us_page?: string;
    privacy_policy_page?: string;
    contact_us_page?: string;
    terms_and_conditions_page?: string;
  } | null;
  minCartAmount: number;
  appConfiguration: {
    android_version: string;
    android_url: string;
    ios_version: string;
    ios_url: string;
  } | null;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
  data: null,
  supportWhatsApp: null,
  supportEmail: null,
  pageIds: null,
  minCartAmount: 20,
  appConfiguration: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setSupportInfo: (
      state,
      action: PayloadAction<{ whatsapp: string; email: string }>,
    ) => {
      state.supportWhatsApp = action.payload.whatsapp;
      state.supportEmail = action.payload.email;
    },
    setPageIds: (state, action: PayloadAction<AppState['pageIds']>) => {
      state.pageIds = action.payload;
    },
    setMinCartAmount: (state, action: PayloadAction<number>) => {
      state.minCartAmount = action.payload;
    },
    setAppConfiguration: (
      state,
      action: PayloadAction<AppState['appConfiguration']>,
    ) => {
      state.appConfiguration = action.payload;
    },
    resetState: state => {
      state.isLoading = false;
      state.error = null;
      state.data = null;
      state.supportWhatsApp = null;
      state.supportEmail = null;
      state.minCartAmount = 20;
    },
  },
});

export const {
  setLoading,
  setError,
  setData,
  setSupportInfo,
  setPageIds,
  setMinCartAmount,
  setAppConfiguration,
  resetState,
} = appSlice.actions;

export default appSlice.reducer;
