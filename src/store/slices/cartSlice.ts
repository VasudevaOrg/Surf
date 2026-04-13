import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import {
  getCart as getCartService,
  addToCart as addToCartService,
  updateCartQuantity as updateCartQuantityService,
  removeFromCart as removeFromCartService,
  clearCart as clearCartService,
} from '../../services/CartService';

interface CartItem {
  product_id: string;
  item_id?: string;
  product: string;
  amount: number;
  price: string;
  display_price: string;
  main_pair?: {
    detailed?: {
      image_path: string;
    };
  };
  [key: string]: any;
}

interface CartState {
  cartItems: CartItem[];
  guestCartItems: CartItem[];
  total: number;
  format_total: string;
  subtotal: number;
  format_subtotal: string;
  discount: number;
  shipping_cost: number;
  format_shipping_cost: string;
  user_data: any;
  isLoading: boolean;
  error: string | null;
  savedCartItems: CartItem[]; // Items to restore after Buy Now
  isBuyNowSession: boolean;
}

const initialState: CartState = {
  cartItems: [],
  guestCartItems: [],
  total: 0,
  format_total: '€0.00',
  subtotal: 0,
  format_subtotal: '€0.00',
  discount: 0,
  shipping_cost: 0,
  format_shipping_cost: '€0.00',
  user_data: null,
  isLoading: false,
  error: null,
  savedCartItems: [],
  isBuyNowSession: false,
};


const toHttps = (url: string): string => {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://');
};


export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId: string | number, { rejectWithValue }) => {
    const result = await getCartService(userId);
    if (!result.success) return rejectWithValue(result.message);
    return result.cart;
  },
);

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async (
    {
      userId,
      productId,
      productDetails,
    }: {
      userId: string | number;
      productId: string | number;
      productDetails?: {
        title: string;
        price: string;
        display_price: string;
        image: string;
      };
    },
    { dispatch, getState, rejectWithValue },
  ) => {
    try {
      // 1. Construct payload from state.
      // NOTE: .pending reducer has already added/incremented the item in state!
      const state = getState() as RootState;
      const currentItems = state.cart.cartItems;

      const productData = currentItems.map((item: any) => {
        const payload: any = {
          product_id: String(item.product_id),
          amount: parseInt(item.amount) || 1,
        };
        if (item.item_id) payload.item_id = String(item.item_id);
        if (item.product_options) payload.product_options = item.product_options;
        if (item.extra) payload.extra = item.extra;
        return payload;
      });

      // 2. Pass to service
      const result = await (addToCartService as any)(
        productId,
        userId,
        1,
        productData,
      );

      if (!result.success) return rejectWithValue(result.message);

      // DISPATCH FETCH TO GET NEW ITEM_IDs
      await dispatch(fetchCart(userId));
      return result;
    } catch (error: any) {
      await dispatch(fetchCart(userId));
      return rejectWithValue(error.message);
    }
  },
);

export const updateCartQuantityThunk = createAsyncThunk(
  'cart/updateQuantity',
  async (
    {
      userId,
      productId,
      delta,
    }: { userId: string | number; productId: string | number; delta: number },
    { dispatch, getState, rejectWithValue },
  ) => {
    try {
      // 1. Construct the payload from current state.
      // NOTE: .pending reducer has already applied the delta in state!
      const state = getState() as RootState;
      const currentItems = state.cart.cartItems;

      const productData = currentItems.map((item: any) => {
        const payload: any = {
          product_id: String(item.product_id),
          amount: parseInt(item.amount) || 1,
        };
        if (item.item_id) payload.item_id = String(item.item_id);
        if (item.product_options) payload.product_options = item.product_options;
        if (item.extra) payload.extra = item.extra;
        return payload;
      });

      // 2. Call service.
      const result = await updateCartQuantityService(
        userId,
        productId,
        delta,
        productData,
      );

      if (!result.success) {
        await dispatch(fetchCart(userId));
        return rejectWithValue(result.message);
      }

      await dispatch(fetchCart(userId));
      return result;
    } catch (error: any) {
      await dispatch(fetchCart(userId));
      return rejectWithValue(error.message);
    }
  },
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItem',
  async (
    { userId, itemId }: { userId: string | number; itemId: string | number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const result = await removeFromCartService(userId, itemId);

      if (!result.success) {
        await dispatch(fetchCart(userId));
        return rejectWithValue(result.message);
      }

      await dispatch(fetchCart(userId));
      return result;
    } catch (error: any) {
      await dispatch(fetchCart(userId));
      return rejectWithValue(error.message);
    }
  },
);

