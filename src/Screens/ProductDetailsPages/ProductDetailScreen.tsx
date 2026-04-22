import React, {
  memo,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  ScrollView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { API_ENDPOINTS, AUTH_HEADER, BASE_URL } from '../../config/ApiConfig';
import ArrowLeftIcon from '../../assets/icons/ArrowLeft';
import { CartIcon } from '../../assets/icons/BottomNavIcons';
import HeartIcon from '../../assets/icons/HeartIcon';
import LocationPinIcon from '../../assets/icons/LocationPinIcon';
import PlusIconNormal from '../../assets/icons/PlusIconNormal';
import SearchIcon from '../../assets/icons/SearchIcon';
import { Header } from '../../components/CustomComponents/Header/Header';
import { Typography } from '../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../helpers/screenSize';
import { styles } from './ProductDetailScreen.styles';
import ImageSlider from './ProductDetailComponents/ImageSliderComponent/ImageSlider';
import ProductInfo from './ProductDetailComponents/ProductPriceInfoComponent/ProductPriceInfo';
import { Badge } from '../../components/MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../components/MainComponents/Badges/Badge.types';
import { Spacing } from '../../config/globalStyles';
import ProductDetailComponent from './ProductDetailComponents/ProductIndoDetailComponent/ProductDetailComponent';
import SoldBy from './ProductDetailComponents/SoldByComponent/SoldBy';
import RatingReview from './ProductDetailComponents/RatingReviewComponents/RatingReview';
import ReviewComponent from './ProductDetailComponents/ReviewComponent/ReviewComponent';
import CheckDelivery from './ProductDetailComponents/CheckDeliveryComponent/CheckDelivery';
import CardHeader from '../../components/CustomComponents/HomeComponents/CardHeader';
import ChevronIcon from '../../assets/icons/ChevronIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../components/MainComponents/Button';
import { bestSellerProducts } from '../MainScreens/HomePages/HomeScreen.constants';
import BestSellerCard from '../../components/CustomComponents/HomeComponents/BestSellerComponent/BestSellerCard';
import {
  addItemToCart,
  addGuestItem,
  removeItemFromCart,
  fetchCart,
  startBuyNowSession,
  restoreSavedCart,
  clearCart,
} from '../../store/slices/cartSlice';
import {
  fetchWishlist,
  toggleWishlistItem,
} from '../../store/slices/wishlistSlice';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../../services/WishlistService';
import { clearCart as clearCartService } from '../../services/CartService';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import FullScreenImageViewer from '../../components/CustomComponents/FullScreenImageViewer';
import Product3DViewer from '../../components/CustomComponents/Product3DViewer';
import LayoutIcon from '../../assets/icons/LayoutIcon';
import ReviewModal from './ProductDetailComponents/ReviewComponent/ReviewModal';
import ScreenWrapper from '../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import StarRating from '../../assets/icons/StarRating';
import { goBack, navigate } from '../../utils/navigationref';
import { SearchBox } from '../../components/CustomComponents/SearchBox/SearchBox';
import MicrophoneIcon from '../../assets/icons/MicrophoneIcon';
import VoiceSearchModal from '../../components/CustomComponents/VoiceSearch/VoiceSearchModal';
import { addSearch } from '../../store/slices/searchSlice';
import ShoppingBagIcon from '../../assets/icons/ShoppingBagIcon';
import ShoppingBagIcon2 from '../../assets/icons/ShoppingBagIcon2';
import { ToastMessages } from '../../components/MainComponents/Toast/ToastMessages';
import { showToast } from '../../components/MainComponents/Toast/ToastHelper';
import { useCartQuantity } from '../../hooks/useCartQuantity';

const MemoizedBestSellerCard = memo(BestSellerCard);

const toHttps = (url: string): string => {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://');
};

const ProductDetailScreen = ({ route, navigation }: any) => {
  const dispatch = useDispatch();
  const { productId } = route.params || {};
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const userId = useSelector((state: RootState) => state.auth.userId);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isProductFavorite = wishlistItems.some(
    (item: any) => String(item.product_id) === String(productId),
  );

  const [productData, setProductData] = useState<any>(null);
  const { product, products_block, currency } = productData || {};
  const [reviewData, setReviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [is3DViewerVisible, setIs3DViewerVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewerImages, setViewerImages] = useState<any[]>([]);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isVoiceModalVisible, setIsVoiceModalVisible] = React.useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    quantity: currentQuantity,
    increment: handleIncrement,
    decrement: handleDecrement,
  } = useCartQuantity(productId);

  const syncWishlist = useCallback(() => {
    if (userId) {
      dispatch(fetchWishlist(userId) as any);
    }
  }, [userId, dispatch]);

  const handleNavigateToSearchResult = useCallback(
    (searchQuery = '', nt_see_more_action = '') => {
      // If we have an action, we prioritize it over the search text for history
      if (searchQuery.trim() && !nt_see_more_action) {
        dispatch(addSearch(searchQuery));
      }
      navigate('MainScreens', {
        screen: 'Search',
        params: {
          screen: 'SearchResultScreen',
          params: { searchQuery, nt_see_more_action },
        },
      });
    },
    [dispatch],
  );

  // Sync favorites state with Redux wishlist items
  useEffect(() => {
    const favMap: Record<string, boolean> = {};
    wishlistItems.forEach((item: any) => {
      if (item.product_id) {
        favMap[String(item.product_id)] = true;
      }
    });
    setFavorites(favMap);
  }, [wishlistItems]);

  const fetchProductDetails = useCallback(async () => {
    if (!productId) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        API_ENDPOINTS.PRODUCT_DETAILS(productId, userId || 0),
        {
          headers: {
            Authorization: AUTH_HEADER,
          },
        },
      );
      if (response.data && response.data.product) {
        setProductData(response.data);
      }

      // Fetch detailed reviews
      const reviewsResponse = await axios.get(
        API_ENDPOINTS.REVIEWS(productId, userId || 0),
        {
          headers: {
            Authorization: AUTH_HEADER,
          },
        },
      );
      if (reviewsResponse.data) {
        setReviewData(reviewsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      showToast(
        ToastMessages.ProductDetailScreen.failedToGetProductDetails,
        'error',
      );
    } finally {
      setIsLoading(false);
    }
  }, [productId, userId]);

  useEffect(() => {
    fetchProductDetails();
    if (userId) {
      dispatch(fetchCart(userId) as any);
    }
  }, [fetchProductDetails, userId, dispatch]);

  const toggleFavorite = useCallback(
    async (id: string) => {
      const isMainProduct = String(id) === String(productId);
      const isAdding = !favorites[id];

      if (isMainProduct) setIsWishlistLoading(true);

      try {
        if (isAdding) {
          if (!userId) {
            showToast(
              ToastMessages.CommonToastMessages.loginToAddWishlist,
              'error',
            );
            if (isMainProduct) setIsWishlistLoading(false);
            return;
          }
          const result = await addToWishlist(userId, id);
          if (result && (result.success || result.result)) {
            showToast(ToastMessages.ProductDetailScreen.wishlistAdded, 'success');
            syncWishlist();
          } else {
            showToast(
              ToastMessages.ProductDetailScreen.wishlistFailed(
                result?.message || 'Failed to add',
              ),
              'error',
            );
          }
        } else {
          if (!userId) return;

          // Find the correct cart_id/item_id for removal
          const wishlistEntry = wishlistItems.find(
            (item: any) => String(item.product_id) === String(id),
          );
          const cartId =
            wishlistEntry?.wishlist_id || wishlistEntry?.item_id || id;

          console.log('Removing from wishlist. ProductID:', id, 'CartID:', cartId);

          const result = await removeFromWishlist(userId, cartId);
          if (result && (result.success || result.result)) {
            showToast(
              ToastMessages.ProductDetailScreen.wishlistRemoved,
              'error',
            );
            syncWishlist();
          } else {
            showToast(
              ToastMessages.ProductDetailScreen.wishlistFailed(
                result?.message || 'Failed to remove',
              ),
              'error',
            );
          }
        }
      } catch (error) {
        console.error('Toggle favorite error:', error);
        showToast(ToastMessages.CommonToastMessages.unexpectedError, 'error');
      } finally {
        if (isMainProduct) setIsWishlistLoading(false);
      }
    },
    [userId, dispatch, productId, favorites, syncWishlist],
  );

  const handleCardPress = (id: string) => {
    navigation.push('ProductDetail', { productId: id });
  };

  const [selectedVariation, setSelectedVariation] = React.useState(productId);

  const renderSimilarProductItem = useCallback(
    ({ item }: any) => {
      return (
        <TouchableOpacity onPress={() => handleCardPress(item.id)}>
          <Image
            source={item.image}
            style={styles.similarProductImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
    },
    [handleCardPress],
  );

  const renderVariationItem = useCallback(
    ({ item }: any) => {
      const isSelected = selectedVariation === item.id;

      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedVariation(item.id);
            handleCardPress(item.id);
          }}
          style={{ marginRight: getScreenWidth(2) }}>
          <Badge
            text={item.label}
            variant={BadgeVariant.OUTLINE}
            type={BadgeType.PRIMARY}
            customBorderColor={
              isSelected
                ? ColorPalette.TEXT_GREY_300
                : ColorPalette.TEXT_GREY_100
            }
            textVariant={TypographyVariant.LMEDIUM_BOLD}
            customTextColor={
              isSelected ? ColorPalette.WHITE : ColorPalette.TEXT_GREY_400
            }
            customContainerStyle={{
              paddingVertical: getScreenHeight(1),
              paddingHorizontal: getScreenWidth(5.5),
              borderRadius: Spacing.Large,
              backgroundColor: isSelected
                ? ColorPalette.TEXT_GREY_300
                : 'transparent',
            }}
          />
        </TouchableOpacity>
      );
    },
    [selectedVariation, handleCardPress],
  );

  const handleAddToWishlist = async () => {
    if (!productId) return;
    if (!userId) {
      if (Platform.OS === 'android') {
        showToast(
          ToastMessages.CommonToastMessages.loginToAddWishlist,
          'error',
        );
      } else {
        showToast(
          ToastMessages.CommonToastMessages.loginToAddWishlist,
          'error',
        );
      }
      return;
    }
    const result = await addToWishlist(userId, productId);
    if (result.success) {
      if (Platform.OS === 'android') {
        showToast(
          ToastMessages.ProductDetailScreen.wishlistSuccess(result.message),
        );
      } else {
        showToast(
          ToastMessages.ProductDetailScreen.wishlistSuccess(result.message),
        );
      }
      syncWishlist();
    } else {
      if (Platform.OS === 'android') {
        showToast(
          ToastMessages.ProductDetailScreen.wishlistFailed(result.message),
        );
      } else {
        showToast(
          ToastMessages.ProductDetailScreen.wishlistFailed(result.message),
        );
      }
    }
  };

  const handleShare = () => {
    console.log('Share product');
  };

  const handleAddToCart = useCallback(
    async (id: string) => {
      if (!userId) {
        if (!productData || !productData.product) return;

        dispatch(
          addGuestItem({
            product_id: String(id),
            product: productData.product.product,
            amount: 1,
            price: String(productData.product.price || '0'),
            display_price: `€${productData.product.price || 0}`,
            main_pair: productData.product.main_pair,
          }),
        );
        setIsAdded(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setIsAdded(false), 5000);

        if (Platform.OS === 'android') {
          showToast(ToastMessages.CommonToastMessages.itemAddedGuestCart);
        } else {
          showToast(ToastMessages.CommonToastMessages.itemAddedGuestCart);
        }
        return;
      }

      try {
        const resultAction = await dispatch(
          addItemToCart({
            userId: userId,
            productId: id,
            productDetails: {
              title: productData?.product?.product || '',
              price: String(productData?.product?.price || '0'),
              display_price: `€${productData?.product?.price || 0}`,
              image:
                productData?.product?.main_pair?.detailed?.image_path || '',
            },
          }) as any,
        ).unwrap();

        setIsAdded(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setIsAdded(false), 5000);

        const message =
          (resultAction as any)?.message ||
          (resultAction as any)?.data?.message ||
          'Success';

        if (Platform.OS === 'android') {
          showToast(
            ToastMessages.ProductDetailScreen.addToCartSuccess(message),
          );
        } else {
          showToast(
            ToastMessages.ProductDetailScreen.addToCartSuccess(message),
          );
        }
      } catch (err: any) {
        console.error('Add to cart thunk error:', err);
        const errorMessage =
          err?.message || String(err) || 'Error adding to cart';
        if (Platform.OS === 'android') {
          showToast(
            ToastMessages.CommonToastMessages.addToCartFailed(errorMessage),
          );
        } else {
          showToast(
            ToastMessages.CommonToastMessages.addToCartFailed(errorMessage),
          );
        }
      }
    },
    [userId, productData, dispatch],
  );

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const handleBuyNow = useCallback(async () => {
    if (!product || !productId) return;

    if (!userId) {
      // Guest users: we just swap locally in CartScreen anyway,
      // but let's follow a similar path for consistency if needed.
      // For now, standard guest Buy Now is okay as it's locally managed.
      const buyNowProduct = {
        product_id: String(productId),
        product: product.product,
        amount: 1,
        price: product.price,
        display_price:
          product.display_price || `${currency?.symbol || '€'}${product.price}`,
        main_pair: product.main_pair,
        item_id: `buynow_${productId}`,
      };

      navigation.navigate('Cart', {
        screen: 'CartScreen',
        params: {
          initialStep: 1,
          isBuyNow: true,
          buyNowProduct: buyNowProduct,
        },
      });
      return;
    }

    try {
      setIsLoading(true);

      // 1. Save current cart items to Redux for restoration later
      dispatch(startBuyNowSession(cartItems));

      // 2. Clear server-side cart to isolate this purchase
      const clearResult = await clearCartService(userId);
      if (!clearResult.success) {
        throw new Error('Failed to prepare cart for Buy Now');
      }

      // HEAL: Clear local Redux state immediately so addItemToCart payload is clean
      dispatch(clearCart());

      // 3. Add the Buy Now product to the server-side cart
      const addResult = await dispatch(
        addItemToCart({
          userId: userId,
          productId: productId,
          productDetails: {
            title: product.product,
            price: String(product.price || '0'),
            display_price:
              product.display_price ||
              `${currency?.symbol || '€'}${product.price}`,
            image: product.main_pair?.detailed?.image_path || '',
          },
        }) as any,
      ).unwrap();

      const buyNowProduct = {
        product_id: String(productId),
        product: product.product,
        amount: 1,
        price: product.price,
        display_price:
          product.display_price || `${currency?.symbol || '€'}${product.price}`,
        main_pair: product.main_pair,
        item_id: addResult?.item_id || `buynow_${productId}`,
      };

      // 4. Navigate to Cart screen
      navigation.navigate('Cart', {
        screen: 'CartScreen',
        params: {
          initialStep: 1,
          isBuyNow: true,
          buyNowProduct: buyNowProduct,
        },
      });
    } catch (error: any) {
      console.error('Buy Now flow error:', error);
      showToast('Failed to initiate Buy Now. Restoring your cart...', 'error');
      // On error, try to restore the original cart immediately
      await dispatch(restoreSavedCart(userId) as any);
    } finally {
      setIsLoading(false);
    }
  }, [
    productId,
    product,
    currency,
    navigation,
    userId,
    dispatch,
    cartItems,
  ]);

  const handleReviewSubmit = async (rating_value: number, comment: string) => {
    if (!userId) {
      showToast(ToastMessages.RateOrderScreen.loginRequired, 'error');
      return;
    }

    setIsSubmittingReview(true);
    try {
      const payload = {
        comment,
        files_url: '',
        object_id: parseInt(productId, 10),
        object_type: 'P',
        rating_value,
        user_id: userId,
      };

      const response = await axios.post(`${BASE_URL}/api/reviews`, payload, {
        headers: {
          Authorization: AUTH_HEADER,
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.result) {
        if (Platform.OS === 'android') {
          showToast(ToastMessages.CommonToastMessages.reviewSubmitted);
        } else {
          showToast(ToastMessages.CommonToastMessages.reviewSubmitted);
        }
        setIsReviewModalVisible(false);
        fetchProductDetails();
      } else {
        throw new Error(response.data?.message || 'Failed to add review');
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      showToast(
        ToastMessages.RateOrderScreen.failedToSubmitReview(error.message),
        'error',
      );
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const keyExtractorById = useCallback((item: any) => item.id, []);

  const renderBestSellerItem = useCallback(
    ({ item }: any) => (
      <MemoizedBestSellerCard
        imageSource={item.imageSource}
        title={item.title}
        price={item.price}
        rating={item.rating}
        onToggleFavorite={() => toggleFavorite(item.id)}
        onAddToCart={() => handleAddToCart(item.id)}
        onCardPress={() => handleCardPress(item.id)}
        strikethroughPrice={item.strikethroughPrice}
        isProductDetail={true}
        buttonText="Add"
        id={item.id}
      />
    ),
    [toggleFavorite, handleAddToCart, handleCardPress],
  );

  const productImages = useMemo(() => {
    if (!product) return [];
    const urls = product.image_urls || [];
    return urls
      .filter((url: any) => !!url)
      .map((url: string) =>
        typeof url === 'string' ? { uri: toHttps(url) } : url,
      );
  }, [product]);

  const variationFeaturesMapped = useMemo(() => {
    if (!product || !product.variation_features_variants) return [];

    return product.variation_features_variants.map((feature: any) => ({
      id: feature.feature_id,
      title: `Select ${feature.description}`,
      variants: feature.variants.map((v: any) => ({
        id: v.product_id,
        label: v.variant,
      })),
    }));
  }, [product]);

  const similarProductsMapped = useMemo(() => {
    if (
      !product ||
      !product.variation_features_variants ||
      !product.variation_features_variants[0]
    )
      return [];
    return product.variation_features_variants[0].variants.map((v: any) => ({
      id: v.product_id,
      image: { uri: toHttps(v.image_url) },
    }));
  }, [product]);

  const relatedProductsMapped = useMemo(() => {
    if (!products_block || !products_block[0]) return [];
    return products_block[0].products.map((p: any) => ({
      id: p.product_id,
      imageSource: { uri: toHttps(p.image_url) },
      title: p.product,
      price: parseFloat(p.price),
      strikethroughPrice: parseFloat(p.list_price || '0'),
      rating: parseFloat(p.average_rating || '0'),
    }));
  }, [products_block]);

  const productFeaturesMapped = useMemo(() => {
    if (!product || !product.product_features) return [];
    return product.product_features.map((feature: any) => ({
      label: feature.description || feature.internal_name,
      value: feature.value,
    }));
  }, [product]);

  const product3DModelUrl = useMemo(() => {
    if (!product) return null;

    // 1. Check direct field if it exists (e.g. model_3d)
    if (product.model_3d) return product.model_3d;

    // 2. Check image_urls for .glb or .gltf
    const urls = product.image_urls || [];
    const glbUrl = urls.find(
      (url: string) =>
        typeof url === 'string' &&
        (url.toLowerCase().endsWith('.glb') ||
          url.toLowerCase().endsWith('.gltf')),
    );
    if (glbUrl) return glbUrl;

    // 3. Check features for 3D model URL
    if (product.product_features) {
      const modelFeature = product.product_features.find(
        (f: any) =>
          f.internal_name?.toLowerCase().includes('3d') ||
          f.description?.toLowerCase().includes('3d'),
      );
      if (
        modelFeature &&
        modelFeature.value &&
        (modelFeature.value.startsWith('http') ||
          modelFeature.value.endsWith('.glb'))
      ) {
        return modelFeature.value;
      }
    }

    return null;
  }, [product]);

  const normalizedReviews = useMemo(() => {
    const rawReviews =
      reviewData?.rating_details?.product_reviews ||
      productData?.product?.product_reviews;

    if (!rawReviews) return [];

    let reviewsArray = Array.isArray(rawReviews)
      ? rawReviews
      : typeof rawReviews === 'object' && rawReviews.product_review_id
        ? [rawReviews]
        : [];

    return reviewsArray.map((review: any) => {
      // Normalize images
      const images: any[] = [];
      if (review.image_urls) {
        if (Array.isArray(review.image_urls)) {
          review.image_urls.forEach((img: any) => {
            if (img.original_url) images.push({ uri: img.original_url });
            else if (typeof img === 'string') images.push({ uri: img });
          });
        } else if (typeof review.image_urls === 'object') {
          Object.values(review.image_urls).forEach((img: any) => {
            if (img.original_url) images.push({ uri: img.original_url });
          });
        }
      }

      return {
        ...review,
        userName: review.name || 'User',
        rating: parseFloat(review.rating_value),
        postedDate: `Posted on ${new Date(
          review.product_review_timestamp * 1000,
        ).toLocaleDateString()}`,
        description: review.message || review.comment,
        helpfulCount:
          typeof review.helpfulness === 'object'
            ? review.helpfulness.helpfulness
            : review.helpfulness || 0,
        images: images,
      };
    });
  }, [reviewData, productData]);

  const ratingStats = useMemo(() => {
    const stats =
      reviewData?.rating_details?.product_reviews_rating_stats || [];
    const result = {
      excellent: 0,
      veryGood: 0,
      good: 0,
      average: 0,
      poor: 0,
    };

    if (Array.isArray(stats)) {
      stats.forEach((stat: any) => {
        const val = parseInt(stat.rating_value, 10);
        const count = parseInt(stat.count, 10);
        if (val === 5) result.excellent = count;
        else if (val === 4) result.veryGood = count;
        else if (val === 3) result.good = count;
        else if (val === 2) result.average = count;
        else if (val === 1) result.poor = count;
      });
    }

    return result;
  }, [reviewData]);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={ColorPalette.ROSE_PURPLE_400} />
      </SafeAreaView>
    );
  }

  if (!productData || !productData.product) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          text="Product not found"
          variant={TypographyVariant.H5_BOLD}
        />
      </SafeAreaView>
    );
  }

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      {/* <Header
        name={product.product}
        variant={TypographyVariant.PMEDIUM_BOLD}
        textColor={ColorPalette.TEXT_GREY_500}
      /> */}

      <View style={styles.searchContainer}>
        <ArrowLeftIcon style={undefined} onPress={goBack} />
        <TouchableOpacity
          style={styles.searchBoxContainer}
          onPress={() => handleNavigateToSearchResult('')}
          activeOpacity={0.8}>
          <SearchBox
            value=""
            onChangeText={() => { }}
            placeholder="Search Products"
            customContainerStyle={styles.searchInput}
            editable={false}
          />
          <View style={styles.micIconContainer}>
            <MicrophoneIcon
              size={20}
              color="#606060"
              style={undefined}
              onPress={() => setIsVoiceModalVisible(true)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart', { screen: 'CartScreen' })}>
          <ShoppingBagIcon2 />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(4) },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* <View style={styles.deliveryInfo}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: getScreenWidth(1),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LocationPinIcon
              style={undefined}
              size={16}
              color={ColorPalette.TEXT_GREY_400 as any}
            />
            <Typography
              text="Add delivery location to check extra discount"
              variant={TypographyVariant.LSMALL_MEDIUM}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 as any }}
            />
          </View>
          <PlusIconNormal
            onPress={undefined}
            style={undefined}
            color={ColorPalette.BLUE_200 as any}
            size={16}
          />
        </View> */}
        <View style={{ position: 'relative' }}>
          <ImageSlider
            images={productImages}
            onImagePress={index => {
              setViewerImages(productImages);
              setSelectedImageIndex(index);
              setIsImageViewerVisible(true);
            }}
            rating={parseFloat(product.average_rating || '0')}
            onAddToWishlist={() => toggleFavorite(productId)}
            onShare={handleShare}
            isFavorite={isProductFavorite}
            loading={isWishlistLoading}
          />

          {product3DModelUrl && (
            <TouchableOpacity
              style={styles.view3dButton}
              onPress={() => setIs3DViewerVisible(true)}>
              <View style={styles.view3dContent}>
                <View style={styles.view3dIconWrapper}>
                  <LayoutIcon
                    size={16}
                    color={ColorPalette.WHITE as any}
                    style={undefined}
                    stroke={undefined}
                  />
                </View>
                <Typography
                  text="View in 3D"
                  variant={TypographyVariant.LSMALL_BOLD}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_500 as any }}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        {/* <View style={styles.imageAllContainer}>
          <Typography
            text={`${similarProductsMapped.length} Similar Products`}
            variant={TypographyVariant.H6_MEDIUM}
          />
          <View style={styles.flatListImage}>
            <FlatList
              data={similarProductsMapped}
              renderItem={renderSimilarProductItem}
              keyExtractor={item => item.id}
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContentContainer}
            />
          </View>
        </View> */}
        <ProductInfo
          title={product.product}
          price={parseFloat(product.price)}
          strikeThrough={parseFloat(product.list_price || '0')}
          rating={parseFloat(product.average_rating || '0')}
          ratingNumber={parseInt(product.product_reviews_count || '0', 10)}
          reviewNumber={parseInt(product.product_reviews_count || '0', 10)}
          deliveryTime={24}
          minDeliveryPrice={2.99}
          maxDeliveryPrice={4.99}
          onAddToWishlist={() => toggleFavorite(productId)}
          onShare={handleShare}
          currency={currency?.symbol || '€'}
          isFavorite={isProductFavorite}
          stock={parseInt(product?.amount || '0')}
        />
        {variationFeaturesMapped.map((featureBlock: any) => (
          <View key={featureBlock.id} style={styles.sizeContainer}>
            <Typography
              text={featureBlock.title}
              variant={TypographyVariant.H6_MEDIUM}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
            <FlatList
              data={featureBlock.variants}
              renderItem={renderVariationItem}
              keyExtractor={item => item.id}
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
        <ProductDetailComponent
          name={product.product}
          features={productFeaturesMapped}
          description={product.full_description || product.description}
        />
        <SoldBy
          storeName={product.company_name}
          followers={1635}
          productsSold={2076}
          ratings={4.7}
          ratingsCount={5662}
          onViewShop={() => {
            navigation.navigate('Home', {
              screen: 'VendorDetails',
              params: {
                vendorId: product.company_id,
                vendorName: product.company_name,
                isVendor: true,
              },
            });
          }}
        />
        <RatingReview
          rating={parseFloat(product.average_rating || '0')}
          totalRatings={parseInt(product.product_reviews_count || '0', 10)}
          totalReviews={product.product_reviews_count || 0}
          excellent={ratingStats.excellent}
          veryGood={ratingStats.veryGood}
          good={ratingStats.good}
          average={ratingStats.average}
          poor={ratingStats.poor}
          onWriteReview={() => setIsReviewModalVisible(true)}
        />
        {/* Only show Real Images section if valid data exists. Hiding for now as it's using similarProductsMapped incorrectly */}
        {false && (
          <View style={styles.imageAllContainer}>
            <Typography
              text="Real Images and videos from customers"
              variant={TypographyVariant.H6_MEDIUM}
            />
            <View style={styles.flatListImage}>
              <FlatList
                data={similarProductsMapped}
                renderItem={renderSimilarProductItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContentContainer}
              />
            </View>
          </View>
        )}
        {normalizedReviews.map((review: any, index: number) => (
          <ReviewComponent
            key={index}
            userName={review.userName}
            userProfileImage={require('../../assets/images/profile.png')}
            rating={review.rating}
            postedDate={review.postedDate}
            description={review.description}
            helpfulCount={review.helpfulCount}
            images={review.images}
            onImagePress={imgIndex => {
              setViewerImages(review.images);
              setSelectedImageIndex(imgIndex);
              setIsImageViewerVisible(true);
            }}
            onHelpfulPress={() => console.log('Helpful pressed')}
          />
        ))}
        {/* <CheckDelivery
          check={() => {
            console.log('Check');
          }}
        /> */}
        <View style={styles.bestSellerContainer}>
          <CardHeader
            title={
              products_block && products_block[0]
                ? products_block[0].title
                : 'Related'
            }
            showRightSection={false}
          />
          <FlatList
            data={relatedProductsMapped}
            renderItem={renderBestSellerItem}
            keyExtractor={keyExtractorById}
            extraData={wishlistItems}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContainer}
          />
          <Button
            text="See All Products"
            IconComponent={ChevronIcon}
            iconPosition="right"
            onPress={() => {
              if (productData?.product?.main_category) {
                navigate('MainScreens', {
                  screen: 'Search',
                  params: {
                    screen: 'SearchResultScreen',
                    params: { category_id: productData.product.main_category },
                  },
                } as any);
              } else {
                const block = products_block?.[0];
                handleNavigateToSearchResult(
                  block?.title || '',
                  block?.see_more_action || block?.nt_see_more_action || '',
                );
              }
            }}
            state={ButtonState.DEFAULT}
            size={ButtonSize.SEMILARGE}
            type={ButtonType.PRIMARY}
            customStyles={{
              borderRadius: Spacing.XSmall,
              height: getScreenHeight(6),
            }}
            bgColor={ColorPalette.WelcomeBack as string}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 as any }}
            variant={ButtonVariant.PRIMARY}
          />
        </View>
        <View style={styles.footerContainer}>
          <Typography
            text={'Your Local\nShopping App ❤️'}
            variant={TypographyVariant.H1_BOLD}
            customTextStyles={styles.footerText as any}
          />
          <View style={styles.footerLine} />
          <Typography
            text="Surf Malta"
            variant={TypographyVariant.LMEDIUM_BOLD}
            customTextStyles={styles.footerText as any}
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View style={styles.actionButtonsContainer}>
        {currentQuantity > 0 ? (
          <Button
            text="Cart Added"
            leftIcon={CartIcon} /* Checkmark might be better but reusing CartIcon */
            onPress={() => navigation.navigate('Cart', { screen: 'CartScreen' })}
            state={ButtonState.DEFAULT}
            size={ButtonSize.SEMILARGE}
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.PRIMARY}
            customStyles={{
              ...styles.actionButton,
              borderColor: ColorPalette.ROSE_PURPLE_400 as string,
              borderWidth: 1.5,
              backgroundColor: ColorPalette.WHITE,
            }}
            customTextStyles={{
              color: ColorPalette.ROSE_PURPLE_400,
            }}
            iconSize={18}
            iconColor={ColorPalette.ROSE_PURPLE_400 as any}
            withShadow={true}
          />
        ) : (
          <Button
            text={
              parseInt(product?.amount || '0') <= 0
                ? 'Out of Stock'
                : 'Add to Cart'
            }
            leftIcon={CartIcon}
            onPress={() => handleAddToCart(productId)}
            state={
              parseInt(product?.amount || '0') <= 0
                ? ButtonState.DISABLED
                : ButtonState.DEFAULT
            }
            size={ButtonSize.SEMILARGE}
            type={ButtonType.OUTLINED}
            variant={ButtonVariant.PRIMARY}
            customStyles={{
              ...styles.actionButton,
              borderColor:
                parseInt(product?.amount || '0') <= 0
                  ? ColorPalette.TEXT_GREY_100
                  : (ColorPalette.ROSE_PURPLE_400 as string),
              borderWidth: 1.5,
              backgroundColor: 'transparent',
            }}
            customTextStyles={{
              color:
                parseInt(product?.amount || '0') <= 0
                  ? ColorPalette.TEXT_GREY_100
                  : ColorPalette.ROSE_PURPLE_400,
            }}
            iconSize={18}
            iconColor={
              (parseInt(product?.amount || '0') <= 0
                ? ColorPalette.TEXT_GREY_100
                : ColorPalette.ROSE_PURPLE_400) as any
            }
            withShadow={parseInt(product?.amount || '0') > 0}
          />
        )}
        <Button
          text="Buy Now"
          leftIcon={ChevronIcon}
          onPress={handleBuyNow}
          state={
            parseInt(product?.amount || '0') <= 0
              ? ButtonState.DISABLED
              : ButtonState.DEFAULT
          }
          size={ButtonSize.SEMILARGE}
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.PRIMARY}
          customStyles={[
            styles.actionButton,
            parseInt(product?.amount || '0') <= 0 && {
              backgroundColor: ColorPalette.TEXT_GREY_100,
            },
          ]}
          bgColor={
            (parseInt(product?.amount || '0') <= 0
              ? ColorPalette.TEXT_GREY_100
              : ColorPalette.ROSE_PURPLE_400) as any
          }
          iconSize={14}
          iconColor={ColorPalette.WHITE as any}
          withShadow={parseInt(product?.amount || '0') > 0}
        />
      </View>

      <FullScreenImageViewer
        visible={isImageViewerVisible}
        images={viewerImages}
        initialIndex={selectedImageIndex}
        onClose={() => setIsImageViewerVisible(false)}
      />

      <Product3DViewer
        visible={is3DViewerVisible}
        onClose={() => setIs3DViewerVisible(false)}
        poster={product?.image_urls?.[0]}
        modelUrl={product3DModelUrl}
      />
      <ReviewModal
        visible={isReviewModalVisible}
        onClose={() => setIsReviewModalVisible(false)}
        onSubmit={handleReviewSubmit}
        productName={product?.product || ''}
        loading={isSubmittingReview}
      />
      <VoiceSearchModal
        isVisible={isVoiceModalVisible}
        onClose={() => setIsVoiceModalVisible(false)}
        onResult={text => handleNavigateToSearchResult(text)}
      />
    </ScreenWrapper>
  );
};

export default ProductDetailScreen;
