export const ToastMessages = {
  CommonToastMessages: {
    loginToAddWishlist: 'Please login to add items to your wishlist.',
    fillRequiredFields: 'Please fill required fields',
    itemAddedGuestCart: 'Item added to guest cart',
    itemAddedToCart: 'Item added to cart',
    addToCartFailed: (message?: string) => message || 'Failed to add to cart',
    removeFromWishlistFailed: (message?: string) =>
      message || 'Failed to remove from wishlist',
    addToWishlistFailed: (message?: string) => message || 'Error',
    saveAddressFailed: 'Failed to save address',
    reviewSubmitted: 'Review submitted successfully!',
    unexpectedError: 'An unexpected error occurred. Please try again.',
  },

  OTPScreen: {
    resendingOtp: 'Resending verification code...',
    otpResent: 'Verification code resent!',
    otpResendFailed: (message?: string) => message || 'Failed to resend OTP',
    verifyingOtp: 'Verifying OTP...',
    otpVerified: 'OTP verified successfully!',
  },

  WhatsAppAndEmailLogInScreen: {
    sendingWhatsappOtp: 'Sending verification code via WhatsApp...',
    OtpSent: (time: string) => `Verification code sent at ${time}`,
    sendingEmailOtp: 'Sending verification code via email...',
  },

  CreateNewAccountScreen: {
    fillAllFields: 'Please fill in all fields',
    otpFailed: (message?: string) => message || 'Failed to send OTP',
    signupFailed: (message?: string) => message || 'Failed to initiate signup',
  },

  RateOrderScreen: {
    failedToSubmitReview: (message?: string) =>
      message || 'Failed to submit review. Please try again.',
    loginRequired: 'Please login to submit a review.',
    ratingRequired: 'Please select a rating before saving.',
  },

  WishListScreen: {
    addedToCart: (message?: string) => message || 'Added to cart',
    removeFailed: (message?: string) => message || 'Error',
  },

  ProductDetailScreen: {
    wishlistSuccess: (message?: string) => message || 'Success',
    wishlistFailed: (message?: string) => message || 'Error',
    addToCartSuccess: (message?: string) => message || 'Item added to cart',
    failedToGetProductDetails:
      'Failed to fetch product details. Please try again.',
  },

  NewAddressScreen: {
    loginToSaveAddress: 'Please login to save address',
    addressSaved: 'Address saved',
    addressUpdated: 'Address updated',
  },

  NotificationScreen: {
    failedToMarkNotificationsAsRead: 'Failed to mark notifications as read',
    failedToDeleteNotifications: 'Failed to delete notifications',
  },

  CartScreen: {
    updateQuantityError: (message?: string) =>
      message || 'Failed to update cart quantity',
    removeItemError: (message?: string) =>
      message || 'Failed to remove item from cart',
    failedToPlaceOrderError: (message?: string) =>
      message || 'Failed to place order',
    userIdNotFound: 'User ID not found',
    missingShippingOrPayment: 'Please select shipping and payment methods.',
    selectAddressRequired: 'Please select a dispatching address to continue.',
    selectPaymentRequired: 'Please select a payment method to continue.',
    minOrderValueRequired: (min: string) =>
      `Subtotal must be at least €${min} to continue.`,
  },

  PersonalInfoScreen: {
    deleteAccountFailed: (message?: string) =>
      message || 'Failed to delete account',
    deleteAccountError: 'An error occurred while deleting your account.',
  },

  SupportChoiceModal: {
    supportEmailNotAvailable: 'Support email is not available',
    couldNotOpenMailApp: 'Could not open mail app',
    whatsappNotAvailable: 'WhatsApp number is not available',
    whatsappNotInstalled: 'WhatsApp is not installed on your device',
  },

  ProductCardScreen: {
    updateQuantityError: (message?: string) =>
      message || 'Failed to update cart quantity',
    removeItemError: (message?: string) =>
      message || 'Failed to remove item from cart',
  },
};