export const clearCartThunk = createAsyncThunk(
  'cart/clearCartOnServer',
  async (userId: string | number, { dispatch, rejectWithValue }) => {
    try {
      const result = await clearCartService(userId);

      if (!result.success) {
        return rejectWithValue(result.message);
      }

      dispatch(clearCart()); // Local clear
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const restoreSavedCart = createAsyncThunk(
  'cart/restoreSavedCart',
  async (userId: string | number, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const itemsToRestore = state.cart.savedCartItems;

      if (!itemsToRestore || itemsToRestore.length === 0) {
        // Just clear the current session item if any and end
        await clearCartService(userId);
        dispatch(clearCart());
        dispatch(endBuyNowSession());
        return { success: true };
      }

      // 1. Clear current Buy Now product from server
      await clearCartService(userId);

      // 2. Add saved items back in bulk
      const productData = itemsToRestore.map((item: any) => ({
        product_id: String(item.product_id),
        amount: parseInt(item.amount) || 1,
        ...(item.product_options && { product_options: item.product_options }),
      }));

      const result = await (addToCartService as any)(0, userId, 0, productData);

      if (!result.success) {
        return rejectWithValue(result.message);
      }

      // 3. Finalize
      dispatch(clearSavedCart());
      dispatch(endBuyNowSession());
      await dispatch(fetchCart(userId));

      return { success: true };
    } catch (error: any) {
      console.error('Restore cart error:', error);
      return rejectWithValue(error.message);
    }
  },
);


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCart: (
      state,
      action: PayloadAction<{
        cart_products: CartItem[];
        total: number;
        format_total: string;
      }>,
    ) => {
      state.cartItems = action.payload.cart_products;
      state.total = action.payload.total;
      state.format_total = action.payload.format_total;
      state.isLoading = false;
      state.error = null;
    },
    addGuestItem: (state, action: PayloadAction<CartItem>) => {
      if (!state.guestCartItems) {
        state.guestCartItems = [];
      }
      const existingItem = state.guestCartItems.find(
        item => item.product_id === action.payload.product_id,
      );
      if (existingItem) {
        existingItem.amount =
          Number(existingItem.amount || 0) + (action.payload.amount || 1);
      } else {
        state.guestCartItems.push({
          ...action.payload,
          amount: Number(action.payload.amount) || 1,
        });
      }

      const parsePrice = (p: any) => {
        if (typeof p === 'number') return p;
        if (typeof p === 'string') {
          return parseFloat(p.replace(/[^\d.-]/g, '')) || 0;
        }
        return 0;
      };

      const newTotal = state.guestCartItems.reduce(
        (acc, item) => acc + parsePrice(item.price) * Number(item.amount || 1),
        0,
      );
      state.total = newTotal;
      state.format_total = `€${newTotal.toFixed(2)}`;
      state.subtotal = newTotal;
      state.format_subtotal = `€${newTotal.toFixed(2)}`;
    },
    clearGuestCart: state => {
      state.guestCartItems = [];
      state.total = 0;
      state.format_total = '€0.00';
      state.subtotal = 0;
      state.format_subtotal = '€0.00';
    },
    removeGuestItem: (state, action: PayloadAction<string>) => {
      state.guestCartItems = state.guestCartItems.filter(
        item => item.product_id !== action.payload,
      );
      const parsePrice = (p: any) => {
        if (typeof p === 'number') return p;
        if (typeof p === 'string') {
          return parseFloat(p.replace(/[^\d.-]/g, '')) || 0;
        }
        return 0;
      };

      const newTotal = state.guestCartItems.reduce(
        (acc, item) => acc + parsePrice(item.price) * Number(item.amount || 1),
        0,
      );
      state.total = newTotal;
      state.format_total = `€${newTotal.toFixed(2)}`;
      state.subtotal = newTotal;
      state.format_subtotal = `€${newTotal.toFixed(2)}`;
    },
    updateGuestQuantity: (
      state,
      action: PayloadAction<{ productId: string; delta: number }>,
    ) => {
      const item = state.guestCartItems.find(
        i => i.product_id === action.payload.productId,
      );
      if (item) {
        item.amount = Math.max(
          1,
          Number(item.amount || 1) + action.payload.delta,
        );

        const parsePrice = (p: any) => {
          if (typeof p === 'number') return p;
          if (typeof p === 'string') {
            return parseFloat(p.replace(/[^\d.-]/g, '')) || 0;
          }
          return 0;
        };

        const newTotal = state.guestCartItems.reduce(
          (acc, i) => acc + parsePrice(i.price) * Number(i.amount || 1),
          0,
        );
        state.total = newTotal;
        state.format_total = `€${newTotal.toFixed(2)}`;
        state.subtotal = newTotal;
        state.format_subtotal = `€${newTotal.toFixed(2)}`;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearCart: state => {
      return {
        ...initialState,
        guestCartItems: state.guestCartItems || [],
        savedCartItems: state.savedCartItems || [], // Preserving saved items across regular clears
        isBuyNowSession: state.isBuyNowSession,
      };
    },
    startBuyNowSession: (state, action: PayloadAction<CartItem[]>) => {
      state.isBuyNowSession = true;
      state.savedCartItems = action.payload;
    },
    endBuyNowSession: state => {
      state.isBuyNowSession = false;
    },
    clearSavedCart: state => {
      state.savedCartItems = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.isLoading = true;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        const payload = action.payload || {};
        console.log('Cart Payload Keys:', Object.keys(payload));

        // Use payload.cart as the primary source if it exists
        const data = payload.cart || payload.data || payload;

        // Attempt to find products in various common keys
        const rawProducts =
          data.cart_products ||
          data.products ||
          data.product_data ||
          payload.cart_products ||
          payload.products ||
          payload.product_data ||
          (Array.isArray(data) ? data : null) ||
          [];

        const productsArray = Array.isArray(rawProducts)
          ? rawProducts
          : Object.values(rawProducts);

        console.log('Parsed Products Count:', productsArray.length);

        state.cartItems = productsArray.map((item: any) => ({
          ...item,
          product_id: String(item.product_id || item.id || ''),
          item_id: String(item.item_id || ''),
          amount: Number(item.amount) || 0,
        }));

        state.total = parseFloat(String(data.total || payload.total || 0)) || 0;
        state.format_total =
          data.format_total || payload.format_total || '€0.00';
        state.subtotal =
          parseFloat(String(data.subtotal || payload.subtotal || 0)) || 0;
        state.format_subtotal =
          data.format_subtotal || payload.format_subtotal || '€0.00';
        state.discount =
          parseFloat(String(data.discount || payload.discount || 0)) || 0;
        state.shipping_cost =
          parseFloat(
            String(data.shipping_cost || payload.shipping_cost || 0),
          ) || 0;
        state.format_shipping_cost =
          data.format_shipping_cost || payload.format_shipping_cost || '€0.00';
        state.user_data = data.user_data || payload.user_data || null;

        state.isLoading = false;
        state.error = null;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Optimistic Update for Adding Items
      .addCase(addItemToCart.pending, (state, action) => {
        const { productId, productDetails } = action.meta.arg;

        const existingItem = state.cartItems.find(
          item => String(item.product_id) === String(productId),
        );

        if (existingItem) {
          existingItem.amount = Number(existingItem.amount || 0) + 1;
        } else if (productDetails) {
          // Add as new item if details provided
          state.cartItems.push({
            product_id: String(productId),
            product: productDetails.title,
            amount: 1,
            price: productDetails.price,
            display_price: productDetails.display_price,
            main_pair: {
              detailed: {
                image_path: toHttps(productDetails.image),
              },
            },
          } as CartItem);
        }

        // Recalculate total
        const parsePrice = (p: any) => {
          if (typeof p === 'number') return p;
          if (typeof p === 'string') {
            return parseFloat(p.replace(/[^\d.-]/g, '')) || 0;
          }
          return 0;
        };

        const newTotal = state.cartItems.reduce(
          (acc, i) => acc + parsePrice(i.price) * Number(i.amount || 1),
          0,
        );
        state.subtotal = newTotal;
        state.format_subtotal = `€${newTotal.toFixed(2)}`;
        state.total = newTotal;
        state.format_total = `€${newTotal.toFixed(2)}`;
      })
      // Optimistic Update for Quantity
      .addCase(updateCartQuantityThunk.pending, (state, action) => {
        const { productId, delta } = action.meta.arg;
        const item = state.cartItems.find(
          i => String(i.product_id) === String(productId),
        );
        if (item) {
          item.amount = Math.max(1, Number(item.amount || 1) + delta);
          // Recalculate total optimistically
          const parsePrice = (p: any) => {
            if (typeof p === 'number') return p;
            if (typeof p === 'string') {
              return parseFloat(p.replace(/[^\d.-]/g, '')) || 0;
            }
            return 0;
          };

          const newTotal = state.cartItems.reduce(
            (acc, i) => acc + parsePrice(i.price) * Number(i.amount || 1),
            0,
          );
          state.subtotal = newTotal;
          state.format_subtotal = `€${newTotal.toFixed(2)}`;
          state.total = newTotal;
          state.format_total = `€${newTotal.toFixed(2)}`;
        }
      })
      .addCase(updateCartQuantityThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Optimistic Update for Removal
      .addCase(removeItemFromCart.pending, (state, action) => {
        const { itemId } = action.meta.arg;
        state.cartItems = state.cartItems.filter(
          i => String(i.item_id) !== String(itemId),
        );
        // Recalculate total optimistically
        const parsePrice = (p: any) => {
          if (typeof p === 'number') return p;
          if (typeof p === 'string') {
            return parseFloat(p.replace(/[^\d.-]/g, '')) || 0;
          }
          return 0;
        };

        const newTotal = state.cartItems.reduce(
          (acc, i) => acc + parsePrice(i.price) * Number(i.amount || 1),
          0,
        );
        state.subtotal = newTotal;
        state.format_subtotal = `€${newTotal.toFixed(2)}`;
        state.total = newTotal;
        state.format_total = `€${newTotal.toFixed(2)}`;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  setLoading,
  setCart,
  addGuestItem,
  clearGuestCart,
  removeGuestItem,
  updateGuestQuantity,
  setError,
  clearCart,
  startBuyNowSession,
  endBuyNowSession,
  clearSavedCart,
} = cartSlice.actions;
export default cartSlice.reducer;
