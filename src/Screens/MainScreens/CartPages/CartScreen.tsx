import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  Linking,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import { goBack, navigate } from '../../../utils/navigationref';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CartScreen.styles';
import { Header } from '../../../components/CustomComponents/Header/Header';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeft';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { Button } from '../../../components/MainComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/MainComponents/Button';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TextButton } from '../../../components/MainComponents/TextButton';
import { BorderRadius, Spacing } from '../../../config/globalStyles';
import CartStep from './ProgressStepperPages/CartStepPages/CartStep';
import AddressStep from './ProgressStepperPages/AddressStepPages/AddressStep';
import PaymentStep from './ProgressStepperPages/PaymentPages/PaymentStep';
import SummaryStep from './ProgressStepperPages/SummaryStepPages/SummaryStep';
import ProgressStepper from './ProgressStepperPages/ProgressStepper';
import PaymentWebView from '../../../components/CustomComponents/CartComponents/PaymentWebView';
import { getCheckoutData, placeOrder } from '../../../services/CartService';
import { API_ENDPOINTS, AUTH_HEADER } from '../../../config/ApiConfig';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import {
  setCart,
  setLoading,
  setError,
  removeGuestItem,
  updateGuestQuantity,
  updateCartQuantityThunk,
  removeItemFromCart,
  clearCart,
  restoreSavedCart,
  endBuyNowSession,
} from '../../../store/slices/cartSlice';
import { Alert } from 'react-native';
import ScreenWrapper from '../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import EmptyComponent from '../../../components/CustomComponents/EmptyComponent';
import { ToastMessages } from '../../../components/MainComponents/Toast/ToastMessages';
import { showToast } from '../../../components/MainComponents/Toast/ToastHelper';

const STEPS = [
  { id: 1, label: 'Cart' },
  { id: 2, label: 'Address' },
  { id: 3, label: 'Payment' },
  { id: 4, label: 'Summary' },
];

