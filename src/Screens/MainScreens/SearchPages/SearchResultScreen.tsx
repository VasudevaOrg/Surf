import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar,
  ToastAndroid,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryBox from '../../../components/CustomComponents/HomeComponents/CategoryBox';
import SearchIcon from '../../../assets/icons/SearchIcon';
import FilterBadges from '../../../components/CustomComponents/FilterComponent/FilterBadges';
import { MenuItem } from '../../../components/CustomComponents/MenuItem/MenuItem';
import ProductCard from '../../../components/CustomComponents/SearchComponents/SearchResultCardComponent/ProductCard';
import { SearchBox } from '../../../components/CustomComponents/SearchBox/SearchBox';
import MicrophoneIcon from '../../../assets/icons/MicrophoneIcon';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonState,
  ButtonVariant,
} from '../../../components/MainComponents/Button';
import BasicSkeleton from '../../../components/MainComponents/Skeleton/BasicSkeleton';
import { API_ENDPOINTS, BASE_URL } from '../../../config/ApiConfig';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../../../services/WishlistService';
import { goBack, navigate } from '../../../utils/navigationref';
import { styles } from './SearchScreen.styles';
import VoiceSearchModal from '../../../components/CustomComponents/VoiceSearch/VoiceSearchModal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSearch,
  clearHistory,
  removeSearch,
} from '../../../store/slices/searchSlice';
import { addGuestItem, addItemToCart } from '../../../store/slices/cartSlice';
import { RootState } from '../../../store';
import SearchResultSkeleton from '../../../components/CustomComponents/SearchComponents/SearchResultSkeleton';
import ScreenWrapper from '../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeft';
import HistoryIcon from '../../../assets/icons/HistoryIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { ToastMessages } from '../../../components/MainComponents/Toast/ToastMessages';
import { showToast } from '../../../components/MainComponents/Toast/ToastHelper';
import { CartIcon } from '../../../assets/icons/BottomNavIcons';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';

const MemoizedMenuItem = React.memo(MenuItem);

const CustomSearchBox = React.memo(
  ({
    value,
    onChangeText,
    placeholder,
    onSubmitEditing,
    onMicPress,
  }: {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    onSubmitEditing?: () => void;
    onMicPress?: () => void;
  }) => {
    return (
      <View style={styles.searchBoxContainer}>
        <SearchBox
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          customContainerStyle={styles.searchInput}
          iconColor={ColorPalette.TEXT_GREY_400 as string}
          iconSize={20}
          iconStroke={2}
          placeholderColor={ColorPalette.TEXT_GREY_100 as string}
          editable={true}
          autoFocus={!value}
          onSubmitEditing={onSubmitEditing}
        />
        <View style={styles.micIconContainer}>
          <MicrophoneIcon
            size={20}
            color="#606060"
            style={undefined}
            onPress={onMicPress}
          />
        </View>
      </View>
    );
  },
);

