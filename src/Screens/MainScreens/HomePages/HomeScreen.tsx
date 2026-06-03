import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  InteractionManager,
  LayoutChangeEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  getCurrentLocation,
  requestLocationPermission,
  getAddressFromCoords,
} from '../../../services/LocationService';

import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import BagIcon from '../../../assets/icons/BagIcon';
import FilterIcon from '../../../assets/icons/FilterIcon';
import FlameIcon from '../../../assets/icons/FlameIcon';
import MicroPhoneFill from '../../../assets/icons/MicroPhoneFill';
import ShoppingBagIcon from '../../../assets/icons/ShoppingBagIcon';
import SortIcon from '../../../assets/icons/SortIcon';

import BestSellerCard from '../../../components/CustomComponents/HomeComponents/BestSellerComponent/BestSellerCard';
import CardHeader from '../../../components/CustomComponents/HomeComponents/CardHeader';
import CategoryBox from '../../../components/CustomComponents/HomeComponents/CategoryBox';
import NewArrivalComponent from '../../../components/CustomComponents/HomeComponents/NewArrivalComponent';
import ProductCard from '../../../components/CustomComponents/HomeComponents/ProductCardComponent/ProductCard';
import RocketDealComponent from '../../../components/CustomComponents/HomeComponents/RoctetDealComponent';
import HomeHeader from '../../../components/CustomComponents/HomeHeaderComponent/HomeHeader';
import { SearchBox } from '../../../components/CustomComponents/SearchBox/SearchBox';
import { Badge } from '../../../components/MainComponents/Badges/Badge';
import { Typography } from '../../../components/MainComponents/Typography/Typography';

import {
  BadgeType,
  BadgeVariant,
} from '../../../components/MainComponents/Badges/Badge.types';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { addToCart } from '../../../services/CartService';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../../../services/WishlistService';
import { Alert, Platform, ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import {
  setSupportInfo,
  setPageIds,
  setMinCartAmount,
  setAppConfiguration,
} from '../../../store/slices/appSlice';
import { addSearch } from '../../../store/slices/searchSlice';
import { addGuestItem, addItemToCart } from '../../../store/slices/cartSlice';
import {
  createScrollAnimations,
  updateAnimationInterpolations,
} from './animationUtils';
import { styles, tabBarStyles } from './HomeScreen.styles';

import {
  bannerImages,
  bestSellerProducts,
  categories,
  featuredImages,
  newArrivalImages,
  newArrivalProducts,
  productsForYou,
  rocketDealProducts,
  sponsoredBrands,
  tabRoutes,
} from './HomeScreen.constants';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigate } from '../../../utils/navigationref';

import { ScrollContext } from '../../../navigation/stacks/BottomTabNavigator/ScrollContext';

import FeaturedComponent from '../../../components/CustomComponents/FeaturedComponent';
import { transformHomeData } from '../../../helpers/homeDataAdaptor';
import CategoryPage from './CategoryPage';
import axios from 'axios';
import { Button } from '../../../components/MainComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/MainComponents/Button';
import ChevronIcon from '../../../assets/icons/ChevronIcon';
import { API_ENDPOINTS } from '../../../config/ApiConfig';
import { Spacing } from '../../../config/globalStyles';
import VoiceSearchModal from '../../../components/CustomComponents/VoiceSearch/VoiceSearchModal';
import LoadingProgressBar from '../../../components/CustomComponents/LoadingProgressBar';
import {
  bannerSecondImages as defaultBannerSecondImages,
  discountBanners as defaultDiscountBanners,
  popularPicksData as defaultPopularPicksData,
  rocketDealsData as defaultRocketDealsData,
} from './HomeScreen.constants';
import { StatusBar } from 'react-native';
import ScreenWrapper from '../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';
import { AuthPopup } from '../../../components/CustomComponents/AuthPopUp/AuthPopUp';
import { showToast } from '../../../components/MainComponents/Toast/ToastHelper';
import { ToastMessages } from '../../../components/MainComponents/Toast/ToastMessages';
import HomeErrorState from '../../../components/CustomComponents/HomeComponents/HomeErrorState/HomeErrorState';
import UpdateAppModal from '../../../components/CustomComponents/UpdateAppModal';

const MemoizedBestSellerCard = memo(BestSellerCard);
const MemoizedCategoryBox = memo(CategoryBox);
const MemoizedProductCard = memo(ProductCard);

interface TabRoute {
  key: string;
  title: string;
  icon: any;
  category_id: string;
  imageUrl?: string;
}

