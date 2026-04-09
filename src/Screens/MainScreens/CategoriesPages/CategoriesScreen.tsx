import React, {
  useState,
  useMemo,
  memo,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
  RefreshControl,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  createScrollAnimations,
  handleScroll,
  updateAnimationInterpolations,
} from '../HomePages/animationUtils';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChevronRightIcon from '../../../assets/icons/ChevronRightIcon';
import SearchIcon from '../../../assets/icons/SearchIcon';
import { Header } from '../../../components/CustomComponents/Header/Header';
import CardHeader from '../../../components/CustomComponents/HomeComponents/CardHeader';
import CategoryBox from '../../../components/CustomComponents/HomeComponents/CategoryBox';
import { SlidingBar } from '../../../components/CustomComponents/SlidingBar/SlidingBar';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import { Spacing } from '../../../config/globalStyles';
import { categories as staticCategories } from './Categories.constants';
import { styles } from './CategoriesScreen.styles';
import { navigate } from '../../../utils/navigationref';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config/ApiConfig';
import { ActivityIndicator } from 'react-native';
import ScreenWrapper from '../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import { ScrollContext } from '../../../navigation/stacks/BottomTabNavigator/ScrollContext';
import HomeHeader from '../../../components/CustomComponents/HomeHeaderComponent/HomeHeader';
import { SearchBox } from '../../../components/CustomComponents/SearchBox/SearchBox';
import { addSearch } from '../../../store/slices/searchSlice';
import MicroPhoneFill from '../../../assets/icons/MicroPhoneFill';
import VoiceSearchModal from '../../../components/CustomComponents/VoiceSearch/VoiceSearchModal';
import {
  getAddressFromCoords,
  getCurrentLocation,
  requestLocationPermission,
} from '../../../services/LocationService';

const CATEGORY_VIEW_STYLE: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  // justifyContent: 'space-between',
  gap: Spacing.Small,
};

const decodeHTMLEntities = (text: string) => {
  return text.replace(/&amp;/g, '&');
};

