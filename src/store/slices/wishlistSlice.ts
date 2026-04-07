import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../../services/WishlistService';
import {RootState} from '../index';

interface WishlistItem {
  product_id: string;
  item_id?: string;
  product: string;
  price: string;
  [key: string]: any;
}

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId: string | number, {rejectWithValue}) => {
    try {
      const result = await getWishlist(userId);
      if (!result.success) return rejectWithValue('Failed to fetch wishlist');
      return result.products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const toggleWishlistItem = createAsyncThunk(
  'wishlist/toggleItem',
  async (
    {userId, productId}: {userId: string | number; productId: string | number},
    {getState, dispatch, rejectWithValue},
  ) => {
    const state = getState() as RootState;
    const existingItem = state.wishlist.items.find(
      (item: any) => String(item.product_id) === String(productId),
    );

    try {
      if (existingItem) {
        const result = await removeFromWishlist(
          userId,
          existingItem.item_id || productId,
        );
        if (!result.success) return rejectWithValue(result.message);
      } else {
        const result = await addToWishlist(userId, productId);
        if (!result.success) return rejectWithValue(result.message);
      }
      dispatch(fetchWishlist(userId));
      return {productId, wasRemoved: !!existingItem};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWishlist.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
