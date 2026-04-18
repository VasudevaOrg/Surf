import axios from 'axios';
import { API_ENDPOINTS } from '../config/ApiConfig';
import { mapApiError } from '../utils/ErrorUtils';

export const addToWishlist = async (
  userId: string | number,
  productId: string | number,
  amount: number = 1,
) => {
  try {
    const response = await axios.post(API_ENDPOINTS.WISHLIST(userId), {
      user_id: String(userId),
      product_data: [
        {
          product_id: String(productId),
          amount: amount,
        },
      ],
    });

    return {
      success: response.data.result,
      message:
        response.data.message ||
        (response.data.result
          ? 'Product added to wishlist'
          : 'Failed to add to wishlist'),
    };
  } catch (error: any) {
    console.error('Error adding to wishlist:', error);
    const errorMessage =
      error.response?.data?.message || 'Something went wrong';
    return { success: false, message: mapApiError(errorMessage) };
  }
};
export const removeFromWishlist = async (
  userId: string | number,
  cartId: string | number,
) => {
  try {
    const response = await axios.post(API_ENDPOINTS.WISHLIST(userId), {
      user_id: String(userId),
      remove_from_wishlist: 'Y',
      cart_id: cartId,
    });

    return {
      success: response.data.result,
      message:
        response.data.message ||
        (response.data.result
          ? 'Product removed from wishlist'
          : 'Failed to remove from wishlist'),
    };
  } catch (error: any) {
    console.error('Error removing from wishlist:', error);
    const errorMessage =
      error.response?.data?.message || 'Something went wrong';
    return { success: false, message: mapApiError(errorMessage) };
  }
};

export const getWishlist = async (userId: string | number) => {
  try {
    const response = await axios.get(API_ENDPOINTS.WISHLIST(userId));
    return {
      success: true,
      products: response.data.products || [],
    };
  } catch (error: any) {
    console.error('Error fetching wishlist:', error);
    return { success: false, products: [] };
  }
};