const toHttps = (url: string): string => {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://');
};
const CategoriesScreen: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [isVoiceModalVisible, setIsVoiceModalVisible] = useState(false);
  const [address, setAddress] = useState('Detecting Location...');
  const [subAddress, setSubAddress] = useState('Please wait...');
  const mainScrollViewRef = useRef<typeof Animated.ScrollView>(null);

  const [apiData, setApiData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({ id: '', label: '' });
  const scrollContext = useContext(ScrollContext);
  const scrollY =
    scrollContext?.scrollY || useRef(new Animated.Value(0)).current;
  const prevScrollY = useRef(0);

  const headerHeightRef = useRef<number>(0);
  const searchBoxHeightRef = useRef<number>(0);
  const tabBarHeightRef = useRef<number>(0);
  const [animationsReady, setAnimationsReady] = useState(false);

  // Initialize animations with a safe default for search bar to avoid it being hidden behind header initially
  const [animations, setAnimations] = useState(() => {
    const initial = createScrollAnimations(
      scrollY,
      headerHeightRef,
      searchBoxHeightRef,
      tabBarHeightRef,
    );
    // Estimated header height to ensure visibility before layout measurement
    return {
      ...initial,
      searchBarStyle: {
        ...initial.searchBarStyle,
        transform: [{ translateY: getScreenHeight(8) }],
      },
    };
  });

  useEffect(() => {
    if (
      headerHeightRef.current > 0 &&
      searchBoxHeightRef.current > 0 &&
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

  const fetchCategories = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const response = await axios.get(API_ENDPOINTS.CATEGORIES);
      if (response.data && response.data.categories) {
        setApiData(response.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onRefresh = useCallback(() => {
    fetchCategories(true);
  }, [fetchCategories]);

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

    fetchLocation();
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

    fetchLocation();
  }, []);

  const currentCategory = useMemo(() => {
    return apiData.find(cat => cat.category_id === selectedFilter.id);
  }, [apiData, selectedFilter]);

  const checkIfAnimationsReady = useCallback(() => {
    if (headerHeightRef.current > 0 && searchBoxHeightRef.current > 0) {
      setAnimationsReady(true);
    }
  }, []);

  const onHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (headerHeightRef.current !== height) {
      headerHeightRef.current = height;
      requestAnimationFrame(checkIfAnimationsReady);
    }
  }, []);

  const onSearchBoxLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (searchBoxHeightRef.current !== height) {
      searchBoxHeightRef.current = height;
      requestAnimationFrame(checkIfAnimationsReady);
    }
  }, []);

  const onTabBarLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      if (tabBarHeightRef.current !== height) {
        tabBarHeightRef.current = height;

        // If animations are already ready, we need to manually trigger an update
        // because setAnimationsReady(true) won't trigger the effect if it was already true.
        if (headerHeightRef.current > 0 && searchBoxHeightRef.current > 0) {
          setAnimationsReady(true); // Ensure it's true
          const updatedAnimations = updateAnimationInterpolations(
            scrollY,
            headerHeightRef,
            searchBoxHeightRef,
            tabBarHeightRef,
          );
          setAnimations(updatedAnimations);
        } else {
          checkIfAnimationsReady();
        }
      }
    },
    [scrollY],
  );

  const navigateToMain = React.useCallback(
    (
      category: string,
      subCategory?: string,
      categoryId?: string,
      showCategories?: boolean,
      categoriesData?: any[],
    ) => {
      console.log('DEBUG: navigateToMain called', {
        category,
        categoryId,
        showCategories,
        subcategoriesCount: categoriesData?.length,
      });

      if (showCategories) {
        console.log('DEBUG: Navigating to ViewAllScreen');
        navigate('MainScreens', {
          screen: 'Categories',
          params: {
            screen: 'ViewAllScreen',
            params: { category, categoryId, subcategories: categoriesData },
          },
        } as any);
      } else {
        console.log('DEBUG: Navigating to SearchResultScreen');
        navigate('MainScreens', {
          screen: 'Search',
          params: {
            screen: 'SearchResultScreen',
            params: { category, subCategory, category_id: categoryId },
          },
        } as any);
      }
    },
    [],
  );

  const renderCategorySection = React.useCallback(
    (item: any) => {
      const categoryItemWidth = getScreenWidth(20);
      const categoryItemHeight = getScreenHeight(9);
      const subCategories = item.subcategories || [];
      const title = decodeHTMLEntities(item.category);

      return (
        <View key={item.category_id} style={styles.categoryContainer}>
          <CardHeader
            title={title}
            showRightSection={false}
            // onViewAllPress={() =>
            //   navigateToMain(
            //     title,
            //     undefined,
            //     item.category_id,
            //     true,
            //     subCategories,
            //   )
            // }
            // alternativeIcon={
            //   <ChevronRightIcon
            //     style={undefined}
            //     size={8}
            //     color={ColorPalette.TEXT_GREY_100}
            //   />
            // }
            titleVariant={TypographyVariant.H5_SEMIBOLD}
            containerStyle={{ paddingHorizontal: getScreenWidth(1) }}
          />
          <View style={CATEGORY_VIEW_STYLE}>
            {subCategories.length > 0 ? (
              subCategories.map((sub: any) => (
                <View
                  key={sub.category_id}
                  style={{
                    width: '22%',
                    alignItems: 'center',
                  }}>
                  <CategoryBox
                    title={decodeHTMLEntities(sub.category)}
                    imageSource={
                      sub.image_url
                        ? { uri: toHttps(sub.image_url) }
                        : require('../../../assets/images/noProductImageAvailable.png')
                    }
                    onPress={() => {
                      const hasSubcategories =
                        sub.subcategories && sub.subcategories.length > 0;
                      navigateToMain(
                        sub.category,
                        sub.category,
                        sub.category_id,
                        hasSubcategories,
                        sub.subcategories || [],
                      );
                    }}
                    imageContainerStyle={{
                      width: categoryItemWidth,
                      height: categoryItemHeight,
                      borderRadius: Spacing.Small,
                    }}
                    containerStyle={{
                      gap: getScreenHeight(0.5),
                      width: '100%',
                    }}
                    titleVariant={TypographyVariant.LSMALL_REGULAR}
                  />
                </View>
              ))
            ) : (
              // If no children, show the item itself? Or just empty.
              // For Kids, if subcategories have no children, we render sections for each subcategory.
              // Wait, if "Kids" has [Clothing, Shoes], and I render them as sections,
              // but they have NO children, it'll look empty.
              // Let's adjust the main render logic.
              <Typography
                text="No subcategories available"
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{
                  paddingLeft: Spacing.Small,
                  color: ColorPalette.TEXT_GREY_200,
                }}
              />
            )}
          </View>
        </View>
      );
    },
    [navigateToMain],
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
        {/* home header */}
        <Animated.View
          style={[animations.headerStyle]}
          onLayout={onHeaderLayout}>
          <HomeHeader
            addressMain={address}
            subAddress={subAddress}
            containerStyles={styles.headerCustom}
          />
        </Animated.View>

        {/* search */}
        <Animated.View
          style={[
            animations.searchBarStyle,
            {
              backgroundColor: ColorPalette.HOME_BLUE,
              // paddingTop:
              //   headerHeightRef.current
            },
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

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={ColorPalette.PRIMARY} />
          </View>
        ) : (
          <Animated.ScrollView
            onLayout={onTabBarLayout}
            style={[styles.mainContainer]}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingBottom: getScreenHeight(13),
                paddingTop:
                  headerHeightRef.current + searchBoxHeightRef.current,
              },
            ]}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: true,
                listener: (event: any) => {
                  const offsetY = event.nativeEvent.contentOffset.y;
                  // Update prevScrollY for direction tracking
                  prevScrollY.current = offsetY;
                  // Call handleScroll from animationUtils
                  handleScroll(event, scrollY, prevScrollY);
                },
              },
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[ColorPalette.HOME_BLUE]}
                tintColor={ColorPalette.HOME_BLUE}
                progressViewOffset={
                  (headerHeightRef.current || 0) +
                  (searchBoxHeightRef.current || 0) +
                  15
                }
              />
            }>
            {/* < View style={styles.slidingBarsContainer} >
              <SlidingBar
                options={filterOptions as any}
                selectedOption={selectedFilter as any}
                onOptionSelect={setSelectedFilter as any}
              />
            </View> */}
            {/* {currentCategory?.subcategories &&
              currentCategory.subcategories.some(
                (sub: any) => sub.subcategories,
              ) ? (
              // At least one subcategory has children, render them as sections
              currentCategory.subcategories.map((sub: any) =>
                renderCategorySection(sub),
              )
            ) : (
              // No subcategories have children, render all as a single grid
              <View style={styles.categoryContainer}>
                <View style={[CATEGORY_VIEW_STYLE, { marginTop: Spacing.Medium }]}>
                  {currentCategory?.subcategories?.map((sub: any) => (
                    <View
                      key={sub.category_id}
                      style={{
                        width: '22%',
                        alignItems: 'center',
                      }}>
                      <CategoryBox
                        title={decodeHTMLEntities(sub.category)}
                        imageSource={
                          sub.image_url
                            ? { uri: sub.image_url }
                            : require('../../../assets/images/productCardDemo.png')
                        }
                        onPress={() =>
                          navigateToMain(
                            selectedFilter.label,
                            decodeHTMLEntities(sub.category),
                            sub.category_id,
                            false,
                          )
                        }
                        imageContainerStyle={{
                          width: getScreenWidth(18.25),
                          height: getScreenHeight(11.25),
                          borderRadius: Spacing.Small,
                        }}
                        containerStyle={{
                          gap: getScreenHeight(0.5),
                          width: '100%',
                        }}
                        titleVariant={TypographyVariant.LMEDIUM_SEMIBOLD}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )} */}

            {apiData &&
              apiData.map((category: any) => renderCategorySection(category))}

            {!loading &&
              (!currentCategory?.subcategories ||
                currentCategory.subcategories.length === 0) && (
                <View style={{ alignItems: 'center', marginTop: Spacing.Large }}>
                  <Typography
                    text="No items found in this category"
                    variant={TypographyVariant.LMEDIUM_REGULAR}
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_200 }}
                  />
                </View>
              )}

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
        )}

        <VoiceSearchModal
          isVisible={isVoiceModalVisible}
          onClose={() => setIsVoiceModalVisible(false)}
          onResult={text => handleNavigateToSearchResult(text)}
        />
      </View>
    </ScreenWrapper>
  );
});

export default CategoriesScreen;
