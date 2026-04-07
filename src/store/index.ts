import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/cartSlice';
import surfyReducer from './slices/surfySlice';
import wishlistReducer from './slices/wishlistSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'auth', 'search', 'cart', 'surfy', 'wishlist'],
};

const appRootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  search: searchReducer,
  cart: cartReducer,
  surfy: surfyReducer,
  wishlist: wishlistReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logout') {
    // Clear all state on logout
    state = undefined;
  }
  return appRootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // Disabled: large persisted state (cart/wishlist) causes >32ms checks in dev.
      // This middleware is already disabled in production builds.
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
