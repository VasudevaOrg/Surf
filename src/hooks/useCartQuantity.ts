import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  updateGuestQuantity,
  updateCartQuantityThunk,
  removeItemFromCart,
  removeGuestItem,
} from '../store/slices/cartSlice';
import {Alert} from 'react-native';

/**
 * A custom hook to efficiently get and manage the quantity of a specific product in the cart.
 * This hook is optimized to only trigger re-renders when the quantity of the specific product changes.
 *
 * @param productId - The unique ID of the product
 * @returns An object containing the current quantity and convenience functions for updates
 */
export const useCartQuantity = (productId: string | number | undefined) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Memoize the selector to ensure we only re-render if THIS product's quantity changes
  // We use string conversion to ensure consistent comparison
  const quantity = useSelector((state: RootState) => {
    if (!productId) return 0;
    const items = userId ? state.cart.cartItems : state.cart.guestCartItems;
    const item = items.find(i => String(i.product_id) === String(productId));
    return item ? item.amount || 0 : 0;
  });

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const increment = useMemo(
    () => () => {
      if (!productId) return;
      if (userId) {
        (dispatch as any)(
          updateCartQuantityThunk({userId, productId, delta: 1}),
        )
          .unwrap()
          .catch((err: any) =>
            Alert.alert('Error', err?.message || String(err)),
          );
      } else {
        dispatch(updateGuestQuantity({productId: String(productId), delta: 1}));
      }
    },
    [dispatch, userId, productId],
  );

  const decrement = useMemo(
    () => () => {
      if (!productId) return;

      if (quantity === 1) {
        if (userId) {
          const item = cartItems.find(
            i => String(i.product_id) === String(productId),
          );
          if (item && item.item_id) {
            (dispatch as any)(
              removeItemFromCart({userId, itemId: item.item_id}),
            )
              .unwrap()
              .catch((err: any) =>
                Alert.alert('Error', err?.message || String(err)),
              );
          }
        } else {
          dispatch(removeGuestItem(String(productId)));
        }
        return;
      }

      if (userId) {
        (dispatch as any)(
          updateCartQuantityThunk({userId, productId, delta: -1}),
        )
          .unwrap()
          .catch((err: any) =>
            Alert.alert('Error', err?.message || String(err)),
          );
      } else {
        dispatch(
          updateGuestQuantity({productId: String(productId), delta: -1}),
        );
      }
    },
    [dispatch, userId, productId, quantity, cartItems],
  );

  const remove = useMemo(
    () => () => {
      if (!productId) return;
      if (userId) {
        const item = cartItems.find(
          i => String(i.product_id) === String(productId),
        );
        if (item && item.item_id) {
          (dispatch as any)(removeItemFromCart({userId, itemId: item.item_id}))
            .unwrap()
            .catch((err: any) =>
              Alert.alert('Error', err?.message || String(err)),
            );
        }
      } else {
        dispatch(removeGuestItem(String(productId)));
      }
    },
    [dispatch, userId, productId, cartItems],
  );

  return {
    quantity,
    increment,
    decrement,
    remove,
    userId,
  };
};
