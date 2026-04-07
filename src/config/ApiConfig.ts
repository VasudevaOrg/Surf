//export const BASE_URL = 'http://192.168.31.196:3000';
export const BASE_URL = 'https://surf.mt';
export const SURF_MT_BASE_URL = 'https://surf.mt';

export const GEMINI_API_KEY = 'AIzaSyB-NgfeF_5MA_RRH2otef_X0-KeUOB2f8c';
const GEMINI_MODEL = 'gemini-flash-latest';
export const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export const API_ENDPOINTS = {
  HOME_LAYOUT: (
    imageWidth: number,
    userId?: string | number,
    categoryId?: string | number,
  ) =>
    `${BASE_URL}/api/layout/home-layout?image_width=${imageWidth}&user_id=${userId || ''
    }${categoryId ? `&category_id=${categoryId}` : ''}`,
  ORDERS: (userId: string | number) =>
    `${BASE_URL}/api/orders?user_id=${userId}`,
  ORDER_DETAILS: (orderId: string | number, userId: string | number) =>
    `${BASE_URL}/api/orders/${orderId}?user_id=${userId}`,
  LOGIN_EMAIL: `${BASE_URL}/api/auth/login-email`,
  CATEGORIES: `${BASE_URL}/api/categories`,
  BRANDS: `${BASE_URL}/api/brands`,
  VENDORS: `${BASE_URL}/api/vendors`,
  VENDOR_DETAILS: `${BASE_URL}/api/vendors`, // Supports /:id
  PRODUCTS_BY_COMPANY: (companyId: string | number, userId: string | number) =>
    `${BASE_URL}/api/products?company_id=${companyId}&user_id=${userId}`,
  PRODUCTS_BY_BRAND: (variantId: string | number, userId: string | number) =>
    `${BASE_URL}/api/products?variant_id=${variantId}&user_id=${userId}`,
  SEARCH_PRODUCTS: (
    query: string,
    userId: string | number,
    page: number = 1,
    items_per_page: number = 20,
    nt_see_more_action?: string,
  ) =>
    `${BASE_URL}/api/products?q=${encodeURIComponent(
      query,
    )}&user_id=${userId}&page=${page}&items_per_page=${items_per_page}${nt_see_more_action ? `&nt_see_more_action=${nt_see_more_action}` : ''
    }`,
  FILTERS: (userId: string | number) =>
    `${BASE_URL}/api/filters?user_id=${userId}&image_width=20`,
  USER_PROFILE: (id: string) => `${BASE_URL}/api/user/profile/${id}`,
  USER_CART: (id: string) => `${BASE_URL}/api/user/cart?user_id=${id}`,
  WISHLIST: (userId: string | number) =>
    `${BASE_URL}/api/wishlist?user_id=${userId}`,
  ADD_TO_CART: `${BASE_URL}/api/cart/add`,
  REMOVE_FROM_CART: (userId: string | number) =>
    `${BASE_URL}/api/cart/remove/${userId}`,
  CLEAR_CART: (userId: string | number) =>
    `${BASE_URL}/api/cart/clear/${userId}`,
  CREATE_USER: `${BASE_URL}/api/user/create`,
  UPDATE_USER: (userId: string | number) =>
    `${BASE_URL}/api/user/update/${userId}`,
  VERIFY_OTP: `${BASE_URL}/api/auth/verify-otp`,
  GET_MAP_KEY: `${BASE_URL}/api/config/maps-key`,
  GET_NOTIFICATIONS: (userId: string | number) =>
    `${BASE_URL}/api/notifications/${userId}`,
  NOTIFICATION_ACTION: `${BASE_URL}/api/notifications/action`,
  SEARCH_SUGGESTIONS: (keyword: string, items_per_page: number = 10) =>
    `${BASE_URL}/api/products/suggestions?keyword=${encodeURIComponent(
      keyword,
    )}&items_per_page=${items_per_page}`,
  PRODUCT_DETAILS: (productId: string | number, userId: string | number) =>
    `${BASE_URL}/api/products/${productId}?user_id=${userId}&image_width=600`,
  REVIEWS: (productId: string | number, userId: string | number) =>
    `${BASE_URL}/api/reviews?object_id=${productId}&object_type=P&user_id=${userId}&image_width=200`,
  DELETE_PROFILE: (id: string) => `${BASE_URL}/api/user/profile/${id}`,
  NT_GOOGLE_USER_API: `${BASE_URL}/api/user/google-user`,
  NT_CART_API: (userId: string | number) =>
    `${BASE_URL}/api/user/cart?user_id=${userId}`,
  NT_USERS_ACCOUNT_API: (userId: string | number) =>
    `${SURF_MT_BASE_URL}/api/2.0/NtUsersAccountApi/${userId}`,
  CHECKOUT: (userId: string | number) =>
    `${BASE_URL}/api/checkout?user_id=${userId}`,
  NT_CHECKOUT_API: (
    userId: string | number,
    shippingIds?: string | number,
    couponCode?: string,
  ) =>
    `${BASE_URL}/api/checkout/?user_id=${userId}${shippingIds ? `&shipping_ids=${shippingIds}` : ''
    }${couponCode ? `&coupon_code=${couponCode}` : ''}`,
  NT_PLACE_ORDER: `${BASE_URL}/api/checkout`,
  NT_SOLAR_CONNECTOR_API: `${SURF_MT_BASE_URL}/api/2.0/NtSolarConnectorApi`,
  CHATBOT: `${BASE_URL}/api/chatbot`,
  NT_OTP_LOGIN_API: `${BASE_URL}/api/auth/whatsapp/login`,
  NT_OTP_VERIFY_API: `${BASE_URL}/api/auth/whatsapp/verify`,
  NT_SIGNUP_API: `${BASE_URL}/api/auth/signup`,
  NT_OTP_REG_API: `${BASE_URL}/api/auth/whatsapp/signup-otp`,
  NT_OTP_VERIFY_API_V2: `${BASE_URL}/api/auth/whatsapp/verify`,
  NT_SIGNUP_API_V2: `${BASE_URL}/api/auth/signup`,
  NT_OTP_REG_EMAIL_API: `${BASE_URL}/api/auth/email/signup-otp`,
  NT_OTP_VERIFY_EMAIL_API: (id: string | number) =>
    `${BASE_URL}/api/auth/email/verify`,
};

export const AUTH_HEADER =
  'Basic YWRtaW5Ac3VyZi5tdDpSMlZXbjE2N1VaUFc2Y3VLNDEwMWdCMTM2UTk0UFQ2SA==';