const toHttps = (url: string): string => {
  if (!url) return '';
  let cleanUrl = url;
  if (cleanUrl.includes('surf-images.b-cdn.net')) {
    cleanUrl = cleanUrl.replace('surf-images.b-cdn.net', 'surf.mt');
  }
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    const prefixedUrl = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
    return `https://surf.mt${prefixedUrl}`;
  }
  return cleanUrl.replace(/^http:\/\//i, 'https://');
};

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isVoiceModalVisible, setIsVoiceModalVisible] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const minCartAmount = useSelector((state: RootState) => state.app.minCartAmount);
  const appConfiguration = useSelector((state: RootState) => state.app.appConfiguration);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const initialLayout = { width: Dimensions.get('window').width };
  const [showAuthPopup, setShowAuthPopup] = useState<boolean>(false);
  const hasShownAuthPopup = useRef(false);

  const [address, setAddress] = useState('Detecting Location...');
  const [subAddress, setSubAddress] = useState('Please wait...');

  const [tabIndex, setTabIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [measurementsReady, setMeasurementsReady] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Animation value for tab indicator
  const tabIndicatorPosition = useRef(new Animated.Value(0)).current;
  const tabIndicatorWidth = useRef(new Animated.Value(0)).current;
  // Store both width and position for each tab
  const tabMeasurements = useRef<Array<{ width: number; position: number }>>([]);
  const tabMeasurementsComplete = useRef(false);

  // Get the scroll context from BottomTabNavigator
  const scrollContext = useContext(ScrollContext);
  const scrollY =
    scrollContext?.scrollY || useRef(new Animated.Value(0)).current;

  const headerHeightRef = useRef<number>(0);
  const searchBoxHeightRef = useRef<number>(0);
  const tabBarHeightRef = useRef<number>(0);

  const [animationsReady, setAnimationsReady] = useState(false);

  const prevScrollY = useRef(0);
  const mainScrollViewRef = useRef<typeof Animated.ScrollView>(null);

  const [animations, setAnimations] = useState(() =>
    createScrollAnimations(
      scrollY,
      headerHeightRef,
      searchBoxHeightRef,
      tabBarHeightRef,
    ),
  );

  useEffect(() => {
    if (!userId && !hasShownAuthPopup.current) {
      setShowAuthPopup(true);
      hasShownAuthPopup.current = true;
    }
  }, [userId]);

  // Helper function to safely get tab measurements
  const getTabMeasurements = (measurements: any[], index: number) => {
    if (!measurements || !measurements[index]) {
      return { width: 0, position: 0 };
    }
    return measurements[index];
  };

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
      }
    }, [])
  );

  // Initialize tab measurements for all tabs
  useEffect(() => {
    tabMeasurements.current = tabRoutes.map(() => ({ width: 0, position: 0 }));
  }, []);

  // Fetch location on mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (hasPermission) {
          const coords = await getCurrentLocation();
          const { address: fullAddress, city } = await getAddressFromCoords(
            coords.latitude,
            coords.longitude,
          );

          // Format address for the header
          // Split full address to get a shorter main part
          const addressParts = fullAddress.split(',');
          const mainAddr = addressParts[0] || 'Current Location';
          const restAddr = addressParts.slice(1).join(',').trim() || city;

          setAddress(mainAddr);
          setSubAddress(restAddr);
        } else {
          setAddress('Select Location');
          setSubAddress('Add your delivery address');
        }
      } catch (error) {
        console.error('Error fetching location on mount:', error);
        setAddress('Select Location');
        setSubAddress('Add your delivery address');
      }
    };

    const timer = setTimeout(() => {
      fetchLocation();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const [apiData, setApiData] = useState<{
    categories: any[];
    bestSellerProducts: any[];
    newArrivalProducts: any[];
    rocketDealProducts: any[];
    curatedProducts: any[];
    brands: any[];
    layout: any[];
    banners: any[];
    discountBanners: any[];
    popularPicks: any[];
    rocketDeals: any;
    main_categories: any[];
  }>({
    categories: [],
    bestSellerProducts: [],
    newArrivalProducts: [],
    rocketDealProducts: [],
    curatedProducts: [],
    brands: [],
    layout: [],
    banners: [],
    discountBanners: [],
    popularPicks: [],
    rocketDeals: null,
    main_categories: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleProductsLimit, setVisibleProductsLimit] = useState(20);

  // Cache for storing category-specific data for instant tab switching
  const categoryDataCache = useRef<Record<string, any>>({});
  const isFetchingRef = useRef<Record<string, boolean>>({});

  // Dynamic data with fallbacks
  const bannerSecondImages = apiData.banners?.length > 0 ? apiData.banners : [];
  const discountBanners =
    apiData.discountBanners?.length > 0 ? apiData.discountBanners : [];
  const popularPicksData =
    apiData.popularPicks?.length > 0
      ? apiData.popularPicks
      : defaultPopularPicksData;
  const rocketDealsData = apiData.rocketDeals || defaultRocketDealsData;

  // Create dynamic tab routes from API main_categories
  const dynamicTabRoutes = useMemo(() => {
    if (!apiData.main_categories || apiData.main_categories.length === 0) {
      // If loading or no categories yet, only show the "All" tab to avoid showing demo categories
      if (loading) {
        return [
          {
            key: 'all',
            title: 'All',
            icon: require('../../../assets/images/All.png'),
            category_id: '',
          },
        ] as TabRoute[];
      }

      // Only show the "All" tab if categories are missing or empty to prevent static placeholder tabs
      return [
        {
          key: 'all',
          title: 'All',
          icon: require('../../../assets/images/All.png'),
          category_id: '',
        },
      ] as TabRoute[];
    }

    // Always start with "All" tab
    const tabs: TabRoute[] = [
      {
        key: 'all',
        title: 'All',
        icon: require('../../../assets/images/All.png'),
        category_id: '',
      },
    ];

    // Add all categories from API
    apiData.main_categories.forEach((cat: any) => {
      tabs.push({
        key: cat.category_id,
        title: cat.category.replace(/&amp;/g, '&'), // Decode HTML entities
        icon: BagIcon, // Default icon for all categories
        category_id: cat.category_id,
        imageUrl: toHttps(cat.image_url),
      });
    });

    return tabs;
  }, [apiData.main_categories]);

  // Mapping of tab keys to category IDs
  const tabCategoryMapping: Record<string, string> = useMemo(() => {
    const mapping: Record<string, string> = { all: '' };

    dynamicTabRoutes.forEach((tab: TabRoute) => {
      if (tab.category_id) {
        mapping[tab.key] = tab.category_id;
      }
    });

    return mapping;
  }, [dynamicTabRoutes]);

  // Synchronously initialize tab measurements when routes change
  // We preserve old measurements for stable tabs (identified by key) to prevent indicator disappearing
  useMemo(() => {
    const oldMeasurements = [...tabMeasurements.current];
    const oldRoutes = [...dynamicTabRoutes]; // This might be stale during memo, but we check keys

    tabMeasurements.current = dynamicTabRoutes.map((route, idx) => {
      // Find if this route existed before and where
      const oldIdx = oldRoutes.findIndex(r => r.key === route.key);
      if (
        oldIdx !== -1 &&
        oldMeasurements[oldIdx] &&
        oldMeasurements[oldIdx].width > 0
      ) {
        return oldMeasurements[oldIdx];
      }
      return { width: 0, position: 0 };
    });

    // Check if we still have the active tab measured
    if (tabMeasurements.current[tabIndex]?.width > 0) {
      tabIndicatorPosition.setValue(tabMeasurements.current[tabIndex].position);
      tabIndicatorWidth.setValue(tabMeasurements.current[tabIndex].width);
      setMeasurementsReady(true);
    } else {
      tabMeasurementsComplete.current = false;
      setMeasurementsReady(false);
    }
  }, [dynamicTabRoutes]);

  useEffect(() => {
    // Check if we already finished measuring (rare race condition where layout happened synchronously or very fast)
    // to prevent toggling valid ready state to false
    if (!tabMeasurementsComplete.current) {
      setMeasurementsReady(false);

      // Safety timeout: If measurements don't complete in 500ms, force ready
      // This handles cases where some tabs might not layout (e.g. off screen) but we want to show what we have
      const timer = setTimeout(() => {
        if (!tabMeasurementsComplete.current) {
          setMeasurementsReady(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [dynamicTabRoutes]);

  // Track current tab index to prevent stale closures/race conditions
  const tabIndexRef = useRef(tabIndex);
  tabIndexRef.current = tabIndex;

  const fetchData = useCallback(
    async (categoryId?: string, isPrefetch: boolean = false) => {
      const cacheKey = categoryId || 'all';

      // Prevent duplicate fetches for the same category
      if (isFetchingRef.current[cacheKey]) {
        return;
      }

      const activeRoute = dynamicTabRoutes[tabIndexRef.current];
      const activeCategoryId = activeRoute?.category_id || '';
      const isRequestForCurrentTab = (categoryId || '') === activeCategoryId;

      // Only show loading if it's the current tab (don't show for prefetches)
      if (isRequestForCurrentTab && !isPrefetch) {
        setError(false);
        // If we have cached data, show it immediately (optimistic UI)
        if (categoryDataCache.current[cacheKey]) {
          console.log(
            `Using cached data for category: '${categoryId || 'All'}'`,
          );
          setApiData(prev => ({
            ...prev,
            ...categoryDataCache.current[cacheKey],
          }));
          setLoading(false);
        } else {
          // No cache, show loading
          setLoading(true);
        }
      }

      // Fetch fresh data in the background
      isFetchingRef.current[cacheKey] = true;
      console.log(`Background fetching fresh data for: '${cacheKey}'`);

      try {
        const response = await axios.get(
          API_ENDPOINTS.HOME_LAYOUT(400, userId || '', categoryId),
        );

        if (!response.data) {
          throw new Error('Empty response data');
        }

        if (response.data?.nt_support_whatsapp !== undefined) {
          dispatch(
            setSupportInfo({
              whatsapp: response.data.nt_support_whatsapp,
              email: response.data.nt_support_email,
            }),
          );

          if (response.data && response.data.page_ids) {
            console.log(
              'HomeScreen: Dispatching pageIds',
              response.data.page_ids,
            );
            dispatch(setPageIds(response.data.page_ids));
          } else {
            console.warn(
              'HomeScreen: page_ids missing in Home API response',
              response.data,
            );
          }
        }

        if (response.data?.min_cart_amount !== undefined) {
          dispatch(setMinCartAmount(parseFloat(response.data.min_cart_amount)));
        }

        let appConfig = response.data?.app_configuration;

        // If not at root, check inside layout array as per user's example
        if (!appConfig && response.data?.layout && Array.isArray(response.data.layout)) {
          const configBlock = response.data.layout.find(
            (b: any) => b && b.app_configuration,
          );
          if (configBlock) {
            appConfig = configBlock.app_configuration;
          }
        }

        if (appConfig) {
          dispatch(setAppConfiguration(appConfig));

          // Check for update
          const androidVer = String(appConfig.android_version || '').trim();
          const iosVer = String(appConfig.ios_version || '').trim();

          console.log(`Update Check - OS: ${Platform.OS}, iOS Ver: "${iosVer}", Android Ver: "${androidVer}"`);

          if (Platform.OS === 'android' && androidVer && androidVer !== '1') {
            setIsUpdateModalVisible(true);
          } else if (Platform.OS === 'ios' && iosVer && iosVer !== '1') {
            setIsUpdateModalVisible(true);
          }
        }


        const transformed = transformHomeData(response.data);

        // Logic to prevent overwriting with empty/bad data if we already have good data
        const hasContent =
          transformed.layout?.length > 0 ||
          transformed.bestSellerProducts?.length > 0;

        // If api returns empty data but we have cache, don't update cache or UI with empty data
        if (!hasContent && categoryDataCache.current[cacheKey]) {
          if (isRequestForCurrentTab && !isPrefetch) setLoading(false);
          isFetchingRef.current[cacheKey] = false;
          return;
        }

        // Store in cache
        categoryDataCache.current[cacheKey] = transformed;

        // CRITICAL: Only update UI state if we are still on the tab for this data
        // Check current tab again because it might have changed during await
        const currentRouteNow = dynamicTabRoutes[tabIndexRef.current];
        const currentCategoryNow = currentRouteNow?.category_id || '';
        const isStillCurrentTab = (categoryId || '') === currentCategoryNow;

        if (isStillCurrentTab && !isPrefetch) {
          setApiData(prev => {
            // Preserve main_categories if new one is empty
            const newMainCategories =
              transformed.main_categories &&
                transformed.main_categories.length > 0
                ? transformed.main_categories
                : prev.main_categories && prev.main_categories.length > 0
                  ? prev.main_categories
                  : [];

            return {
              ...prev,
              ...transformed,
              main_categories: newMainCategories,
            };
          });
        }
      } catch (error: any) {
        console.log('Error fetching home layout:', error.message);
        if (!isPrefetch && !categoryDataCache.current[cacheKey]) {
          setError(true);
        }
      } finally {
        // Only turn off loading if this was the active request
        const currentRouteNow = dynamicTabRoutes[tabIndexRef.current];
        const currentCategoryNow = currentRouteNow?.category_id || '';
        if ((categoryId || '') === currentCategoryNow && !isPrefetch) {
          setLoading(false);
        }
        isFetchingRef.current[cacheKey] = false;
      }
    },
    [userId, dispatch, dynamicTabRoutes],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const selectedRoute = dynamicTabRoutes[tabIndexRef.current];
    if (selectedRoute) {
      const categoryId = selectedRoute.category_id || '';
      // Force fetch fresh data
      fetchData(categoryId, false).then(() => {
        setRefreshing(false);
      });
    } else {
      setRefreshing(false);
    }
  }, [dynamicTabRoutes, fetchData]);

  useEffect(() => {
    const syncWishlist = async () => {
      if (!userId) return;
      const result = await getWishlist(userId);
      if (result.success) {
        const favs: Record<string, any> = {};
        result.products.forEach((p: any) => {
          favs[p.product_id] = p.wishlist_id || p.item_id || true;
        });
        setFavorites(favs);
      }
    };

    syncWishlist();
  }, [userId]);

  // Initial fetch on mount to get categories and root layout
  useEffect(() => {
    fetchData('', false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const syncWishlist = async () => {
        if (!userId) return;
        const result = await getWishlist(userId);
        if (result.success) {
          const favs: Record<string, any> = {};
          result.products.forEach((p: any) => {
            favs[p.product_id] = p.wishlist_id || p.item_id || true;
          });
          setFavorites(favs);
        }
      };
      syncWishlist();
    }, [userId]),
  );
  // -----------------------

  useEffect(() => {
    if (
      headerHeightRef.current > 0 &&
      searchBoxHeightRef.current > 0 &&
      tabBarHeightRef.current > 0 &&
      animationsReady
    ) {
      const updatedAnimations = updateAnimationInterpolations(
        scrollY,
        headerHeightRef,
        searchBoxHeightRef,
        tabBarHeightRef,
      );
      setAnimations(updatedAnimations);
    }
  }, [animationsReady, scrollY]);

  const onHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    headerHeightRef.current = height;
    checkIfAnimationsReady();
  }, []);

  const onSearchBoxLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    searchBoxHeightRef.current = height;
    checkIfAnimationsReady();
  }, []);

  const onTabBarLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    tabBarHeightRef.current = height;
    checkIfAnimationsReady();
  }, []);

  const checkIfAnimationsReady = useCallback(() => {
    if (
      headerHeightRef.current > 0 &&
      searchBoxHeightRef.current > 0 &&
      tabBarHeightRef.current > 0
    ) {
      setAnimationsReady(true);
    }
  }, []);

  const syncWishlist = useCallback(async () => {
    if (!userId) return;
    try {
      const result = await getWishlist(userId);
      if (result.success) {
        const favs: Record<string, string | boolean> = {};
        result.products.forEach((p: any) => {
          favs[p.product_id] = p.wishlist_id || p.item_id || true;
        });
        setFavorites(favs);
      }
    } catch (error) {
      console.error('Error syncing wishlist:', error);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      syncWishlist();
    }, [syncWishlist]),
  );


  const toggleFavorite = useCallback(
    async (productId: string) => {
      if (!userId) {
        showToast(ToastMessages.CommonToastMessages.loginToAddWishlist, 'error');
        return;
      }

      const isAdding = !favorites[productId];
      const previousState = favorites[productId];

      // Optimistic update
      setFavorites(prev => {
        const next = { ...prev };
        if (isAdding) {
          next[productId] = true;
        } else {
          delete next[productId];
        }
        return next;
      });

      try {
        if (isAdding) {
          const result = await addToWishlist(userId, productId);
          if (result && (result.success || result.result)) {
            showToast(ToastMessages.ProductDetailScreen.wishlistAdded, 'success');
            await syncWishlist();
          } else {
            showToast(
              ToastMessages.ProductDetailScreen.wishlistFailed(
                result?.message || 'Failed to add',
              ),
              'error',
            );
            // Rollback on fail
            setFavorites(prev => ({
              ...prev,
              [productId]: previousState,
            }));
          }
        } else {
          // Removal logic
          // Find the cart_id (wishlist_id) for this product
          let cartId = typeof previousState === 'string' ? previousState : null;

          if (!cartId) {
            const allProducts = [
              ...(apiData.bestSellerProducts || []),
              ...(apiData.newArrivalProducts || []),
              ...(apiData.rocketDealProducts || []),
              ...(apiData.curatedProducts || []),
            ];
            const product = allProducts.find(
              p => String(p.id) === String(productId),
            );
            cartId = product?.cart_id;
          }

          if (!cartId) {
            // If still no cartId, we use productId as fallback (services might handle it)
            cartId = productId;
          }

          const result = await removeFromWishlist(userId, cartId);
          if (result && (result.success || result.result)) {
            showToast(
              ToastMessages.ProductDetailScreen.wishlistRemoved,
              'error',
            );
            await syncWishlist();
          } else {
            showToast(
              ToastMessages.ProductDetailScreen.wishlistFailed(
                result?.message || 'Failed to remove',
              ),
              'error',
            );
            // Rollback on fail
            setFavorites(prev => ({
              ...prev,
              [productId]: previousState,
            }));
          }
        }
      } catch (error) {
        console.error('Toggle favorite error:', error);
        showToast(ToastMessages.CommonToastMessages.unexpectedError, 'error');
        // Rollback
        setFavorites(prev => ({
          ...prev,
          [productId]: previousState,
        }));
      }
    },
    [favorites, userId, apiData],
  );

  const handleAddToCart = useCallback(
    async (productId: string, productObj?: any) => {
      if (!userId) {
        if (!apiData) return;
        let product = productObj;
        if (!product) {
          const allProducts = [
            ...(apiData.bestSellerProducts || []),
            ...(apiData.newArrivalProducts || []),
            ...(apiData.rocketDealProducts || []),
            ...(apiData.curatedProducts || []),
          ];
          product = allProducts.find(
            p => p && String(p.id) === String(productId),
          );
        }

        if (product) {
          dispatch(
            addGuestItem({
              product_id: String(product.id),
              product: product.title,
              amount: 1,
              price: String(product.discountedPrice || product.price || '0'),
              display_price:
                product.format_price || `€${product.discountedPrice || 0}`,
              main_pair: product.imageSource
                ? {
                  detailed: {
                    image_path:
                      product.imageSource?.uri || product.imageSource,
                  },
                }
                : undefined,
            }),
          );
          if (Platform.OS === 'android') {
            showToast(ToastMessages.CommonToastMessages.itemAddedGuestCart);
          } else {
            showToast(ToastMessages.CommonToastMessages.itemAddedGuestCart);
          }
        }
        return;
      }

      let product = productObj;
      if (!product) {
        const allProducts = [
          ...(apiData?.bestSellerProducts || []),
          ...(apiData?.newArrivalProducts || []),
          ...(apiData?.rocketDealProducts || []),
          ...(apiData?.curatedProducts || []),
        ];
        product = allProducts.find(
          p => p && String(p.id) === String(productId),
        );
      }

      (dispatch as any)(
        addItemToCart({
          userId,
          productId,
          productDetails: product
            ? {
              title: product.title,
              price: String(product.discountedPrice || product.price || '0'),
              display_price:
                product.format_price || `€${product.discountedPrice || 0}`,
              image: product.imageSource?.uri || product.imageSource,
            }
            : undefined,
        }),
      )
        .unwrap()
        .then(() => {
          if (Platform.OS === 'android') {
            showToast(ToastMessages.CommonToastMessages.itemAddedToCart);
          } else {
            showToast(ToastMessages.CommonToastMessages.itemAddedToCart);
          }
        })
        .catch((err: any) => {
          if (Platform.OS === 'android') {
            showToast(
              ToastMessages.CommonToastMessages.addToCartFailed(err),
              'error',
            );
          } else {
            showToast(
              ToastMessages.CommonToastMessages.addToCartFailed(err),
              'error',
            );
          }
        });
    },
    [userId, apiData, dispatch],
  );

  const handleCardPress = useCallback((productId: string) => {
    navigate('ProductDetail' as never, { productId } as never);
  }, []);

  const handleCategoryPress = useCallback((category: string) => {
    console.log(`Category ${category} pressed`);
  }, []);

  const renderNewArrivalItem = () => {
    return (
      <FlatList
        data={newArrivalImages}
        renderItem={({ item }: { item: any }) => (
          <NewArrivalComponent
            imageSource={item.imageSource}
            customStyles={{ width: getScreenWidth(28) }}
            borderColors={item.borderColors}
            backgroundColors={item.backgroundColors}
            title={item.title}
          />
        )}
        keyExtractor={item => item.id}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: getScreenWidth(3) }}
      />
    );
  };

  const renderRocketDealItem = useCallback(
    ({ item }: { item: any }) => (
      <RocketDealComponent imageSource={item.imageSource} title={item.title} />
    ),
    [],
  );

  const renderBestSellerItem = useCallback(
    ({ item, key, containerStyle }: any) => (
      <MemoizedBestSellerCard
        key={key || item.id}
        id={item.id}
        imageSource={item.imageSource}
        title={item.title}
        price={item.price}
        rating={item.rating}
        isFavorite={favorites[item.id]}
        onToggleFavorite={() => toggleFavorite(item.id)}
        onAddToCart={() => handleAddToCart(item.id, item)}
        onCardPress={() => handleCardPress(item.id)}
        strikethroughPrice={item.originalPrice}
        titleVariant={TypographyVariant.LMEDIUM_SEMIBOLD}
        priceVariant={TypographyVariant.LMEDIUM_SEMIBOLD}
        buttonText={'Add'}
        containerStyle={containerStyle}
        stock={item.stock}
      />
    ),
    [favorites, toggleFavorite, handleAddToCart, handleCardPress],
  );

  const renderCategoryItem = useCallback(
    ({ item, key }: { item: any; key?: any }) => (
      <MemoizedCategoryBox
        key={key || item.id}
        imageSource={item.imageSource}
        title={item.title}
        onPress={() => handleCategoryPress(item.title)}
      />
    ),
    [handleCategoryPress],
  );

  const renderFeaturedSection = () => {
    return (
      <View style={styles.featuredContainer}>
        <FlatList
          data={featuredImages}
          renderItem={({ item }: { item: any }) => (
            <FeaturedComponent
              imageSource={item.imageSource}
              customStyles={{ width: getScreenWidth(28) }}
              borderColors={item.borderColors}
              backgroundColors={item.backgroundColors}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: getScreenWidth(3) }}
        />
      </View>
    );
  };

  const featuredSection = renderFeaturedSection();
  const newArrivalSection = renderNewArrivalItem();

  const renderFilterBadges = () => (
    <View style={styles.filtersContainer}>
      {[
        { text: 'Filters', leftIcon: FilterIcon, rightIcon: ArrowDownIcon },
        { text: 'Sort', leftIcon: SortIcon, rightIcon: ArrowDownIcon },
        { text: 'Category', rightIcon: ArrowDownIcon, needsEllipsis: true },
      ].map((badge, index) => (
        <View key={`badge-${index}`} style={{ flex: 1 }}>
          <Badge
            text={badge.text}
            variant={BadgeVariant.OUTLINE}
            customContainerStyle={styles.badgeContainer}
            textVariant={TypographyVariant.LMEDIUM_MEDIUM}
            rightIcon={badge.rightIcon as any}
            leftIcon={badge.leftIcon as any}
            customBorderColor={ColorPalette.WelcomeBack as string}
            iconSize={16}
            customTextColor={ColorPalette.TEXT_GREY_400 as string}
            onPress={() => { }}
          />
        </View>
      ))}
    </View>
  );

  const renderProductsGrid = () => {
    const productsToRender = apiData.curatedProducts || [];

    if (productsToRender.length === 0) {
      return null;
    }

    // Use visibleProductsLimit for in-place "Show More"
    const limit = visibleProductsLimit;
    const productsToShow = productsToRender.slice(0, limit);
    const hasMoreInLocal = productsToRender.length > limit;

    return (
      <View style={styles.bestSellerContainer}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: getScreenHeight(0.5),
          }}>
          {productsToShow.map((product: any, index: number) => {
            const isLastRow = index >= productsToShow.length - 2;

            return (
              <View
                style={{
                  width: getScreenWidth(43.25),
                  marginBottom: isLastRow && !hasMore ? 0 : 8,
                }}
                key={product.id}>
                <MemoizedProductCard
                  id={String(product.id)}
                  testID={String(product.id)}
                  imageSource={product.imageSource}
                  title={product.title}
                  discountedPrice={product.discountedPrice}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  deliveryInfo={product.deliveryInfo}
                  isFavorite={favorites[product.id]}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  onAddToCart={() => handleAddToCart(product.id, product)}
                  onCardPress={() => handleCardPress(product.id)}
                />
              </View>
            );
          })}
        </View>

        {hasMoreInLocal ? (
          <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <Button
              text="Show More"
              onPress={() => setVisibleProductsLimit(prev => prev + 20)}
              variant={ButtonVariant.PRIMARY}
              type={ButtonType.OUTLINED}
              size={ButtonSize.MEDIUM}
              customStyles={{ width: 150 }}
              customTextStyles={{ color: ColorPalette.ROSE_PURPLE_300 }}
            />
          </View>
        ) : productsToRender.length > 20 && (
          <Button
            text="See All Products"
            rightIcon={ChevronIcon}
            iconSize={16}
            onPress={() => handleNavigateToSearchResult('Curated')}
            state={ButtonState.DEFAULT}
            size={ButtonSize.LARGE}
            type={ButtonType.PRIMARY}
            customStyles={{
              borderRadius: Spacing.XSmall,
              marginTop: 12,
            }}
            bgColor={ColorPalette.WelcomeBack as string}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 as string }}
            variant={ButtonVariant.PRIMARY}
            imageOverlapOffset={-20}
            leftImages={[
              {
                source: require('../../../assets/images/featured2.png'),
                style: { width: 15, height: 15 },
                containerStyle: {
                  backgroundColor: ColorPalette.PEACH_00,
                  borderRadius: Spacing.XXXLarge,
                  padding: getScreenWidth(2),
                  borderWidth: 2,
                  borderColor: ColorPalette.WHITE as string,
                },
              },
              {
                source: require('../../../assets/images/featured2.png'),
                style: { width: 15, height: 15 },
                containerStyle: {
                  backgroundColor: ColorPalette.PEACH_00,
                  borderRadius: Spacing.XXXLarge,
                  padding: getScreenWidth(2),
                  borderWidth: 2,
                  borderColor: ColorPalette.WHITE as string,
                },
              },
              {
                source: require('../../../assets/images/featured2.png'),
                style: { width: 15, height: 15 },
                containerStyle: {
                  backgroundColor: ColorPalette.PEACH_00,
                  borderRadius: Spacing.XXXLarge,
                  padding: getScreenWidth(2),
                  borderWidth: 2,
                  borderColor: ColorPalette.WHITE as string,
                },
              },
            ]}
          />
        )}
      </View>
    );
  };

  const renderDiscountTimer = () => (
    <View style={styles.dealHeaderContainer}>
      <CardHeader
        title="Surf Rocket Deals"
        showIcon
        showRightSection={false}
        icon={<FlameIcon style={undefined} size={17} />}
        alternativeImage={require('../../../assets/images/rocket.png')}
        alternativeImageStyle={{ right: 10 }}
      />
      <View style={styles.discountTimerContainer}>
        <Typography
          text="Discount ends in"
          variant={TypographyVariant.LSMALL_MEDIUM}
          customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
        />
        <Badge
          text="16h: 33m: 20s"
          variant={BadgeVariant.OUTLINE}
          textVariant={TypographyVariant.LSMALL_MEDIUM}
          type={BadgeType.PRIMARY}
          customContainerStyle={styles.timerBadge}
          customTextColor={ColorPalette.ORANGE_300}
          customBorderColor={ColorPalette.ORANGE_300}
        />
      </View>
    </View>
  );

  const keyExtractorById = useCallback((item: any) => item.id, []);

  const MaltaMadeTab = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Typography
        text="Malta Made Tab Content"
        variant={TypographyVariant.H4_MEDIUM}
      />
    </View>
  );

  const WomenTab = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Typography
        text="Women Tab Content"
        variant={TypographyVariant.H4_MEDIUM}
      />
    </View>
  );

  const MenTab = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Typography
        text="Men Tab Content"
        variant={TypographyVariant.H4_MEDIUM}
      />
    </View>
  );

  const BeautyTab = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Typography
        text="Beauty Tab Content"
        variant={TypographyVariant.H4_MEDIUM}
      />
    </View>
  );

  // Improved function to measure tab dimensions
  const measureTab = (event: any, index: number) => {
    const { width, x } = event.nativeEvent.layout;
    console.log(`Tab ${index} measured: width=${width}, x=${x}`);

    tabMeasurements.current[index] = {
      width,
      position: x,
    };

    // Check if all tabs are measured
    const allMeasured = tabMeasurements.current.every(tab => tab.width > 0);

    // If all are measured OR just the current active tab is measured, we can show the indicator
    const currentTabMeasured = tabMeasurements.current[tabIndex]?.width > 0;

    if (allMeasured || currentTabMeasured) {
      const wasReady = measurementsReady;
      if (allMeasured && !tabMeasurementsComplete.current) {
        tabMeasurementsComplete.current = true;
      }

      if (!wasReady) {
        setMeasurementsReady(true);
      }

      // Ensure indicator is at the correct position for the ACTIVE tab
      // Only on initial setup to prevent fluctuation during animations or re-layouts
      if (index === tabIndex && tabMeasurements.current[index] && !wasReady) {
        tabIndicatorPosition.setValue(tabMeasurements.current[index].position);
        tabIndicatorWidth.setValue(tabMeasurements.current[index].width);
      }
    }
  };

  const onPageScroll = useCallback(
    (e: any) => {
      const { position, offset } = e.nativeEvent;
      const currentTab = tabMeasurements.current[position];
      const nextTab = tabMeasurements.current[position + 1];

      if (currentTab && (offset === 0 || !nextTab)) {
        tabIndicatorPosition.setValue(currentTab.position);
        tabIndicatorWidth.setValue(currentTab.width);
      } else if (currentTab && nextTab) {
        // Elastic stretching logic:
        // Refining exponents for a more "snappy" yet fluid feel
        const x1 =
          currentTab.position +
          (nextTab.position - currentTab.position) * Math.pow(offset, 1.7);
        const x2 =
          currentTab.position +
          currentTab.width +
          (nextTab.position +
            nextTab.width -
            (currentTab.position + currentTab.width)) *
          Math.pow(offset, 0.4);

        const newPos = x1;
        const newWidth = x2 - x1;

        tabIndicatorPosition.setValue(newPos);
        tabIndicatorWidth.setValue(newWidth);
      }
    },
    [tabIndicatorPosition, tabIndicatorWidth],
  );

  const onTabPress = useCallback(
    (index: number) => {
      // 1. Scroll tab bar into center
      const tab = tabMeasurements.current[index];
      if (tab) {
        scrollViewRef.current?.scrollTo({
          x: Math.max(0, tab.position - getScreenWidth(50) + tab.width / 2),
          animated: true,
        });
      }

      // 2. Control the PagerView
      pagerRef.current?.setPage(index);
      setTabIndex(index);
    },
    [pagerRef, tabIndex],
  );

  const renderTabBar = () => (
    <Animated.View
      onLayout={onTabBarLayout}
      style={[
        animations.tabBarStyle,
        tabBarStyles.glassmorphismContainer,
        {
          zIndex: 10,
          paddingTop: 0,
          elevation: 4,
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      ]}>
      {/* <View style={styles.headerLine}>
        <Typography
          variant={TypographyVariant.PXSMALL_MEDIUM}
          text={`MINIMUM ORDER VALUE: €${minCartAmount} 7-DAY RETURN MINIMUM ORDER VALUE: €${minCartAmount}`}
          customTextStyles={styles.headerLineText}
        />
      </View> */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        style={{
          backgroundColor: ColorPalette.WHITE,
          borderBottomWidth: 0.5,
          borderColor: ColorPalette.BACKGROUND_GREY_100,
        }}
        scrollEventThrottle={16}>
        <View style={tabBarStyles.tabsContainer}>
          {dynamicTabRoutes.map((route, index) => {
            const isActive = index === tabIndex;
            const IconComponent = route.icon;
            const hasImage = route.imageUrl && !failedImages[route.key];

            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => onTabPress(index)}
                style={tabBarStyles.tabButton}
                onLayout={e => measureTab(e, index)}>
                <Animated.View
                  style={{
                    alignItems: 'center',
                    opacity: 1,
                    transform: [{ scale: isActive ? 1.05 : 1 }],
                  }}>
                  {isActive ? (
                    <LinearGradient
                      colors={['rgba(217,141,250,0.8)', 'rgba(255,255,255,0)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={{
                        width: getScreenWidth(11),
                        height: getScreenHeight(4.8),
                        paddingVertical: getScreenHeight(0.5),
                        paddingHorizontal: getScreenWidth(1.7),
                        borderRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {hasImage ? (
                        <Image
                          source={{ uri: route.imageUrl }}
                          style={{
                            width: getScreenWidth(10),
                            height: getScreenHeight(4.5),
                            resizeMode: 'cover',
                            borderRadius: 12,
                          }}
                          onError={() =>
                            setFailedImages(prev => ({
                              ...prev,
                              [route.key]: true,
                            }))
                          }
                        />
                      ) : // Fallback Icon for Active State
                        typeof IconComponent === 'function' ? (
                          <IconComponent size={24} color={ColorPalette.WHITE} />
                        ) : (
                          <Image
                            source={IconComponent}
                            style={{
                              width: getScreenWidth(10),
                              height: getScreenHeight(4.5),
                              resizeMode: 'contain',
                              aspectRatio: 1,
                            }}
                          />
                        )}
                    </LinearGradient>
                  ) : (
                    <View
                      style={{
                        width: getScreenWidth(11),
                        height: getScreenHeight(4.8),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {hasImage ? (
                        <Image
                          source={{ uri: route.imageUrl }}
                          style={{
                            width: getScreenWidth(10),
                            height: getScreenHeight(4.5),
                            borderRadius: 12,
                            opacity: 1,
                          }}
                          resizeMode="cover"
                          onError={() =>
                            setFailedImages(prev => ({
                              ...prev,
                              [route.key]: true,
                            }))
                          }
                        />
                      ) : // Fallback Icon for Inactive State
                        typeof IconComponent === 'function' ? (
                          <IconComponent
                            size={24}
                            color={ColorPalette.TEXT_GREY_400}
                          />
                        ) : (
                          <Image
                            source={IconComponent}
                            style={{
                              width: getScreenWidth(10),
                              height: getScreenHeight(4.5),
                              resizeMode: 'contain',
                              aspectRatio: 1,
                              opacity: 1,
                            }}
                          />
                        )}
                    </View>
                  )}
                  <Typography
                    text={route.title}
                    variant={
                      isActive
                        ? TypographyVariant.LSMALL_SEMIBOLD
                        : TypographyVariant.LSMALL_MEDIUM
                    }
                    customTextStyles={{
                      color: ColorPalette.BLACK,
                      marginTop: getScreenHeight(0.75),
                    }}
                  />
                </Animated.View>
              </TouchableOpacity>
            );
          })}

          {/* Improved elastic indicator with gradient */}
          {measurementsReady && (
            <Animated.View
              style={[
                tabBarStyles.indicator,
                {
                  width: tabIndicatorWidth,
                  transform: [{ translateX: tabIndicatorPosition }],
                  overflow: 'hidden',
                },
              ]}>
              <LinearGradient
                colors={[ColorPalette.HOME_BLUE as string, '#4facfe']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            </Animated.View>
          )}
        </View>
      </ScrollView>
      <LoadingProgressBar isLoading={loading} />
    </Animated.View>
  );

  const handleNavigateToSearchResult = useCallback(
    (searchQuery = '') => {
      if (searchQuery.trim()) {
        dispatch(addSearch(searchQuery));
      }
      navigate('MainScreens', {
        screen: 'Search',
        params: {
          screen: 'SearchResultScreen',
          params: { searchQuery },
        },
      });
    },
    [dispatch],
  );

  return (
    <ScreenWrapper
      backgroundColor={ColorPalette.HOME_BLUE}
      edges={['top']}
      StatusBar={true}>
      <View style={{ flex: 1, backgroundColor: ColorPalette.WHITE }}>
        <Animated.View
          style={[animations.headerStyle]}
          onLayout={onHeaderLayout}>
          <HomeHeader
            addressMain={address}
            subAddress={subAddress}
            containerStyles={styles.headerCustom}
          />
        </Animated.View>

        <Animated.View
          style={[
            animations.searchBarStyle,
            { backgroundColor: ColorPalette.HOME_BLUE },
          ]}
          onLayout={onSearchBoxLayout}>
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => handleNavigateToSearchResult('')}>
            <SearchBox
              value={searchText}
              onChangeText={setSearchText}
              placeholder={`Search For "Products"`}
              customContainerStyle={styles.searchBoxCustom}
              customInputStyle={styles.inputCustom}
              iconColor={ColorPalette.TEXT_GREY_400}
              iconStroke={2}
              iconSize={18}
              placeholderColor={ColorPalette.TEXT_GREY_300}
              editable={false}
            />
            <View style={styles.dividerContainer}>
              <View style={styles.divider}></View>
            </View>
            <View style={styles.micIconContainer}>
              <MicroPhoneFill
                size={20}
                color="#9010CF"
                style={undefined}
                onPress={() => setIsVoiceModalVisible(true)}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {renderTabBar()}

        {/* Horizontal Paging for "Amazon/Flipkart-like" smooth transitions */}
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          scrollEnabled={false}
          onPageScroll={onPageScroll}
          onPageSelected={e => {
            const index = e.nativeEvent.position;
            setTabIndex(index);

            // Scroll the tab bar scrollview to keep the selected tab centered
            const tab = tabMeasurements.current[index];
            if (tab) {
              scrollViewRef.current?.scrollTo({
                x: Math.max(
                  0,
                  tab.position - getScreenWidth(50) + tab.width / 2,
                ),
                animated: true,
              });
            }
          }}
        // Prefetch/Lazy-load logic: We render current and adjacent tabs
        >
          {dynamicTabRoutes.map((route, index) => {
            const isTabActive = tabIndex === index;
            const isNearby = Math.abs(tabIndex - index) <= 1;

            return (
              <View key={route.key} style={{ flex: 1 }}>
                {error &&
                  !categoryDataCache.current[route.category_id || 'all'] ? (
                  <HomeErrorState
                    onRetry={() => fetchData(route.category_id)}
                  />
                ) : isNearby ? (
                  <CategoryPage
                    categoryId={route.category_id}
                    userId={userId || ''}
                    isActive={isTabActive}
                    initialData={
                      categoryDataCache.current[route.category_id || 'all']
                    }
                    onDataFetched={(catId, data) => {
                      categoryDataCache.current[catId || 'all'] = data;
                    }}
                    onLoadingUpdate={setLoading}
                    // Forward all required props to MainContent
                    styles={styles}
                    animations={animations}
                    scrollY={scrollY}
                    prevScrollY={prevScrollY}
                    bannerSecondImages={bannerSecondImages}
                    categories={apiData.categories}
                    renderCategoryItem={renderCategoryItem}
                    keyExtractorById={keyExtractorById}
                    bestSellerProducts={apiData.bestSellerProducts}
                    renderBestSellerItem={renderBestSellerItem}
                    bannerImages={bannerImages}
                    newArrivalProducts={apiData.newArrivalProducts}
                    newArrivalSection={newArrivalSection}
                    renderDiscountTimer={renderDiscountTimer}
                    rocketDealProducts={apiData.rocketDealProducts}
                    renderRocketDealItem={renderRocketDealItem}
                    renderFilterBadges={renderFilterBadges}
                    renderProductsGrid={renderProductsGrid}
                    featuredSection={featuredSection}
                    featuredImages={featuredImages}
                    sponsoredBrands={apiData.brands}
                    discountBanners={apiData.discountBanners}
                    popularPicksData={popularPicksData}
                    rocketDealsData={rocketDealsData}
                    favorites={favorites}
                  />
                ) : (
                  <View style={{ flex: 1 }} />
                )}
              </View>
            );
          })}
        </PagerView>
        <VoiceSearchModal
          isVisible={isVoiceModalVisible}
          onClose={() => setIsVoiceModalVisible(false)}
          onResult={text => handleNavigateToSearchResult(text)}
        />
        <AuthPopup
          visible={showAuthPopup && !isUpdateModalVisible}
          setShowAuthPopup={setShowAuthPopup}
          onClose={() => setShowAuthPopup(false)}
        />
        <UpdateAppModal
          isVisible={isUpdateModalVisible}
          updateUrl={
            Platform.OS === 'android'
              ? appConfiguration?.android_url || ''
              : appConfiguration?.ios_url || ''
          }
        />
        {/* <LoadingProgressBar isLoading={loading} /> */}
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;
