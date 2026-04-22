import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../../../components/CustomComponents/Header/Header';
import { VendorCard } from '../../../../components/CustomComponents/VendorCard/VendorCard';
import { TypographyVariant } from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import { API_ENDPOINTS } from '../../../../config/ApiConfig';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import ShareIcon from '../../../../assets/icons/ShareIcon';
import ProductCard from '../../../../components/CustomComponents/HomeComponents/ProductCardComponent/ProductCard';
import { Typography } from '../../../../components/MainComponents/Typography/Typography';
import { getScreenWidth, getScreenHeight } from '../../../../helpers/screenSize';
import { styles } from './VendorDetailsScreen.styles';
import {
  VendorDetailsScreenProps,
  VendorDetailsData,
} from './VendorDetailsScreen.type';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import { addItemToCart } from '../../../../store/slices/cartSlice';
import ScreenWrapper from '../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import FilterBadges from '../../../../components/CustomComponents/FilterComponent/FilterBadges';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../../../../services/WishlistService';
import { useFocusEffect } from '@react-navigation/native';
import { showToast } from '../../../../components/MainComponents/Toast/ToastHelper';
import { ToastMessages } from '../../../../components/MainComponents/Toast/ToastMessages';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonState,
  ButtonVariant,
} from '../../../../components/MainComponents/Button';

const MemoizedProductCard = React.memo(ProductCard);