const SearchSuggestions = React.memo(
  ({ suggestions, onSuggestionPress, loading }: any) => {
    if (loading) {
      return (
        <View style={styles.suggestionsContainer}>
          {[1, 2, 3, 4, 5].map(i => (
            <View
              key={`skeleton-${i}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
                gap: 12,
              }}>
              <BasicSkeleton width={20} height={20} borderRadius={10} />
              <BasicSkeleton width="80%" height={16} />
            </View>
          ))}
        </View>
      );
    }
    return (
      <View style={styles.suggestionsContainer}>
        {suggestions.map((suggestion: any, index: number) => (
          <MenuItem
            key={index}
            label={suggestion.name}
            onPress={() => onSuggestionPress(suggestion)}
            leftIcon={
              <SearchIcon
                size={18}
                color={ColorPalette.TEXT_GREY_300 as string}
                style={undefined}
              />
            }
            containerStyle={{
              borderBottomWidth: 0,
              paddingVertical: 8,
            }}
            image={undefined}
            testID={`suggestion-${index}`}
          />
        ))}
      </View>
    );
  },
);

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

const SearchResultScreen = ({ route }: any) => {
  const dispatch = useDispatch();
  const {
    searchQuery,
    category,
    subCategory,
    company_id,
    company_name,
    variant_id,
    variant_name,
    category_id,
    nt_see_more_action,
  } = route.params || {
    searchQuery: '',
    category: '',
    subCategory: '',
    company_id: '',
    company_name: '',
    variant_id: '',
    variant_name: '',
    category_id: '',
    nt_see_more_action: '',
  };
  const [searchText, setSearchText] = useState(
    variant_name ||
    company_name ||
    searchQuery ||
    subCategory ||
    category ||
    '',
  );
  const [isVoiceModalVisible, setIsVoiceModalVisible] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedSortBy, setSelectedSortBy] = useState('product');
  const [selectedSortOrder, setSelectedSortOrder] = useState('asc');
  const [apiSortings, setApiSortings] = useState<any[]>([]);
  const [apiFilters, setApiFilters] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {},
  );
  const history = useSelector((state: RootState) => state.search.history);
  const [isTyping, setIsTyping] = useState(false);
  const [hasSubmittedSearch, setHasSubmittedSearch] = useState(
    !!searchQuery ||
    !!category ||
    !!subCategory ||
    !!company_id ||
    !!variant_id ||
    !!category_id ||
    !!nt_see_more_action,
  );
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [productCartIds, setProductCartIds] = useState<Record<string, string>>(
    {},
  );
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    if (route.params) {
      setSearchText(
        route.params.variant_name ||
        route.params.company_name ||
        route.params.searchQuery ||
        route.params.subCategory ||
        route.params.category ||
        '',
      );
      setHasSubmittedSearch(
        !!route.params.searchQuery ||
        !!route.params.category ||
        !!route.params.subCategory ||
        !!route.params.company_id ||
        !!route.params.variant_id ||
        !!route.params.category_id ||
        !!route.params.nt_see_more_action,
      );
      setPage(1);
      setProducts([]);
    }
  }, [route.params]);

  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const fetchNtFilters = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.FILTERS(userId || 0));
        if (response.data?.filters) {
          setApiFilters(response.data.filters);
        }
      } catch (error) {
        console.error('Error fetching NtFilters:', error);
      }
    };
    fetchNtFilters();
  }, [userId]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (isTyping && searchText.length >= 2) {
        setIsSuggestionsLoading(true);
        try {
          const response = await axios.get(
            API_ENDPOINTS.SEARCH_SUGGESTIONS(searchText, 10),
          );
          if (response.data?.suggestions) {
            setSuggestions(response.data.suggestions);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setIsSuggestionsLoading(false);
        }
      } else {
        setSuggestions([]);
        setIsSuggestionsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, isTyping]);

  const filterSections = useMemo(
    () =>
      apiFilters
        .map(filter => ({
          name:
            filter.description ||
            filter.filter ||
            filter.feature_description ||
            'Filter',
          type: filter.range ? ('range' as const) : ('checkbox' as const),
          options: (
            filter.variants || Object.values(filter.variants || {})
          ).map((v: any) => v.variant || v.name),
          searchable: !filter.range,
          filter_id: filter.filter_id,
          range: filter.range,
        }))
        .filter(
          section =>
            (section.type === 'range' && section.range) ||
            section.options.length > 0,
        ),
    [apiFilters],
  );

  const sortOptions = useMemo(
    () =>
      apiSortings.map(s => ({
        value: `${s.sort_by}-${s.sort_order}`,
        label: s.name,
        isSelected:
          s.sort_by === selectedSortBy && s.sort_order === selectedSortOrder,
      })),
    [apiSortings, selectedSortBy, selectedSortOrder],
  );

  const categoryOptions = useMemo(() => ['Electronics', 'Fashion'], []);

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
    setIsTyping(true);
    setHasSubmittedSearch(false);
    setPage(1);
    setProducts([]);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    if (searchText.trim()) {
      dispatch(addSearch(searchText));
      setIsTyping(false);
      setHasSubmittedSearch(true);
      setPage(1);
      setProducts([]);
    }
  }, [searchText, dispatch]);

  const handleHistoryItemPress = useCallback(
    (item: string) => {
      setSearchText(item);
      dispatch(addSearch(item));
      setIsTyping(false);
      setHasSubmittedSearch(true);
      setPage(1);
      setProducts([]);
    },
    [dispatch],
  );

  const handleTagPress = useCallback(
    (tag: string) => {
      setSearchText(tag);
      dispatch(addSearch(tag));
      setIsTyping(false);
      setHasSubmittedSearch(true);
      setPage(1);
      setProducts([]);
    },
    [dispatch],
  );

  const historyItems = useMemo(
    () =>
      history.map((label: string) => ({
        label,
        onPress: () => handleHistoryItemPress(label),
        leftIcon: <HistoryIcon style={undefined} size={24} />,
        rightIcon: (
          <TouchableOpacity onPress={() => dispatch(removeSearch(label))}>
            <CloseIcon
              style={undefined}
              size={16}
              color={ColorPalette.TEXT_GREY_100 as string}
            />
          </TouchableOpacity>
        ),
      })),
    [history, handleHistoryItemPress, dispatch],
  );

  const handleSuggestionPress = useCallback(
    (suggestion: any) => {
      dispatch(addSearch(suggestion.name));
      setSearchText(suggestion.name);
      setIsTyping(false);
      setHasSubmittedSearch(true);
      setPage(1);
      setProducts([]);
    },
    [dispatch],
  );

  const syncWishlist = useCallback(async () => {
    if (!userId) return;
    try {
      const result = await getWishlist(userId);
      if (result.success) {
        const favs: Record<string, boolean> = {};
        const cartIds: Record<string, string> = {};
        result.products.forEach((p: any) => {
          favs[p.product_id] = true;
          cartIds[p.product_id] = p.wishlist_id || p.item_id;
        });
        setFavorites(favs);
        setProductCartIds(cartIds);
      }
    } catch (error) {
      console.error('Error syncing search wishlist:', error);
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

      setFavorites((prev: any) => ({
        ...prev,
        [productId]: isAdding,
      }));

      try {
        if (isAdding) {
          const result = await addToWishlist(userId, productId);
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
            setFavorites((prev: any) => ({
              ...prev,
              [productId]: false,
            }));
          }
        } else {
          const cartId = productCartIds[productId];
          if (cartId && userId) {
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
              setFavorites((prev: any) => ({
                ...prev,
                [productId]: true,
              }));
            }
          }
        }
      } catch (error) {
        console.error('Toggle favorite error:', error);
        showToast(ToastMessages.CommonToastMessages.unexpectedError, 'error');
        setFavorites((prev: any) => ({
          ...prev,
          [productId]: previousState,
        }));
      }
    },
    [userId, favorites, productCartIds, syncWishlist],
  );

  const handleAddToCart = useCallback(
    async (productId: string, productObj?: any) => {
      try {
        if (!userId) {
          let product = productObj;
          if (!product) {
            product = products.find(p => String(p.id) === String(productId));
          }
          if (product) {
            dispatch(
              addGuestItem({
                product_id: String(product.id),
                product: product.title,
                amount: 1,
                price: String(product.discountedPrice || 0),
                display_price: `€${product.discountedPrice || 0}`,
                main_pair: product.main_pair,
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
          product = products.find(p => String(p.id) === String(productId));
        }

        (dispatch as any)(
          addItemToCart({
            userId,
            productId,
            productDetails: product
              ? {
                title: product.title,
                price: String(product.discountedPrice || 0),
                display_price: `€${product.discountedPrice || 0}`,
                image:
                  product.imageSource?.uri ||
                  product.imageSource ||
                  product.main_pair?.detailed?.image_path,
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
              showToast('Error', 'error');
            }
          });
      } catch (error: any) {
        if (Platform.OS === 'android') {
          showToast(
            ToastMessages.CommonToastMessages.addToCartFailed(error.message),
            'error',
          );
        } else {
          showToast(
            ToastMessages.CommonToastMessages.addToCartFailed(error.message),
            'error',
          );
        }
      }
    },
    [userId, products, dispatch],
  );

  const handleCardPress = useCallback((productId: string) => {
    navigate('MainScreens', {
      screen: 'ProductDetail',
      params: { productId },
    } as any);
  }, []);

  const handleSortSubmit = useCallback((selectedValue: string) => {
    const [sortBy, sortOrder] = selectedValue.split('-');
    setSelectedSortBy(sortBy);
    setSelectedSortOrder(sortOrder);
    setProducts([]);
    setPage(1);
  }, []);

  const handleCategorySubmit = useCallback((categories: string[]) => {
    setActiveFilters(prev => ({ ...prev, Category: categories }));
    setProducts([]);
    setPage(1);
  }, []);

  const handleFilterApply = useCallback((filters: Record<string, string[]>) => {
    setActiveFilters(filters);
    setProducts([]);
    setPage(1);
  }, []);

  const fetchProducts = useCallback(
    async (isLoadMore = false) => {
      if (
        !company_id &&
        !variant_id &&
        !searchText &&
        !category_id &&
        !nt_see_more_action
      )
        return;

      if (isLoadMore) {
        setIsMoreLoading(true);
      } else {
        setLoading(true);
      }

      try {
        let endpoint = '';
        // Base query parameters
        const currentPage = isLoadMore ? page + 1 : 1;
        let queryParams = `?currency_code=EUR&lang_code=en&user_id=${userId || ''
          }&page=${currentPage}&items_per_page=${itemsPerPage}&sort_by=${selectedSortBy}&sort_order=${selectedSortOrder}`;

        // Construct features_hash based on activeFilters and apiFilters
        const hashParts: string[] = [];
        Object.entries(activeFilters).forEach(
          ([sectionName, selectedValues]) => {
            if (
              !selectedValues ||
              selectedValues.length === 0 ||
              sectionName === 'Category'
            )
              return;
            const filterDoc = apiFilters.find(
              (f: any) =>
                (f.description || f.filter || f.feature_description) ===
                sectionName,
            );
            if (!filterDoc) return;

            const fid = filterDoc.filter_id || filterDoc.feature_id;
            if (filterDoc.range) {
              const min = selectedValues[0] || filterDoc.range.min;
              const max = selectedValues[1] || filterDoc.range.max;
              const currency = filterDoc.range.currency_code || 'EUR';
              hashParts.push(`${fid}-${min}-${max}-${currency}`);
            } else {
              const variantHashes: string[] = [];
              selectedValues.forEach((val: string) => {
                const variant = (
                  filterDoc.variants || Object.values(filterDoc.variants || {})
                ).find((v: any) => (v.variant || v.name) === val);
                if (variant) {
                  variantHashes.push(variant.variant_id);
                }
              });
              if (variantHashes.length > 0) {
                hashParts.push(`${fid}-${variantHashes.join('-')}`);
              }
            }
          },
        );

        if (hashParts.length > 0) {
          queryParams += `&features_hash=${hashParts.join('_')}`;
          console.log(
            '--- Applied Filters URL query string:',
            `features_hash=${hashParts.join('_')}`,
          );
        }

        if (nt_see_more_action) {
          // If nt_see_more_action is used, it often points to a specific list
          // We still append our sort and pagination
          endpoint = `${API_ENDPOINTS.SEARCH_PRODUCTS(
            '',
            userId || '',
            currentPage,
            itemsPerPage,
            nt_see_more_action,
          )}${queryParams.replace('?', '&')}`;
        } else if (variant_id) {
          endpoint = `${BASE_URL}/api/products${queryParams}&variant_id=${variant_id}`;
        } else if (company_id) {
          endpoint = `${BASE_URL}/api/products${queryParams}&company_id=${company_id}`;
        } else if (category_id) {
          endpoint = `${BASE_URL}/api/products${queryParams}&category_id=${category_id}`;
        } else if (searchText) {
          endpoint = `${BASE_URL}/api/products${queryParams}&q=${encodeURIComponent(
            searchText,
          )}`;
        }

        if (!endpoint) return;

        // Ensure we don't have double ? or mixed up query indicators
        if (endpoint.includes('?')) {
          const parts = endpoint.split('?');
          if (parts.length > 2) {
            // Fix double query strings
            endpoint = `${parts[0]}?${parts.slice(1).join('&')}`;
          }
        }

        console.log('--- Fetching Products (Refined) ---');
        console.log('Final Endpoint:', endpoint);
        console.log('Params:', {
          isLoadMore,
          selectedSortBy,
          selectedSortOrder,
          activeFilters,
        });

        const response = await axios.get(endpoint);
        console.log('Response Status:', response.status);
        console.log('Products Found:', response.data.products?.length || 0);
        console.log('Total Items API:', response.data.total_items);

        const fetchedProducts = response.data.products || [];
        const totalCount = parseInt(response.data.total_items || response.data?.params?.total_items) || 0;

        if (response.data.sortings) {
          setApiSortings(response.data.sortings);
        }

        if (!isLoadMore) {
          if (totalCount > 0) {
            setTotalItems(totalCount);
          } else if (fetchedProducts.length === itemsPerPage) {
            // Fallback if total_items is missing
            setTotalItems(fetchedProducts.length + 1);
          } else {
            setTotalItems(fetchedProducts.length);
          }
        } else {
          // If loading more and we don't have a reliable totalItems, update it
          if (totalCount === 0 && fetchedProducts.length === itemsPerPage) {
            setTotalItems(prev => prev + itemsPerPage);
          } else if (totalCount > 0) {
            setTotalItems(totalCount);
          }
        }

        const transformedProducts = fetchedProducts.map((item: any) => ({
          id: item.product_id,
          imageSource: item.main_pair?.detailed?.image_path
            ? { uri: toHttps(item.main_pair.detailed.image_path) }
            : item.image_url
              ? { uri: toHttps(item.image_url) }
              : require('../../../assets/images/productCardDemo.png'),
          title: item.product,
          discountedPrice: parseFloat(item.price) || 0,
          originalPrice: parseFloat(item.list_price) || 0,
          rating: parseFloat(item.average_rating) || 0,
          reviewCount: parseInt(item.product_reviews_count) || 0,
          deliveryInfo: item.nt_delivery_info || 'Delivery in 48 hours',
          main_pair: item.main_pair,
          stock: parseInt(item.amount) || 0,
        }));

        if (isLoadMore) {
          setProducts(prev => [...prev, ...transformedProducts]);
          setPage(currentPage);
        } else {
          setProducts(transformedProducts);
          setPage(1);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
        setIsMoreLoading(false);
      }
    },
    [
      company_id,
      variant_id,
      searchText,
      category_id,
      nt_see_more_action,
      activeFilters,
      apiFilters,
      selectedSortBy,
      selectedSortOrder,
      userId,
      page,
    ],
  );

  const renderItem = useCallback(
    ({ item, index }: any) => {
      const isLeftColumn = index % 2 === 0;
      return (
        <View style={styles.productCardWrapper}>
          <ProductCard
            id={item.id.toString()}
            testID={String(item.id)}
            imageSource={item.imageSource}
            title={item.title}
            discountedPrice={item.discountedPrice}
            originalPrice={item.originalPrice}
            rating={item.rating}
            reviewCount={item.reviewCount}
            deliveryInfo={item.deliveryInfo}
            isFavorite={favorites[item.id]}
            onToggleFavorite={() => toggleFavorite(item.id)}
            onAddToCart={() => handleAddToCart(item.id, item)}
            onCardPress={() => handleCardPress(item.id)}
            onImage={true}
            buttonText={'Add'}
            titleVariant={TypographyVariant.LMEDIUM_SEMIBOLD}
            priceVariant={TypographyVariant.LMEDIUM_SEMIBOLD}
            stock={item.stock}
          />
        </View>
      );
    },
    [favorites, toggleFavorite, handleAddToCart, handleCardPress],
  );

  const handleLoadMore = useCallback(() => {
    if (!loading && !isMoreLoading && products.length < totalItems) {
      fetchProducts(true);
    }
  }, [loading, isMoreLoading, products.length, totalItems, fetchProducts]);

  useEffect(() => {
    if (hasSubmittedSearch && searchText) {
      fetchProducts();
    }
  }, [hasSubmittedSearch, searchText, fetchProducts]);

  useFocusEffect(
    useCallback(() => {
      syncWishlist();
      if (
        company_id ||
        variant_id ||
        category_id ||
        nt_see_more_action ||
        (hasSubmittedSearch && searchText)
      ) {
        fetchProducts();
      }
    }, [
      company_id,
      variant_id,
      category_id,
      nt_see_more_action,
      hasSubmittedSearch,
      searchText,
      fetchProducts,
      syncWishlist,
    ]),
  );

  return (
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <View style={styles.searchContainer}>
        <ArrowLeftIcon style={undefined} onPress={goBack} />
        <CustomSearchBox
          value={searchText}
          onChangeText={handleSearchChange}
          placeholder="Search Products"
          onSubmitEditing={handleSearchSubmit}
          onMicPress={() => setIsVoiceModalVisible(true)}
        />
        <TouchableOpacity onPress={() => navigate('Cart' as never)}>
          <CartIcon style={undefined} />
        </TouchableOpacity>
      </View>

      {isTyping && (suggestions.length > 0 || isSuggestionsLoading) ? (
        <ScrollView
          style={{ backgroundColor: ColorPalette.WHITE, flex: 1 }}
          contentContainerStyle={[{ paddingBottom: getScreenHeight(2) }]}>
          <SearchSuggestions
            suggestions={suggestions}
            loading={isSuggestionsLoading}
            onSuggestionPress={handleSuggestionPress}
          />
        </ScrollView>
      ) : (
        <View style={{ flex: 1, backgroundColor: ColorPalette.WHITE }}>
          <FlashList
            data={
              hasSubmittedSearch &&
                (searchText ||
                  variant_id ||
                  company_id ||
                  category_id ||
                  nt_see_more_action)
                ? products
                : []
            }
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
            estimatedItemSize={220}
            contentContainerStyle={{
              paddingHorizontal: 6,
              paddingTop: 6,
              paddingBottom: getScreenHeight(2),
              backgroundColor: ColorPalette.WHITE as string,
            }}
            ListHeaderComponent={
              hasSubmittedSearch &&
                (searchText ||
                  variant_id ||
                  company_id ||
                  category_id ||
                  nt_see_more_action) ? (
                <View style={styles.categoryContainer}>
                  {/* ... header logic ... */}
                  <FilterBadges
                    horizontalScroll={true}
                    filterSections={filterSections}
                    sortOptions={sortOptions}
                    categoryOptions={categoryOptions}
                    selectedSort={`${selectedSortBy}-${selectedSortOrder}`}
                    activeFilters={activeFilters}
                    onSortSubmit={handleSortSubmit}
                    onCategorySubmit={handleCategorySubmit}
                    onFilterApply={handleFilterApply}
                  />
                  <View
                    style={{
                      height: 2,
                      backgroundColor: ColorPalette.BACKGROUND_GREY_50,
                      width: '100%',
                      marginTop: getScreenHeight(0.5),
                    }}
                  />
                </View>
              ) : null
            }
            ListEmptyComponent={
              !loading &&
                hasSubmittedSearch &&
                (searchText ||
                  variant_id ||
                  company_id ||
                  category_id ||
                  nt_see_more_action) ? (
                <View style={styles.emptySearchContainer}>
                  <Typography
                    text="No products found"
                    variant={TypographyVariant.PMEDIUM_MEDIUM}
                    customTextStyles={{
                      color: ColorPalette.TEXT_GREY_300,
                      textAlign: 'center',
                      marginBottom:
                        Object.keys(activeFilters).length > 0 ? 16 : 0,
                    }}
                  />
                  {Object.keys(activeFilters).length > 0 && (
                    <Button
                      text="Clear Filters"
                      onPress={() => handleFilterApply({})}
                      variant={ButtonVariant.PRIMARY}
                      type={ButtonType.OUTLINED}
                      size={ButtonSize.MEDIUM}
                      customTextStyles={{ color: ColorPalette.ROSE_PURPLE_300 }}
                      customStyles={{ alignSelf: 'center', width: 150 }}
                    />
                  )}
                </View>
              ) : loading ? (
                <SearchResultSkeleton />
              ) : !hasSubmittedSearch ? (
                <View>
                  {history.length > 0 && (
                    <View style={styles.historyHeader}>
                      <Typography
                        text="Recent Searches"
                        variant={TypographyVariant.PMEDIUM_MEDIUM}
                        customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                      />
                      <TouchableOpacity
                        onPress={() => dispatch(clearHistory())}>
                        <Typography
                          text="Clear All"
                          variant={TypographyVariant.LSMALL_REGULAR}
                          customTextStyles={{ color: ColorPalette.HOME_BLUE }}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {historyItems.map((item: any, index: number) => (
                    <MemoizedMenuItem
                      key={`history-${index}`}
                      label={item.label}
                      leftIcon={item.leftIcon}
                      rightIcon={item.rightIcon}
                      onPress={item.onPress}
                      textStyle={{ color: ColorPalette.TEXT_GREY_500 }}
                      variant={TypographyVariant.PMEDIUM_REGULAR}
                      contentStyle={{ gap: getScreenWidth(3) }}
                      showBottomBorder={true}
                      isLastItem={index === historyItems.length - 1}
                      containerStyle={styles.historyItem}
                    />
                  ))}
                </View>
              ) : null
            }
            ListFooterComponent={
              products.length < totalItems ? (
                <View style={{ marginVertical: 20, alignItems: 'center' }}>
                  <Button
                    text={isMoreLoading ? '' : 'Show More'}
                    onPress={() => handleLoadMore()}
                    variant={ButtonVariant.PRIMARY}
                    type={ButtonType.OUTLINED}
                    size={ButtonSize.MEDIUM}
                    state={isMoreLoading ? ButtonState.DISABLED : ButtonState.DEFAULT}
                    customStyles={{ width: 150 }}
                    customTextStyles={{ color: ColorPalette.ROSE_PURPLE_300 }}
                    leftIcon={isMoreLoading ? () => <ActivityIndicator size="small" color={ColorPalette.ROSE_PURPLE_300} /> : undefined}
                  />
                </View>
              ) : isMoreLoading ? (
                <ActivityIndicator
                  size="small"
                  color={ColorPalette.PRIMARY}
                  style={{ marginVertical: 20 }}
                />
              ) : null
            }
            // onEndReached={handleLoadMore}
            // onEndReachedThreshold={0.5}
            refreshing={loading}
            onRefresh={fetchProducts}
          />
        </View>
      )}
      <VoiceSearchModal
        isVisible={isVoiceModalVisible}
        onClose={() => setIsVoiceModalVisible(false)}
        onResult={text => {
          dispatch(addSearch(text));
          setSearchText(text);
          setHasSubmittedSearch(true);
          setPage(1);
          setProducts([]);
        }}
      />
    </ScreenWrapper>
  );
};

export default React.memo(SearchResultScreen);
