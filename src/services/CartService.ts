import axios from 'axios';
import { API_ENDPOINTS, AUTH_HEADER } from '../config/ApiConfig';
import { mapApiError } from '../utils/ErrorUtils';

export const addToCart = async (
  productId: string | number,
  userId: string | number,
  amount: number = 1,
  productData?: any[],
) => {
  try {
    const url = API_ENDPOINTS.ADD_TO_CART;

    // Use provided productData (array) or default to the single item
    const normalizedProductData =
      productData && Array.isArray(productData)
        ? productData
        : [
          {
            product_id: String(productId),
            amount: amount,
          },
        ];

    const payload = {
      user_id: parseInt(String(userId), 10),
      product_data: normalizedProductData,
    };

    console.log('--- API Triggered: addToCart ---');
    console.log('URL:', url);
    console.log('Method: POST');
    console.log('Headers:', {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/json',
    });
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Add to cart error:', error);
    return {
      success: false,
      message: mapApiError(
        error.response?.data?.message ||
        error.message ||
        'Failed to add item to cart',
      ),
    };
  }
};

export const getCart = async (userId: string | number) => {
  try {
    const url = API_ENDPOINTS.NT_CART_API(userId);
    console.log('--- API Triggered: getCart ---');
    console.log('URL:', url);
    console.log('Method: GET');
    console.log('Headers:', { Authorization: AUTH_HEADER });

    const response = await axios.get(url, {
      headers: {
        Authorization: AUTH_HEADER,
      },
    });
    if (response.data) {
      return {
        success: true,
        cart: response.data,
      };
    }
    return { success: false, message: 'No data returned' };
  } catch (error: any) {
    console.error('Get cart error:', error);
    return {
      success: false,
      message: mapApiError(error.message || 'Failed to fetch cart'),
    };
  }
};

export const updateCartQuantity = async (
  userId: string | number,
  productId: string | number,
  delta: number,
  productData?: any[],
) => {
  try {
    const url = API_ENDPOINTS.ADD_TO_CART; // Update also uses the add endpoint

    const payload = {
      user_id: parseInt(String(userId), 10),
      product_data: productData || [],
    };

    console.log('--- API Triggered: updateCartQuantity ---');
    console.log('URL:', url);
    console.log('Method: POST');
    console.log('Headers:', {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/json',
    });
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Update cart quantity error:', error);
    return { success: false, message: mapApiError(error.message) };
  }
};

export const removeFromCart = async (
  userId: string | number,
  itemId: string | number,
) => {
  try {
    const url = API_ENDPOINTS.REMOVE_FROM_CART(userId);
    const payload = {
      delete_item_in_cart: 1,
      item_id: parseInt(String(itemId), 10),
      user_id: parseInt(String(userId), 10),
    };

    console.log('--- API Triggered: removeFromCart ---');
    console.log('URL:', url);
    console.log('Method: PUT');
    console.log('Headers:', {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/json',
    });
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await axios.put(url, payload, {
      headers: {
        Authorization: AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Remove from cart error:', error);
    return { success: false, message: mapApiError(error.message) };
  }
};

export const clearCart = async (userId: string | number) => {
  try {
    const url = API_ENDPOINTS.CLEAR_CART(userId);
    const payload = {
      user_id: parseInt(String(userId), 10),
    };

    console.log('--- API Triggered: clearCart ---');
    console.log('URL:', url);
    console.log('Method: DELETE');
    console.log('Headers:', {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/json',
    });
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await axios.delete(url, {
      data: payload,
      headers: {
        Authorization: AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Clear cart error:', error);
    return { success: false, message: mapApiError(error.message) };
  }
};

export const getCheckoutData = async (
  userId: string | number,
  shippingIds?: string | number,
  buyNowProductId?: string | number,
  couponCode?: string,
) => {
  try {
    const url = API_ENDPOINTS.NT_CHECKOUT_API(userId, shippingIds, couponCode);
    // Append buy_now_product_id if present
    const finalUrl = buyNowProductId
      ? `${url}${url.includes('?') ? '&' : '?'
      }buy_now_product_id=${buyNowProductId}`
      : url;
    console.log('Calling Checkout API:', finalUrl);

    const response = await axios.get(finalUrl, {
      headers: {
        Authorization: AUTH_HEADER,
      },
    });

    console.log('--- API Triggered: getCheckoutData ---');
    console.log('URL:', finalUrl);
    console.log('Method: GET');
    console.log('Headers:', { Authorization: AUTH_HEADER });

    if (response.data) {
      console.log(
        'Response Data (First 500 chars):',
        JSON.stringify(response.data).substring(0, 500),
      );
      return {
        success: true,
        data: response.data,
      };
    }
    return { success: false, message: 'No data returned' };
  } catch (error: any) {
    console.error('Get checkout data error:', error);
    return {
      success: false,
      message: mapApiError(error.message || 'Failed to fetch checkout data'),
    };
  }
};

export const placeOrder = async (
  userId: string | number,
  shippingId: string | number,
  paymentId: string | number,
  showProfilesOnCheckout: boolean = true,
  buyNowProductId?: string | number,
  couponCodeObj?: any,
  ntPaymentType?: string,
) => {
  try {
    const url = API_ENDPOINTS.NT_PLACE_ORDER;
    const payload: any = {
      user_id: parseInt(String(userId), 10),
      shipping_ids: parseInt(String(shippingId), 10),
      selected_payment_method: parseInt(String(paymentId), 10),
      show_profiles_on_checkout: showProfilesOnCheckout,
    };

    if (buyNowProductId) {
      payload.buy_now_product_id = parseInt(String(buyNowProductId), 10);
    }
    if (couponCodeObj) {
      payload.coupon_code = couponCodeObj;
    }
    if (ntPaymentType) {
      payload.nt_payment_type = ntPaymentType;
    }

    console.log('--- API Triggered: placeOrder ---');
    console.log('URL:', url);
    console.log('Method: POST');
    console.log('Headers:', {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/json',
    });
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    });

    if (response.data) {
      console.log(
        'Place Order API Response:',
        JSON.stringify(response.data, null, 2),
      );
      return {
        success: true,
        data: response.data,
      };
    }
    return { success: false, message: 'No data returned' };
  } catch (error: any) {
    console.error('Place order error:', error);
    return {
      success: false,
      message: mapApiError(error.message || 'Failed to place order'),
    };
  }
};

export const syncGuestCart = async (
  userId: string | number,
  guestCartItems: any[],
) => {
  try {
    console.log('Syncing guest cart items:', guestCartItems);
    // Reuse addToCart which supports bulk addition via productData
    // Passing 0/0 for productId/amount as they are ignored when productData is present
    return await addToCart(0, userId, 0, guestCartItems);
  } catch (error: any) {
    console.error('Sync guest cart error:', error);
    return {
      success: false,
      message: mapApiError(error.message || 'Failed to sync guest cart'),
    };
  }
};
