import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import {
  Animated,
  FlatList,
  Image,
  View,
  RefreshControl,
  Linking,
  InteractionManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ChevronIcon from '../../../assets/icons/ChevronIcon';
import FeaturedComponent from '../../../components/CustomComponents/FeaturedComponent';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/MainComponents/Button';
import ColorPalette from '../../../config/ColorPalette';
import { Spacing } from '../../../config/globalStyles';
import { getScreenWidth, getScreenHeight } from '../../../helpers/screenSize';
import LinearGradient from 'react-native-linear-gradient';
import { Gradients } from '../../../config/ColorPalette';
import CardHeader from '../../../components/CustomComponents/HomeComponents/CardHeader';
import ScrollableBanner from '../../../components/CustomComponents/HomeComponents/ScrollableBanner';
import PromoCard from '../../../components/CustomComponents/HomeComponents/PromoCard';
import { handleScroll } from './animationUtils';
import SponsoredCard from '../../../components/CustomComponents/HomeComponents/SponsoredCard';
import PopularCards from '../../../components/CustomComponents/HomeComponents/PopularCards';
import RocketDeals from '../../../components/CustomComponents/HomeComponents/RocketDeals';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';

// ─── Helper ───────────────────────────────────────────────────────────────────
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

/**
 * Recursively sanitises every URL-like field inside a plain object / array.
 * Handles:
 *   item.imageUrl, item.image_url, item.imageSource.uri, item.banner_image
 */
const sanitizeItem = (item: any): any => {
  if (!item || typeof item !== 'object') return item;
  return {
    ...item,
    ...(item.imageUrl !== undefined && { imageUrl: toHttps(item.imageUrl) }),
    ...(item.image_url !== undefined && { image_url: toHttps(item.image_url) }),
    ...(item.banner_image !== undefined && {
      banner_image: toHttps(item.banner_image),
    }),
    // ✅ NEW: handle imageSource as a plain string URI
    ...(typeof item.imageSource === 'string' && {
      imageSource: toHttps(item.imageSource),
    }),
    // existing: handle imageSource as an object with .uri
    ...(item.imageSource !== undefined &&
      typeof item.imageSource === 'object' && {
      imageSource: {
        ...item.imageSource,
        uri: toHttps(item.imageSource.uri),
      },
    }),
  };
};

const sanitizeArray = (arr: any[]): any[] =>
  Array.isArray(arr) ? arr.map(sanitizeItem) : arr;
// ──────────────────────────────────────────────────────────────────────────────

const MainContent = ({
  scrollViewRef,
  styles,
  animations,
  scrollY,
  prevScrollY,
  bannerSecondImages,
  categories,
  renderCategoryItem,
  keyExtractorById,
  bestSellerProducts,
  renderBestSellerItem,
  bannerImages,
  newArrivalProducts,
  newArrivalSection,
  renderDiscountTimer,
  rocketDealProducts,
  renderRocketDealItem,
  renderFilterBadges,
  renderProductsGrid,
  featuredSection,
  featuredImages,
  sponsoredBrands,
  discountBanners,
  popularPicksData,
  rocketDealsData,
  isLoading,
  layout,
  favorites,
  refreshing,
  onRefresh,
}: any) => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [layout, scrollViewRef]);

  // ── Sanitised prop memos ────────────────────────────────────────────────────
  const safeBannerSecondImages = useMemo(
    () => sanitizeArray(bannerSecondImages),
    [bannerSecondImages],
  );

  const safeDiscountBanners = useMemo(
    () => sanitizeArray(discountBanners),
    [discountBanners],
  );
  // ───────────────────────────────────────────────────────────────────────────

  const handleBannerPress = useCallback(
    (item: any) => {
      const type = item.banner_type || item.type;
      const object_id = item.object_id;
      const title = item.title || item.card_name || item.banner;
      const url = item.url || object_id;

      if (type === 'P' && object_id) {
        navigation.navigate('ProductDetail', { productId: object_id });
      } else if (type === 'C' && object_id) {
        navigation.navigate('Search', {
          screen: 'SearchResultScreen',
          params: { category_id: object_id },
        });
      } else if (type === 'V' && object_id) {
        navigation.navigate('VendorDetails', {
          vendorId: object_id,
          vendorName: title || 'Vendor Details',
          isVendor: true,
        });
      } else if (type === 'L' && url) {
        navigation.navigate('WebViewScreen', {
          url: url,
          title: title || 'Web View',
        });
      }
    },
    [navigation],
  );

  const renderBlock = (block: any) => {
    const { type, title, data, background_color } = block;

    const blockStyle = background_color
      ? { backgroundColor: background_color }
      : {};

    // Sanitise ALL urls in this block's data array once, up-front
    const safeData = sanitizeArray(data);

    switch (type) {
      // ── Vendors / Brands ──────────────────────────────────────────────────
      case 'vendor':
      case 'vendors':
      case 'brand':
      case 'brands':
        return (
          <View
            key={block.layout_id || title}
            style={[styles.bestSellerContainer, blockStyle]}>
            <CardHeader
              title={title}
              miniTitle={
                block.subtext ||
                (type === 'vendors' || type === 'vendor'
                  ? 'Everyday brands Maltese customers love'
                  : 'Discover top brands across all categories')
              }
              showRightSection={false}
              alternativeImage={
                block.icon_url
                  ? { uri: toHttps(block.icon_url) }
                  : require('../../../assets/images/shakeHand.png')
              }
              alternativeImageStyle={{
                width: getScreenWidth(14),
                height: getScreenWidth(12),
              }}
              titleVariant={TypographyVariant.LMEDIUM_EXTRABOLD}
            />
            <SponsoredCard
              brands={safeData.map(item => ({
                ...item,
                onPress: () => {
                  const isVendor = type === 'vendors' || type === 'vendor';
                  navigation.navigate('Search', {
                    screen: 'SearchResultScreen',
                    params: isVendor
                      ? {
                        company_id: item.id,
                        company_name: item.title,
                      }
                      : {
                        variant_id: item.id,
                        variant_name: item.title,
                      },
                  });
                },
              }))}
            />
            <Button
              text={`See all ${type === 'vendors' || type === 'vendor' ? 'vendors' : 'brands'
                }`}
              rightIcon={ChevronIcon}
              iconSize={16}
              onPress={() =>
                navigation.navigate('BrandsPage', {
                  type:
                    type === 'vendors' || type === 'vendor'
                      ? 'vendors'
                      : 'brands',
                  title:
                    type === 'vendors' || type === 'vendor'
                      ? 'Vendors'
                      : 'Brands',
                })
              }
              state={ButtonState.DEFAULT}
              size={ButtonSize.SEMILARGE}
              type={ButtonType.PRIMARY}
              customStyles={{
                borderRadius: Spacing.XSmall,
                height: getScreenHeight(6),
              }}
              bgColor={ColorPalette.WelcomeBack as string}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              variant={ButtonVariant.PRIMARY}
            />
          </View>
        );

      // ── Categories ────────────────────────────────────────────────────────
      case 'categories':
        return (
          <View
            key={block.layout_id || type}
            style={[styles.bestSellerContainer, blockStyle]}>
            <CardHeader
              title={title}
              miniTitle={block.subtext}
              showRightSection={false}
              alternativeImage={
                block.icon_url
                  ? { uri: toHttps(block.icon_url) }
                  : require('../../../assets/images/bestHeart.png')
              }
              alternativeImageStyle={{
                width: getScreenWidth(14),
                height: getScreenWidth(12),
              }}
              titleVariant={TypographyVariant.LMEDIUM_EXTRABOLD}
            />
            <View style={{ minHeight: 120, width: '100%' }}>
              <FlatList
                data={safeData}
                renderItem={renderCategoryItem}
                keyExtractor={keyExtractorById}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContainer}
                nestedScrollEnabled
              />
            </View>
          </View>
        );

      // ── Products ──────────────────────────────────────────────────────────
      case 'products': {
        const isScrollable = safeData.length > 6;

        let firstRow = [];
        let secondRow = [];

        if (isScrollable) {
          if (safeData.length === 4) {
            firstRow = safeData.slice(0, 3);
            secondRow = safeData.slice(3);
          } else {
            const halfIndex = Math.ceil(safeData.length / 2);
            firstRow = safeData.slice(0, halfIndex);
            secondRow = safeData.slice(halfIndex);
          }
        } else {
          const visibleProducts = safeData.slice(0, 6);
          firstRow = visibleProducts.slice(0, 3);
          secondRow = visibleProducts.slice(3);
        }

        return (
          <View
            key={block.layout_id || title}
            style={[styles.bestSellerContainer, blockStyle]}>
            <CardHeader
              title={title}
              miniTitle={block.subtext || 'Suggestions based on what you love'}
              showRightSection={false}
              alternativeImage={
                block.icon_url
                  ? { uri: toHttps(block.icon_url) }
                  : require('../../../assets/images/bestHeart.png')
              }
              alternativeImageStyle={{
                width: getScreenWidth(14),
                height: getScreenWidth(12),
              }}
              titleVariant={TypographyVariant.LMEDIUM_EXTRABOLD}
            />
            <View style={{ minHeight: 280, width: '100%' }}>
              {isScrollable ? (
                <>
                  <FlatList
                    data={firstRow}
                    renderItem={renderBestSellerItem}
                    keyExtractor={keyExtractorById}
                    extraData={favorites}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalListContainer}
                    nestedScrollEnabled
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 12 }} />
                    )}
                  />
                  <View style={{ height: 16 }} />
                  <FlatList
                    data={secondRow}
                    renderItem={renderBestSellerItem}
                    keyExtractor={keyExtractorById}
                    extraData={favorites}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalListContainer}
                    nestedScrollEnabled
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 12 }} />
                    )}
                  />
                </>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: getScreenWidth(3),
                    }}>
                    {firstRow.map((item, index) => (
                      <View key={item.id} style={{ width: getScreenWidth(28.5) }}>
                        {renderBestSellerItem({ item, index })}
                      </View>
                    ))}
                  </View>
                  <View style={{ height: 16 }} />
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: getScreenWidth(3),
                    }}>
                    {secondRow.map(item =>
                      renderBestSellerItem({
                        item,
                        key: item.id,
                        containerStyle: { width: getScreenWidth(28.5) },
                      }),
                    )}
                  </View>
                </>
              )}
            </View>
            <Button
              text="See All Products"
              rightIcon={ChevronIcon}
              iconSize={16}
              onPress={() => {
                navigation.navigate('Search', {
                  screen: 'SearchResultScreen',
                  params: {
                    searchQuery: title,
                    nt_see_more_action: block.see_more_action,
                  },
                });
              }}
              state={ButtonState.DEFAULT}
              size={ButtonSize.SEMILARGE}
              type={ButtonType.PRIMARY}
              customStyles={{
                borderRadius: Spacing.XSmall,
                height: getScreenHeight(6),
              }}
              bgColor={ColorPalette.WelcomeBack as string}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              variant={ButtonVariant.PRIMARY}
            />
          </View>
        );
      }

      // ── Promo Cards ───────────────────────────────────────────────────────
      case 'promo_cards':
        return (
          <View
            key={block.layout_id || title}
            style={[styles.bestSellerContainer, blockStyle]}>
            <CardHeader
              title={title}
              miniTitle={block.subtext}
              showRightSection={false}
              alternativeImage={
                block.icon_url
                  ? { uri: toHttps(block.icon_url) }
                  : require('../../../assets/images/bestHeart.png')
              }
              alternativeImageStyle={{
                width: getScreenWidth(14),
                height: getScreenWidth(12),
              }}
              titleVariant={TypographyVariant.LMEDIUM_EXTRABOLD}
            />
            <View style={{ minHeight: 200, width: '100%' }}>
              <FlatList
                data={safeData}
                renderItem={({ item }: any) => (
                  <PromoCard
                    title={item.title}
                    description={item.description}
                    imageUrl={toHttps(item.imageUrl || item.image_url || '')}
                    onPress={() => handleBannerPress(item)}
                  />
                )}
                keyExtractor={(item: any) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContainer}
                nestedScrollEnabled
              />
            </View>
          </View>
        );

      // ── Banner ────────────────────────────────────────────────────────────
      case 'banner':
        return (
          <View
            key={block.layout_id || title || `banner-${block.position}`}
            style={[styles.bannerContainerOne, blockStyle]}>
            <ScrollableBanner
              images={safeData.map(item => ({
                ...item,
                onPress: () => handleBannerPress(item),
              }))}
              autoScrollInterval={5000}
            />
          </View>
        );

      default:
        return null;
    }
  };

  // ── Memoised banner arrays passed into ScrollableBanner ──────────────────
  const topBannerImages = useMemo(
    () =>
      safeBannerSecondImages.map(item => ({
        ...item,
        onPress: () => handleBannerPress(item),
      })),
    [safeBannerSecondImages, handleBannerPress],
  );

  const discountBannerImages = useMemo(
    () => safeDiscountBanners,
    [safeDiscountBanners],
  );
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      style={styles.mainContainer}
      contentContainerStyle={[styles.scrollContent, animations.contentStyle]}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[ColorPalette.HOME_BLUE]}
          tintColor={ColorPalette.HOME_BLUE}
          progressBackgroundColor={ColorPalette.WHITE}
          progressViewOffset={
            (animations?.contentStyle?.paddingTop || 0) + 15
          }
        />
      }
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
          useNativeDriver: true,
          listener: (event: any) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            prevScrollY.current = offsetY;
            handleScroll(event, scrollY, prevScrollY);
          },
        },
      )}>
      {isLoading ? (
        <View style={{ flex: 1, minHeight: getScreenHeight(80) }} />
      ) : (
        <>
          {/* ── Top static banner ── */}
          {safeBannerSecondImages && safeBannerSecondImages.length > 0 && (
            <View style={styles.bannerContainerOne}>
              <ScrollableBanner
                images={topBannerImages}
                autoScrollInterval={5000}
              />
            </View>
          )}

          {/* ── Dynamic layout blocks ── */}
          {layout && layout.map((block: any) => renderBlock(block))}

          {/* ── Discount banner carousel ── */}
          {safeDiscountBanners && safeDiscountBanners.length > 0 && (
            <View style={styles.bannerContainerOne}>
              <ScrollableBanner
                images={discountBannerImages}
                autoScrollInterval={5000}
              />
            </View>
          )}
        </>
      )}

      {/* ── Footer ── */}
      <View style={styles.footerContainer}>
        <Typography
          text={'Your Local\nShopping App ❤️'}
          variant={TypographyVariant.H1_BOLD}
          customTextStyles={styles.footerText}
        />
        <View style={styles.footerLine} />
        <Typography
          text="Surf Malta"
          variant={TypographyVariant.LMEDIUM_BOLD}
          customTextStyles={styles.footerText}
        />
      </View>
    </Animated.ScrollView>
  );
};

export default memo(MainContent);