const toHttps = (url: string): string => {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://');
};
const VendorDetailsScreen: React.FC<VendorDetailsScreenProps> = ({ route }) => {
  const { vendorId, vendorName, isVendor } = route.params;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState<VendorDetailsData | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [selectedSortBy, setSelectedSortBy] = useState('timestamp');
  const [selectedSortOrder, setSelectedSortOrder] = useState('desc');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [apiSortings, setApiSortings] = useState<any[]>([]);
  const [apiFilters, setApiFilters] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {},
  );
  const itemsPerPage = 20;
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [productCartIds, setProductCartIds] = useState<Record<string, string>>({});

  const userId = useSelector((state: RootState) => state.auth.userId);
  const decodeHTMLEntities = (text: string) => {
    if (!text) return '';
    return text.replace(/&amp;/g, '&');
  };

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

      setFavorites((prev: any) => ({
        ...prev,
        [productId]: isAdding,
      }));

      try {
        if (isAdding) {
          const result = await addToWishlist(userId, productId);
          if (result && result.success) {
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
            if (result && result.success) {
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


  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_ENDPOINTS.VENDOR_DETAILS}/${vendorId}`,
        );
        if (response.data && response.data.vendor) {
          const v = response.data.vendor;
          console.log('vendorData', v);

          setVendorData({
            company_id: v.company_id,
            company: decodeHTMLEntities(v.company),
            image_url: toHttps(v.image_url || ''),
            company_description: decodeHTMLEntities(v.company_description),
            average_rating: v.average_rating || '0.0',
            discussion: v.discussion,
            email: v.email,
            phone: v.phone,
            address: v.address,
            city: v.city,
            country: v.country,
          });
        }
      } catch (error) {
        console.error('Error fetching vendor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

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

  const fetchProducts = useCallback(async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setIsLoadMoreLoading(true);
      } else {
        setProductsLoading(true);
      }

      const currentPage = isLoadMore ? page + 1 : 1;

      let queryParams = `currency_code=EUR&lang_code=en&user_id=${userId || ''
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
      }

      const endpoint = isVendor
        ? `${API_ENDPOINTS.PRODUCTS_BY_COMPANY(
          vendorId,
          userId || '',
        )}&${queryParams}`
        : `${API_ENDPOINTS.PRODUCTS_BY_BRAND(
          vendorId,
          userId || '',
        )}&${queryParams}`;

      const response = await axios.get(endpoint);
      console.log('--- Vendor Products API Response:', {
        total_items: response.data?.total_items,
        products_count: response.data?.products?.length,
        items_per_page: itemsPerPage,
        page: currentPage
      });

      if (response.data && response.data.sortings) {
        setApiSortings(response.data.sortings);
      }

      if (!isLoadMore) {
        const total = response.data?.total_items || response.data?.params?.total_items;
        console.log('--- Detected Total Items:', total);
        if (total) {
          setTotalItems(parseInt(total) || 0);
        } else if (response.data?.products?.length === itemsPerPage) {
          // If we got exactly itemsPerPage and no total_items, assume there's at least one more page
          setTotalItems(response.data.products.length + 1);
          console.log('--- No total_items found, using products.length + 1 as fallback');
        } else {
          setTotalItems(response.data?.products?.length || 0);
        }
      }

      if (response.data && response.data.products) {
        const transformedProducts = response.data.products.map(
          (item: any) => ({
            id: item.product_id,
            imageSource: item.image_url
              ? { uri: toHttps(item.image_url) }
              : item.main_pair?.detailed?.image_path
                ? { uri: toHttps(item.main_pair.detailed.image_path) }
                : require('../../../../assets/images/productCardDemo.png'),
            title: decodeHTMLEntities(item.product),
            discountedPrice: parseFloat(item.price) || 0,
            originalPrice: parseFloat(item.list_price) || 0,
            rating:
              parseFloat(item.rating) ||
              parseFloat(item.average_rating) ||
              0,
            reviewCount:
              item.ratings_count ||
              parseInt(item.product_reviews_count) ||
              0,
            deliveryInfo: item.nt_delivery_info || 'Delivery in 48 hours',
            stock: parseInt(item.amount) || 0,
          }),
        );

        if (isLoadMore) {
          setProducts(prev => [...prev, ...transformedProducts]);
          setPage(currentPage);
          // If we don't have a reliable totalItems, increment it to keep the button visible if we got a full page
          const total = response.data?.total_items || response.data?.params?.total_items;
          if (!total && transformedProducts.length === itemsPerPage) {
            setTotalItems(prev => prev + itemsPerPage);
          }
        } else {
          setProducts(transformedProducts);
          setPage(1);
        }
      } else {
        if (!isLoadMore) {
          setProducts([]);
          setTotalItems(0);
        }
      }
    } catch (error) {
      console.error('Error fetching vendor products:', error);
    } finally {
      setProductsLoading(false);
      setIsLoadMoreLoading(false);
    }
  }, [
    vendorId,
    isVendor,
    userId,
    activeFilters,
    selectedSortBy,
    selectedSortOrder,
    page,
    apiFilters,
    itemsPerPage,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [
    vendorId,
    isVendor,
    userId,
    activeFilters,
    selectedSortBy,
    selectedSortOrder,
    apiFilters,
  ]);

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
      apiSortings.length > 0
        ? apiSortings.map(s => ({
          value: `${s.sort_by}-${s.sort_order}`,
          label: s.name,
          isSelected:
            s.sort_by === selectedSortBy &&
            s.sort_order === selectedSortOrder,
        }))
        : [
          {
            value: 'timestamp-desc',
            label: 'Newest',
            isSelected:
              selectedSortBy === 'timestamp' && selectedSortOrder === 'desc',
          },
        ],
    [apiSortings, selectedSortBy, selectedSortOrder],
  );

  const categoryOptions = useMemo(() => ['Electronics', 'Fashion'], []);

  const handleSortSubmit = useCallback((selectedValue: string) => {
    const [sortBy, sortOrder] = selectedValue.split('-');
    if (sortBy && sortOrder) {
      setSelectedSortBy(sortBy);
      setSelectedSortOrder(sortOrder);
      setPage(1);
    }
  }, []);

  const handleCategorySubmit = useCallback((categories: string[]) => {
    setActiveFilters(prev => ({ ...prev, Category: categories }));
    setSelectedCategories(categories);
    setPage(1);
  }, []);

  const handleFilterApply = useCallback((filters: Record<string, string[]>) => {
    setActiveFilters(filters);
    setPage(1);
  }, []);

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name={'Seller profile'}
        variant={TypographyVariant.H6_MEDIUM}
        leftIcons={[
          {
            icon: ArrowLeft as any,
            onPress: () => navigation.goBack(),
            size: 24,
            color: ColorPalette.TEXT_GREY_500 as string,
          },
        ]}
      // rightIcons={[
      //   {
      //     icon: ShareIcon as any,
      //     onPress: () => { }, // Placeholder for now
      //     size: 24,
      //     color: ColorPalette.TEXT_GREY_500 as string,
      //   },
      // ]}
      />
      <View
        style={{
          height: 1,
          backgroundColor: ColorPalette.BACKGROUND_GREY_50,
          width: '100%',
        }}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={ColorPalette.PRIMARY} />
        </View>
      ) : (
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.vendorCardSection}>
            {vendorData && (
              <VendorCard
                item={{
                  brand_id: vendorData.company_id,
                  brand: vendorData.company,
                  image_url: vendorData.image_url,
                  description: vendorData.company_description,
                  products_sold: '2,076', // Placeholder
                  rating: vendorData.average_rating || 0,
                  ratings_count: vendorData.discussion?.posts_count || 0,
                }}
                onPress={() => { }}
                showReadMore={true}
                showFollowButton={false}
                showBanner={false}
              />
            )}
          </View>

          <View
            style={{
              paddingHorizontal: getScreenWidth(4),
            }}>
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
          </View>
          <View style={styles.productsSection}>
            <View style={styles.productsHeader}>
              <Typography
                text="All Products"
                variant={TypographyVariant.H6_BOLD}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_500,
                }}
              />
              <Typography
                text={`Products found - ${totalItems}`}
                variant={TypographyVariant.LSMALL_SEMIBOLD}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_50,
                }}
              />
            </View>

            {productsLoading ? (
              <ActivityIndicator
                size="small"
                color={ColorPalette.PRIMARY}
                style={{ marginTop: 20 }}
              />
            ) : products.length > 0 ? (
              <>
                <View style={styles.productsGrid}>
                  {products.map((item, index) => (
                    <View key={item.id} style={styles.productCardWrapper}>
                      <MemoizedProductCard
                        id={item.id}
                        testID={item.id}
                        imageSource={item.imageSource}
                        title={item.title}
                        originalPrice={item.originalPrice}
                        discountedPrice={item.discountedPrice}
                        rating={item.rating}
                        reviewCount={item.reviewCount}
                        // deliveryInfo={item.deliveryInfo}
                        isFavorite={favorites[item.id]}
                        onToggleFavorite={() => toggleFavorite(item.id)}
                        onAddToCart={() => {
                          if (userId) {
                            dispatch(
                              addItemToCart({
                                userId,
                                productId: item.id,
                                productDetails: {
                                  title: item.title,
                                  price: String(item.discountedPrice),
                                  display_price: `€${item.discountedPrice.toFixed(
                                    2,
                                  )}`,
                                  image:
                                    typeof item.imageSource === 'object'
                                      ? item.imageSource.uri
                                      : '',
                                },
                              }),
                            );
                          } else {
                            navigation.navigate('Authentication', {
                              screen: 'WhatsAppAndEmailLogInScreen',
                              params: {
                                returnTo: 'VendorDetails',
                                vendorId,
                                vendorName,
                                isVendor,
                              },
                            });
                          }
                        }}
                        onCardPress={() => {
                          navigation.navigate('ProductDetail', {
                            productId: item.id,
                          });
                        }}
                        buttonText={'Add'}
                        titleVariant={TypographyVariant.LMEDIUM_SEMIBOLD}
                        priceVariant={TypographyVariant.LMEDIUM_SEMIBOLD}
                        onImage={true}
                        stock={item.stock}
                      />
                    </View>
                  ))}
                </View>
                {products.length < totalItems && (
                  <View style={{ marginVertical: 20, alignItems: 'center' }}>
                    <Button
                      text={isLoadMoreLoading ? '' : 'Show More'}
                      onPress={() => fetchProducts(true)}
                      variant={ButtonVariant.PRIMARY}
                      type={ButtonType.OUTLINED}
                      size={ButtonSize.MEDIUM}
                      state={isLoadMoreLoading ? ButtonState.DISABLED : ButtonState.DEFAULT}
                      customStyles={{ width: 150 }}
                      customTextStyles={{ color: ColorPalette.ROSE_PURPLE_300 }}
                      leftIcon={isLoadMoreLoading ? () => <ActivityIndicator size="small" color={ColorPalette.ROSE_PURPLE_300} /> : undefined}
                    />
                  </View>
                )}
              </>
            ) : (
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Typography
                  text="No products found for this vendor"
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
            )}
          </View>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default VendorDetailsScreen;
