import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  StatusBar,
  Animated,
} from 'react-native';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import ColorPalette from '../../../../config/ColorPalette';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import { Header } from '../../../../components/CustomComponents/Header/Header';
import { goBack, navigate } from '../../../../utils/navigationref';
import { TypographyVariant } from '../../../../components/MainComponents/Typography/Typography.types';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import { styles } from './WishListScreen.styles';
import { ProductsGrid } from '../../../../components/CustomComponents/ProductsGrid';
import { API_ENDPOINTS } from '../../../../config/ApiConfig';
import EmptyComponent from '../../../../components/CustomComponents/EmptyComponent';
import { addToCart } from '../../../../services/CartService';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../../../services/WishlistService';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import ScreenWrapper from '../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import { SystemBars } from 'react-native-edge-to-edge';
import { SearchBox } from '../../../../components/CustomComponents/SearchBox/SearchBox';
import { ToastMessages } from '../../../../components/MainComponents/Toast/ToastMessages';
import { showToast } from '../../../../components/MainComponents/Toast/ToastHelper';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const WishListScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [productCartIds, setProductCartIds] = useState<Record<string, string>>(
    {},
  );
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Animation values
  const searchHeight = React.useRef(new Animated.Value(0)).current;
  const searchOpacity = React.useRef(new Animated.Value(0)).current;

  const toggleSearch = () => {
    if (isSearchVisible) {
      // Hide
      Animated.parallel([
        Animated.timing(searchHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(searchOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => setIsSearchVisible(false));
    } else {
      // Show
      setIsSearchVisible(true);
      Animated.parallel([
        Animated.timing(searchHeight, {
          toValue: 1, // Represents 100% or max height logic
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(searchOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const fetchWishlist = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINTS.WISHLIST(userId));
      const fetchedProducts = response.data.products || [];

      // Transform products to match the UI expectation
      const transformedProducts = fetchedProducts.map((item: any) => ({
        id: item.product_id,
        cart_id: item.wishlist_id || item.item_id, // Map wishlist_id to cart_id for removal logic
        imageSource: item.main_pair?.detailed?.image_path
          ? { uri: item.main_pair.detailed.image_path }
          : item.image_url
            ? { uri: item.image_url }
            : require('../../../../assets/images/productCardDemo.png'),
        title: item.product,
        discountedPrice: parseFloat(item.price) || 0,
        originalPrice: parseFloat(item.list_price) || 0,
        rating: 4.5,
        reviewCount: 10,
        deliveryInfo: 'Delivery in 48 hours',
      }));

      setProducts(transformedProducts);

      // Initialize favorites and cart ids
      const favs: Record<string, boolean> = {};
      const cartIds: Record<string, string> = {};
      transformedProducts.forEach((p: any) => {
        favs[p.id] = true;
        cartIds[p.id] = p.cart_id;
      });
      setFavorites(favs);
      setProductCartIds(cartIds);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchWishlist();
    }, [fetchWishlist]),
  );

  const toggleFavorite = useCallback(
    async (productId: string) => {
      const isAdding = !favorites[productId];

      setFavorites(prev => ({
        ...prev,
        [productId]: isAdding,
      }));

      if (isAdding) {
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
          setFavorites(prev => ({
            ...prev,
            [productId]: false,
          }));
          return;
        }
        const result = await addToWishlist(userId, productId);
        if (result.success) {
          fetchWishlist();
        } else {
          if (Platform.OS === 'android') {
            showToast(
              ToastMessages.CommonToastMessages.addToWishlistFailed(
                result.message,
              ),
              'error',
            );
          } else {
            showToast(
              ToastMessages.CommonToastMessages.addToWishlistFailed(
                result.message,
              ),
              'error',
            );
          }
          setFavorites(prev => ({
            ...prev,
            [productId]: false,
          }));
        }
      } else {
        const cartId = productCartIds[productId];
        if (cartId && userId) {
          const result = await removeFromWishlist(userId, cartId);
          if (result.success) {
            setProducts(prev => prev.filter(p => p.id !== productId));
          } else {
            if (Platform.OS === 'android') {
              showToast(
                ToastMessages.CommonToastMessages.removeFromWishlistFailed(
                  result.message,
                ),
                'error',
              );
            } else {
              showToast(
                ToastMessages.CommonToastMessages.removeFromWishlistFailed(
                  result.message,
                ),
                'error',
              );
            }
            setFavorites(prev => ({
              ...prev,
              [productId]: true,
            }));
          }
        }
      }
    },
    [userId, favorites, productCartIds, fetchWishlist],
  );

  const handleAddToCart = useCallback(async (productId: string) => {
    try {
      const result = await addToCart(productId, userId ? userId : '');
      if (result.success) {
        if (Platform.OS === 'android') {
          showToast(ToastMessages.WishListScreen.addedToCart(result.message));
        } else {
          showToast(ToastMessages.WishListScreen.addedToCart(result.message));
        }
      } else {
        if (Platform.OS === 'android') {
          showToast(
            ToastMessages.CommonToastMessages.addToCartFailed(result.message),
            'error',
          );
        } else {
          showToast(
            ToastMessages.CommonToastMessages.addToCartFailed(result.message),
            'error',
          );
        }
      }
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
  }, []);

  const handleCardPress = useCallback((productId: string) => {
    navigate('MainScreens', {
      screen: 'ProductDetail',
      params: { productId },
    } as any);
  }, []);

  const isWishlistEmpty = products.length === 0;

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      {/* <SystemBars style="auto" /> */}
      <Header
        name="My Wishlist"
        variant={TypographyVariant.H6_SEMIBOLD}
        leftIcon={
          <ArrowLeftIcon
            onPress={goBack}
            size={24}
            color={ColorPalette.TEXT_GREY_400 as string}
            style={undefined}
          />
        }
        rightIcons={[
          {
            icon: SearchIcon as any,
            onPress: toggleSearch,
            size: 20,
            color: ColorPalette.TEXT_GREY_400 as string,
          },
        ]}
      />

      {isSearchVisible && (
        <View
          style={{
            paddingHorizontal: getScreenWidth(2),
            marginBottom: 10,
            backgroundColor: ColorPalette.WHITE,
          }}>
          <SearchBox
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search in wishlist"
            iconColor={ColorPalette.TEXT_GREY_400}
            iconStroke={2}
            iconSize={18}
            placeholderColor={ColorPalette.TEXT_GREY_300}
          />
        </View>
      )}

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={ColorPalette.PRIMARY} />
        </View>
      ) : (
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: getScreenHeight(4) },
          ]}
          showsVerticalScrollIndicator={false}>
          {isWishlistEmpty ? (
            <View style={styles.emptyContainer}>
              <EmptyComponent
                imageSource={require('../../../../assets/images/favourites.png')}
                title="Nothing on your wishlist yet"
                customContainerStyle={styles.emptyContainerStyles}
                variant={TypographyVariant.H6_SEMIBOLD}
                subVariant={TypographyVariant.PXSMALL_REGULAR}
                subTitle="Tap the heart icon to save items you love - they will show up here!"
                customImageStyle={{
                  height: getScreenHeight(22),
                  width: getScreenWidth(34),
                }}
              />
            </View>
          ) : (
            <View style={styles.searchResultCards}>
              <ProductsGrid
                products={filteredProducts}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onAddToCart={handleAddToCart}
                onCardPress={handleCardPress}
              />
            </View>
          )}
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default WishListScreen;