const CONVENIENCE_FEE = 0.99;

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch() as any;
  const userId = useSelector((state: RootState) => state.auth.userId);
  const {
    cartItems = [],
    guestCartItems = [],
    total = 0,
    format_total = '€0.00',
    subtotal = 0,
    format_subtotal = '€0.00',
    discount = 0,
    shipping_cost = 0,
    format_shipping_cost = '€0.00',
    user_data = null,
    isLoading = false,
  } = useSelector((state: RootState) => state.cart);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
  const isBuyNowSession = useSelector(
    (state: RootState) => state.cart.isBuyNowSession,
  );
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Checkout Data State (Lifted from PaymentStep)
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isFetchingCheckout, setIsFetchingCheckout] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [cancelUrl, setCancelUrl] = useState<string | null>(null);
  const [failUrl, setFailUrl] = useState<string | null>(null);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<any>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  // Buy Now Mode State
  const [isBuyNowMode, setIsBuyNowMode] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null);
  const [apiNotifications, setApiNotifications] = useState<any[]>([]);

  // Debug Logging removed for stability

  React.useEffect(() => {
    if (route.params?.initialStep) {
      setCurrentStep(route.params.initialStep);

      if (route.params?.isBuyNow && route.params?.buyNowProduct) {
        setIsBuyNowMode(true);
        setBuyNowProduct(route.params.buyNowProduct);
      } else {
        setIsBuyNowMode(false);
        setBuyNowProduct(null);
      }

      // DO NOT clear params immediately if they are needed for guards in other effects
      // We will clear them in a separate cleanup or just let them be for this visit
    }
  }, [route.params?.initialStep, route.params?.isBuyNow, route.params?.buyNowProduct]);

  // Combined reset function for consistency (UI ONLY)
  const resetCheckoutUI = useCallback(() => {
    setCheckoutData(null);
    setSelectedShippingMethod(null);
    setSelectedPaymentMethod(null);
    setSelectedAddress(null);
    setCouponCode('');
    setApiNotifications([]);
  }, []);

  // Dedicated restoration helper
  const performCartRestoration = useCallback(async () => {
    if (isBuyNowSession && userId) {
      await dispatch(restoreSavedCart(userId));
    }
  }, [isBuyNowSession, userId, dispatch]);

  const displayItems = React.useMemo(() => {
    return isBuyNowMode
      ? [buyNowProduct].filter(Boolean)
      : (userId ? cartItems : guestCartItems) || [];
  }, [isBuyNowMode, buyNowProduct, userId, cartItems, guestCartItems]);
  const displayTotal = isBuyNowMode ? buyNowProduct?.price : total;
  const displayFormatTotal = isBuyNowMode
    ? buyNowProduct?.display_price
    : format_total;
  const displaySubtotal = isBuyNowMode ? buyNowProduct?.price : subtotal;
  const displayFormatSubtotal = isBuyNowMode
    ? buyNowProduct?.display_price
    : format_subtotal;

  const computedTotals = React.useMemo(() => {
    // We manually calculate for reactivity, but use API values as base when available
    const apiCart = checkoutData?.cart;

    const sub = apiCart
      ? parseFloat(apiCart.subtotal || 0)
      : parseFloat(displaySubtotal || 0);

    // Ensure discount is always absolute positive for display logic
    const disc = Math.abs(
      apiCart
        ? parseFloat(apiCart.subtotal_discount || apiCart.discount || 0)
        : discount,
    );

    const tax = apiCart ? parseFloat(apiCart.tax || 0) : 0;

    const ship = selectedShippingMethod
      ? parseFloat(selectedShippingMethod.rate || 0)
      : apiCart
        ? parseFloat(apiCart.shipping_cost || 0)
        : 0;

    const effectiveFee = currentStep >= 3 ? CONVENIENCE_FEE : 0;
    const effectiveShip = currentStep >= 2 ? ship : 0;

    // Total = Subtotal (after discount) + Fee + Shipping
    // If 'sub' already includes discount, then don't subtract 'disc' again.
    // However, if the API returns 'subtotal' as original, we subtract.
    // Most APIs in this project return 'subtotal' as discounted price.
    // Let's assume 'sub' is the final subtotal from API.
    const totalWithFee = sub + effectiveFee + effectiveShip;

    // The format_total coming from the API includes everything (shipping + subtotal).
    // We want to format the dynamic `totalWithFee` instead of using the static API `format_total`
    // so it perfectly matches the displayed step-by-step numbers.
    const userFormatTotal = `€${totalWithFee.toFixed(2)}`;

    return {
      subtotal: sub,
      shipping: ship,
      discount: disc,
      tax: tax,
      fee: CONVENIENCE_FEE,
      total: totalWithFee,
      format_subtotal: apiCart?.format_subtotal || `€${sub.toFixed(2)}`,
      format_shipping: (() => {
        const rate =
          selectedShippingMethod?.rate || apiCart?.shipping_cost || 0;
        const num = parseFloat(rate);
        if (isNaN(num)) return rate;
        return `€${num.toFixed(2)}`;
      })(),
      format_discount:
        apiCart?.format_subtotal_discount ||
        apiCart?.format_discount ||
        `-€${disc.toFixed(2)}`,
      format_tax: apiCart?.format_tax || `€${tax.toFixed(2)}`,
      format_fee: `€${effectiveFee.toFixed(2)}`,
      format_total: userFormatTotal,
    };
  }, [
    displaySubtotal,
    currentStep,
    selectedShippingMethod,
    checkoutData,
    discount,
  ]);

  // console.log('displayItems', displayItems);

  const fetchCartData = useCallback(async () => {
    if (!userId) return;
    dispatch(fetchCart(userId))
      .unwrap()
      .catch((err: any) => {
        console.log(
          'Error fetching cart:',
          err?.message || JSON.stringify(err),
        );
      });
  }, [userId, dispatch]);

  const fetchCheckoutData = useCallback(
    async (shippingId?: string | number, appliedCode?: string) => {
      if (!userId) return;
      try {
        setIsFetchingCheckout(true);
        console.log('Fetching checkout data (lifted):', userId, shippingId);
        const currentShippingId =
          shippingId || selectedShippingMethod?.shipping_id;

        const codeToUse = appliedCode !== undefined ? appliedCode : couponCode;

        const result = await getCheckoutData(
          userId,
          currentShippingId,
          isBuyNowMode ? buyNowProduct?.product_id : undefined,
          codeToUse,
        );

        console.log('--- Checkout API Result ---');
        console.log('Success:', result.success);
        if (result.success) {
          const data = result.data;
          console.log('Cart Subtotal:', data?.cart?.subtotal);
          console.log(
            'Cart Discount:',
            data?.cart?.subtotal_discount || data?.cart?.discount,
          );
          console.log(
            'Notifications:',
            JSON.stringify(data?.notifications, null, 2),
          );

          setCheckoutData(data);

          // Handle API notifications - broaden the check
          let allNotifications: any[] = [];
          if (data.notifications) {
            allNotifications = Object.values(data.notifications);
          }
          // Also check cart level notifications if they exist
          if (data.cart?.notifications) {
            allNotifications = [
              ...allNotifications,
              ...Object.values(data.cart.notifications),
            ];
          }

          const filtered = allNotifications.filter(
            (n: any) =>
              n.type === 'W' ||
              n.type === 'E' ||
              n.type === 'I' ||
              n.type === 'N',
          );

          // Handle top-level API message (often used for MOV)
          if (data.message && data.result === false) {
            const alreadyExists = filtered.some(
              n => n.message === data.message,
            );
            if (!alreadyExists) {
              filtered.push({
                type: 'E', // Treat top-level failure as Error
                message: data.message,
              });
            }
          }

          // Manual fallback for MOV if not provided by API but condition is met
          const sub = parseFloat(data?.cart?.subtotal || displaySubtotal || 0);
          if (
            sub > 0 &&
            sub < 20 &&
            !isBuyNowMode &&
            !filtered.some(n => n.message.includes('20'))
          ) {
            filtered.push({
              type: 'W',
              message:
                'Minimum order value is €20.00. Please add more items to proceed.',
            });
          }

          console.log('Filtered Notifications for Display:', filtered.length);
          setApiNotifications(filtered);

          // Auto-select defaults logic
          if (data.product_groups?.[0]?.selected_shipping_id) {
            const defaultShipping = data.product_groups[0].shippings.find(
              (s: any) =>
                s.shipping_id === data.product_groups[0].selected_shipping_id,
            );
            if (defaultShipping && !selectedShippingMethod) {
              setSelectedShippingMethod(defaultShipping);
            }
          }
          if (data.payment_info?.payment_id) {
            const defaultPayment = data.payment_methods?.find(
              (p: any) => p.payment_id === data.payment_info.payment_id,
            );
            if (defaultPayment && !selectedPaymentMethod) {
              setSelectedPaymentMethod(defaultPayment);
            } else if (!selectedPaymentMethod) {
              setSelectedPaymentMethod({
                payment_id: data.payment_info.payment_id,
              });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching checkout data', error);
      } finally {
        setIsFetchingCheckout(false);
      }
    },
    [
      userId,
      selectedShippingMethod,
      selectedPaymentMethod,
      isBuyNowMode,
      buyNowProduct,
      couponCode,
      displaySubtotal,
    ],
  );

  // Reset to Step 1 on focus if not in Buy Now mode and no initialStep was just provided
  useFocusEffect(
    useCallback(() => {
      fetchCartData();

      const arrivingViaBuyNow = !!route.params?.isBuyNow;

      // If we are arriving "normally" (no Buy Now params) but there's an active session in Redux,
      // it means we are cleaning up from a previous abandoned Buy Now flow.
      if (!arrivingViaBuyNow && !isBuyNowMode && isBuyNowSession && userId) {
        performCartRestoration();
      }

      // Standard UI reset
      if (!arrivingViaBuyNow && !isBuyNowMode) {
        setCurrentStep(prev => {
          if (prev > 1) {
            resetCheckoutUI();
            return 1;
          }
          return prev;
        });
      }
    }, [
      fetchCartData,
      route.params?.isBuyNow,
      isBuyNowMode,
      isBuyNowSession,
      userId,
      resetCheckoutUI,
      performCartRestoration,
    ]),
  );

  // Also reset to Step 1 if the cart items change (e.g. added a new product from Home)
  React.useEffect(() => {
    // GUARD: If we are currently in or entering Buy Now mode, don't trigger generic reset.
    // This prevents the race condition during the "Clear -> Add -> Navigate" orchestration.
    if (isBuyNowMode || route.params?.isBuyNow) return;

    if (currentStep > 1) {
      setCurrentStep(1);
    }
    resetCheckoutUI();
  }, [
    cartItems.length,
    guestCartItems.length,
    isBuyNowMode,
    route.params?.isBuyNow,
    resetCheckoutUI,
  ]);

  // Fetch checkout data when entering appropriate steps or when required
  React.useEffect(() => {
    if (currentStep >= 2 && userId) {
      // Address, Payment or Summary Step
      fetchCheckoutData();
    }
  }, [currentStep, userId]); // Dependencies to trigger fetch

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCartData();
    setRefreshing(false);
  }, [fetchCartData]);

  const getHeaderTitle = () => {
    switch (currentStep) {
      case 1:
        return 'My Cart';
      case 2:
        return 'Select Delivery Address';
      case 3:
        return 'Payment Method';
      case 4:
        return 'Summary';
      default:
        return 'My Cart';
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !userId) {
      navigate('Authentication', {
        screen: 'WhatsAppAndEmailLogInScreen',
        params: { returnTo: 'Cart' },
      });
      return;
    }

    if (currentStep === 2 && !selectedAddress) {
      showToast(ToastMessages.CartScreen.selectAddressRequired, 'error');

      return;
    }

    if (currentStep === 3 && !selectedPaymentMethod) {
      showToast(ToastMessages.CartScreen.selectPaymentRequired, 'error');

      return;
    }

    if (currentStep < STEPS.length) {
      const nextStep = currentStep + 1;
      if (nextStep >= 2 && !checkoutData) {
        setIsFetchingCheckout(true);
      }
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      goBack();
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      showToast(ToastMessages.CartScreen.userIdNotFound, 'error');

      return;
    }

    if (!selectedShippingMethod || !selectedPaymentMethod) {
      showToast(ToastMessages.CartScreen.missingShippingOrPayment, 'error');
      return;
    }

    try {
      setIsPlacingOrder(true);
      // Assuming shipping_id and payment_id are the correct fields from the selected objects
      const shippingId = selectedShippingMethod.shipping_id;
      // Check if selectedPaymentMethod is an object or ID. Using optional chaining.
      const paymentId =
        selectedPaymentMethod.payment_id || selectedPaymentMethod;

      console.log('--- Order Placement Payload Debug ---');
      console.log('User ID:', userId);
      console.log('Shipping ID:', shippingId);
      console.log('Payment ID:', paymentId);
      console.log('Is Buy Now:', isBuyNowMode);
      console.log('------------------------------------');

      const showProfiles = true; // Always true for logged-in users to ensure order placement
      const result = await placeOrder(
        userId,
        shippingId,
        paymentId,
        showProfiles,
        isBuyNowMode ? buyNowProduct?.product_id : undefined,
        checkoutData?.cart?.coupons,
      );

      if (result.success) {
        console.log(
          'Order Placement Success Response:',
          JSON.stringify(result, null, 2),
        );
        const orderId = result.data?.order_id || result.data?.cart?.order_id;
        let paymentUrl =
          result.data?.redirect_url ||
          result.data?.payment_url ||
          result.data?.cart?.payment_url ||
          result.data?.payment_details?.payment_url;

        // Condition for redirect (e.g., payment methods like Stripe, Revolut etc. usually return a URL)
        // If a paymentUrl is explicitly returned, show it in the in-app browser
        if (paymentUrl) {
          // Append store_access_key to the URL
          const separator = paymentUrl.includes('?') ? '&' : '?';
          const finalUrl = `${paymentUrl}${separator}store_access_key=a68342c7da8a436200bb5e39ed3ac056`;

          // Get cancel, fail and success URLs from API response
          const cUrl =
            result.data?.return_empty_checkout_url ||
            result.data?.cart?.return_empty_checkout_url;
          const fUrl = result.data?.fail_url || result.data?.cart?.fail_url;
          const sUrl =
            result.data?.success_url || result.data?.cart?.success_url;

          console.log('--- Payment URLs Record ---');
          console.log('Original API URL:', paymentUrl);
          console.log('Final Payment URL:', finalUrl);
          console.log('Payment Cancel URL:', cUrl);
          console.log('Payment Fail URL:', fUrl);
          console.log('Payment Success URL:', sUrl);
          console.log('---------------------------');

          setPaymentUrl(finalUrl);
          setCancelUrl(cUrl);
          setFailUrl(fUrl);
          setSuccessUrl(sUrl);
          setLastOrderId(orderId);
          setIsPaymentVisible(true);
          return;
        }

        // COD or Success without redirect
        if (orderId && orderId !== '0' && orderId !== 0) {
          dispatch(clearCart());
          // Navigate to ConfirmOrder with real API data
          navigation.navigate('ConfirmOrder', {
            orderData: result.data,
            cartData: checkoutData?.cart,
          });
        } else {
          Alert.alert(
            'Order Pending',
            result.message ||
            'Request processed successfully. Please check your order status.',
            [
              {
                text: 'OK',
                onPress: () => {
                  dispatch(clearCart());
                  navigate('MainScreens', { screen: 'Home' });
                },
              },
            ],
          );
        }
      } else {
        console.error('Order Placement Failed:', result.message);
        Alert.alert('Order Failed', result.message || 'Failed to place order', [
          { text: 'OK' },
        ]);
      }
    } catch (error) {
      console.error('Order Submit Error', error);
      showToast(ToastMessages.CommonToastMessages.unexpectedError, 'error');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleApplyCoupon = useCallback(
    async (code: string) => {
      // If code is empty, we are clearing the coupon
      if (!code.trim()) {
        setCouponCode('');
        await fetchCheckoutData(undefined, '');
        return;
      }

      if (!userId) return;

      try {
        setIsApplyingCoupon(true);
        setCouponCode(code);

        // Pass code directly to fetchCheckoutData to avoid race condition with state update
        const result = await getCheckoutData(
          userId,
          selectedShippingMethod?.shipping_id || undefined,
          isBuyNowMode ? buyNowProduct?.product_id : undefined,
          code,
        );

        if (result.success) {
          const data = result.data;
          console.log('--- Coupon Apply Result ---');
          console.log('Cart Subtotal:', data?.cart?.subtotal);
          console.log(
            'Cart Discount:',
            data?.cart?.subtotal_discount || data?.cart?.discount,
          );

          setCheckoutData(data);

          // Validate if discount is too high or if API returned error for coupon
          const sub = parseFloat(data.cart?.subtotal || displaySubtotal || 0);
          const disc = parseFloat(
            data.cart?.subtotal_discount || data.cart?.discount || 0,
          );

          // Broaden notification check
          let allNotifications: any[] = [];
          if (data.notifications)
            allNotifications = Object.values(data.notifications);
          if (data.cart?.notifications)
            allNotifications = [
              ...allNotifications,
              ...Object.values(data.cart.notifications),
            ];

          const couponError = allNotifications.find(
            (n: any) =>
              n.type === 'E' ||
              (n.type === 'W' && n.message.toLowerCase().includes('coupon')),
          );

          const isCouponActive =
            data?.cart?.coupons &&
            Object.keys(data.cart.coupons).length > 0 &&
            Object.keys(data.cart.coupons).some(
              (c: string) => c.toLowerCase() === code.toLowerCase(),
            );

          console.log('Coupon Error Found:', !!couponError);
          console.log('Is Coupon Active:', !!isCouponActive);

          console.log('Discount Comparison:', {
            disc,
            sub,
            isBlocked: disc >= sub && sub > 0,
          });

          if (disc >= sub && sub > 0) {
            setCouponCode('');
            // Optional: Re-fetch without coupon to reset state
            await fetchCheckoutData(undefined, '');
            Alert.alert(
              'Invalid Coupon',
              'Coupon cannot be applied as the discount is equal to or greater than the subtotal.',
            );
          } else if (couponError) {
            setCouponCode('');
            Alert.alert('Coupon Error', (couponError as any).message);
          } else if (data.result === false && data.message) {
            setCouponCode('');
            Alert.alert('Coupon Error', data.message);
          } else if (!isCouponActive) {
            setCouponCode('');
            // Silently rejected by the backend or invalid code
            Alert.alert('Invalid Coupon', 'The promo code entered is invalid or cannot be applied to these items.');
          } else {
            Alert.alert('Success', 'Coupon applied successfully!');
          }
        }
      } catch (error) {
        console.error('Apply coupon error:', error);
        Alert.alert('Error', 'Failed to apply coupon.');
      } finally {
        setIsApplyingCoupon(false);
      }
    },
    [fetchCheckoutData],
  );

  const handleStepPress = (stepId: number) => {
    // Nav Guard: If moving from Step 1 to further, must satisfy MOV
    if (stepId > 1 && computedTotals.subtotal < 20) {
      showToast(`Subtotal must be at least €20.00 to continue.`, 'error');
      return;
    }

    // Nav Guard: If moving past Step 2, must have shipping method
    if (stepId > 2 && !selectedShippingMethod) {
      showToast('Please select a shipping method first', 'error');
      return;
    }

    setCurrentStep(stepId);
  };

  const handleRemoveItem = useCallback(
    async (item: any) => {
      if (loadingProductId) return;
      setLoadingProductId(String(item.item_id || item.product_id));
      // Clear coupon state on modification
      setCouponCode('');
      setCheckoutData(null);

      // Clear notifications immediately for better UX
      setApiNotifications([]);

      try {
        if (userId) {
          await dispatch(
            removeItemFromCart({ userId, itemId: item.item_id }),
          ).unwrap();
          // Force refresh validation state
          await fetchCheckoutData();
        } else {
          dispatch(removeGuestItem(item.product_id));
        }
      } catch (err: any) {
        showToast(
          ToastMessages.CartScreen.removeItemError(
            (err as any)?.message || String(err),
          ),
          'error',
        );
      } finally {
        setLoadingProductId(null);
      }
    },
    [userId, dispatch, fetchCheckoutData, loadingProductId],
  );

  const handleUpdateQuantity = useCallback(
    async (item: any, delta: number) => {
      if (loadingProductId) return;
      setLoadingProductId(String(item.item_id || item.product_id));
      const currentQuantity = parseInt(item.amount) || 1;

      if (currentQuantity === 1 && delta === -1) {
        handleRemoveItem(item);
        return;
      }

      // Clear notifications immediately for better UX
      setApiNotifications([]);

      try {
        if (userId) {
          await dispatch(
            updateCartQuantityThunk({
              userId,
              productId: item.product_id,
              delta,
            }),
          ).unwrap();
          // Force refresh validation state
          await fetchCheckoutData();
        } else {
          dispatch(
            updateGuestQuantity({ productId: item.product_id, delta: delta }),
          );
        }
      } catch (err: any) {
        showToast(
          ToastMessages.CartScreen.updateQuantityError(
            (err as any)?.message || String(err),
          ),
          'error',
        );
      } finally {
        setLoadingProductId(null);
      }
    },
    [userId, dispatch, fetchCheckoutData, handleRemoveItem, loadingProductId],
  );

  const handleIncrement = useCallback(
    (item: any) => handleUpdateQuantity(item, 1),
    [handleUpdateQuantity],
  );

  const handleDecrement = useCallback(
    (item: any) => handleUpdateQuantity(item, -1),
    [handleUpdateQuantity],
  );

  const renderStep = () => {
    if (isLoading) {
      return (
        <View style={{ paddingVertical: getScreenHeight(20) }}>
          <ActivityIndicator
            size="large"
            color={ColorPalette.PURPLE_200 as string}
          />
        </View>
      );
    }

    const fallbackData = {
      cart: {
        total: displayTotal,
        format_total: displayFormatTotal,
        subtotal: displaySubtotal,
        format_subtotal: displayFormatSubtotal,
        discount,
        shipping_cost,
        format_shipping_cost,
      },
      product_groups: [
        {
          products: displayItems,
        },
      ],
      user_data,
    };

    const effectiveData = {
      ...(checkoutData || fallbackData),
      cart: checkoutData?.cart || fallbackData.cart,
      product_groups:
        checkoutData?.product_groups || fallbackData.product_groups,
    };

    switch (currentStep) {
      case 1:
        return (
          <CartStep
            products={displayItems}
            onUpdate={() => { }}
            onRemove={handleRemoveItem}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onApplyCoupon={handleApplyCoupon}
            isApplyingCoupon={isApplyingCoupon}
            cartData={effectiveData}
            selectedShippingMethod={selectedShippingMethod}
            loadingProductId={loadingProductId}
          />
        );
      case 2:
        return (
          <AddressStep
            selectedAddress={selectedAddress}
            onAddressSelected={setSelectedAddress}
            cartData={effectiveData}
            selectedShippingMethod={selectedShippingMethod}
            onShippingSelected={shipping => {
              setSelectedShippingMethod(shipping);
              fetchCheckoutData(shipping.shipping_id);
            }}
            isLoading={isFetchingCheckout}
          />
        );
      case 3:
        return (
          <PaymentStep
            selectedShippingMethod={selectedShippingMethod}
            onShippingSelected={shipping => {
              setSelectedShippingMethod(shipping);
              fetchCheckoutData(shipping.shipping_id); // Refresh data
            }}
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentSelected={setSelectedPaymentMethod}
            cartData={checkoutData || fallbackData}
            computedTotals={computedTotals}
            isLoading={isFetchingCheckout}
          />
        );
      case 4:
        return (
          <SummaryStep
            cartData={checkoutData || fallbackData}
            computedTotals={computedTotals}
            selectedShippingMethod={selectedShippingMethod}
            selectedPaymentMethod={selectedPaymentMethod}
            selectedAddress={selectedAddress}
            onEditAddress={() => setCurrentStep(2)}
            onEditPayment={() => setCurrentStep(3)}
            onEditOrderItem={() => setCurrentStep(1)}
          />
        );
      default:
        return null;
    }
  };

  return (
    // <SafeAreaView style={styles.container} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name={getHeaderTitle()} // Updated to use dynamic title
        variant={TypographyVariant.H6_SEMIBOLD}
        textColor={ColorPalette.AgreeTerms as string}
        leftIcon={<ArrowLeftIcon size={22} onPress={handleBack} />}
      // rightIcons={[
      //   {
      //     icon: QuestionMarkIcon as React.FC<any>,
      //     color: ColorPalette.TEXT_GREY_400 as string,
      //     size: 24,
      //   },
      // ]}
      />
      {!displayItems || displayItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptyComponent
            imageSource={require('../../../assets/images/emptyBox.png')}
            title="Your cart is feeling light"
            customContainerStyle={styles.emptyContainerStyles}
            variant={TypographyVariant.H6_SEMIBOLD}
            subVariant={TypographyVariant.PXSMALL_REGULAR}
            subTitle="Looks like you have not added anything yet. Start exploring to find something you love!"
            customImageStyle={{
              height: getScreenHeight(22),
              width: getScreenWidth(38),
              marginBottom: getScreenHeight(1),
            }}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      ) : (
        <>
          <ProgressStepper
            steps={STEPS}
            currentStep={currentStep}
            onStepPress={handleStepPress}
          />
          <View
            style={{
              height: 1,
              backgroundColor: ColorPalette.WelcomeBack, // light grey line
              width: '100%',
            }}
          />
          <View
            style={[
              styles.mainContainer,
              { paddingBottom: getScreenHeight(11) },
            ]}>
            {apiNotifications.length > 0 && (
              <View style={styles.notificationBanner}>
                {apiNotifications.map((notification, index) => (
                  <Typography
                    key={`notif-${index}`}
                    text={notification.message}
                    variant={TypographyVariant.LSMALL_MEDIUM}
                    customTextStyles={{
                      color:
                        notification.type === 'E'
                          ? ColorPalette.RED_100
                          : ColorPalette.ORANGE_300,
                      textAlign: 'center',
                      marginBottom: getScreenHeight(0.5),
                    }}
                  />
                ))}
              </View>
            )}
            <ScrollView
              style={styles.mainContainer}
              contentContainerStyle={[styles.scrollContent]}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[ColorPalette.PURPLE_200 as string]}
                />
              }>
              <View>{renderStep()}</View>
            </ScrollView>
          </View>
          <View style={styles.bottomSection}>
            <View style={styles.priceContainer}>
              <Typography
                text={computedTotals.format_total}
                variant={TypographyVariant.H4_BOLD}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 as string }}
              />
            </View>
            <Button
              text={currentStep === STEPS.length ? 'PLACE ORDER' : 'CONTINUE'}
              onPress={currentStep === STEPS.length ? handleSubmit : handleNext}
              variant={ButtonVariant.PRIMARY}
              loading={isPlacingOrder}
              disabled={(() => {
                const sub = parseFloat((computedTotals.subtotal as any) || 0);
                const hasCriticalError = apiNotifications.some(
                  n => n.type === 'E',
                );
                const isBelowMOV = sub > 0 && sub < 20 && !isBuyNowMode;
                const isShippingRequiredButMissing =
                  currentStep === 2 && !selectedShippingMethod;

                return (
                  hasCriticalError || isBelowMOV || isShippingRequiredButMissing
                );
              })()}
              state={(() => {
                // Minimum Order Value (MOV) check
                const sub = parseFloat((computedTotals.subtotal as any) || 0);
                const hasCriticalError = apiNotifications.some(
                  n => n.type === 'E',
                );
                const isBelowMOV = sub > 0 && sub < 20 && !isBuyNowMode;

                // On step 2 (Address), also ensure a shipping method is selected if possible
                const isShippingRequiredButMissing =
                  currentStep === 2 && !selectedShippingMethod;

                console.log('Button State Calc:', {
                  sub,
                  isBelowMOV,
                  hasCriticalError,
                  isShippingRequiredButMissing,
                  currentStep,
                });

                if (
                  hasCriticalError ||
                  isBelowMOV ||
                  isShippingRequiredButMissing
                ) {
                  return ButtonState.DISABLED;
                }
                return ButtonState.DEFAULT;
              })()}
              size={ButtonSize.SEMILARGE}
              customStyles={[
                { borderRadius: BorderRadius.Small },
                styles.continueButton,
              ]}
              // withShadow
              bgColor={ColorPalette.ROSE_PURPLE_300 as string}
            />
          </View>
        </>
      )}
      <PaymentWebView
        visible={isPaymentVisible}
        url={paymentUrl || ''}
        cancelUrl={cancelUrl || ''}
        failUrl={failUrl || ''}
        successUrl={successUrl || ''}
        onCancel={() => {
          setIsPaymentVisible(false);
          setPaymentUrl(null);
          setCancelUrl(null);
          setFailUrl(null);
          setSuccessUrl(null);
          Alert.alert('Transaction Cancelled', 'Transaction Cancelled by User');
          if (isBuyNowSession && userId) {
            performCartRestoration();
          } else {
            fetchCartData();
          }
        }}
        onFail={() => {
          setIsPaymentVisible(false);
          setPaymentUrl(null);
          setCancelUrl(null);
          setFailUrl(null);
          setSuccessUrl(null);
          Alert.alert('Transaction Failed', 'Transaction Failed');
          if (isBuyNowSession && userId) {
            performCartRestoration();
          } else {
            fetchCartData();
          }
        }}
        onSuccess={() => {
          setIsPaymentVisible(false);
          setPaymentUrl(null);
          setCancelUrl(null);
          setFailUrl(null);
          setSuccessUrl(null);

          // Clear temporary UI states
          const finalCheckoutData = checkoutData; // Snap before clear

          // Explicitly clear cart locally on success to avoid "memory" issues
          dispatch(clearCart());

          // HEAL: Wipe local checkout session data to avoid stale data on next visit
          setCheckoutData(null);
          setSelectedShippingMethod(null);
          setSelectedPaymentMethod(null);
          setSelectedAddress(null);
          setCouponCode('');
          setApiNotifications([]);

          if (isBuyNowSession && userId) {
            performCartRestoration();
          }

          // Navigate to confirm order
          navigation.navigate('ConfirmOrder', {
            orderData: { order_id: lastOrderId },
            cartData: finalCheckoutData?.cart,
          });
        }}
        onClose={() => {
          setIsPaymentVisible(false);
          setPaymentUrl(null);
          setCancelUrl(null);
          setFailUrl(null);
          setSuccessUrl(null);
          // Refresh cart from server to see if the order was actually placed or cancelled
          if (isBuyNowSession && userId) {
            performCartRestoration();
          } else {
            fetchCartData();
          }
          // We stay on the current step (Summary) so the user can see their items if payment failed
        }}
      />
    </ScreenWrapper>
  );
};

export default CartScreen;
