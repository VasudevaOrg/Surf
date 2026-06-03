import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

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

import {VendorCard} from '../../../../components/CustomComponents/VendorCard/VendorCard';
import {Header} from '../../../../components/CustomComponents/Header/Header';
import {SearchBox} from '../../../../components/CustomComponents/SearchBox/SearchBox';
import {SlidingBar} from '../../../../components/CustomComponents/SlidingBar/SlidingBar';
import {Typography} from '../../../../components/MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import {BorderRadius} from '../../../../config/globalStyles';
import {API_ENDPOINTS} from '../../../../config/ApiConfig';
import MicrophoneIcon from '../../../../assets/icons/MicrophoneIcon';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import {styles} from './BrandsPage.styles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import ScreenWrapper from '../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const decodeHTMLEntities = (text: string) => {
  if (!text) return '';
  return text.replace(/&amp;/g, '&');
};

const BrandsPage: React.FC = ({route}: any) => {
  const {type, title} = route.params || {
    type: 'brands',
    title: 'Brands',
  };
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [allBrands, setAllBrands] = useState<any[]>([]);

  const isVendors = type === 'vendors' || type === 'vendor';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const isVendors = type === 'vendors' || type === 'vendor';
        const endpoint = isVendors
          ? API_ENDPOINTS.VENDORS
          : API_ENDPOINTS.BRANDS;

        const response = await axios.get(endpoint);

        if (response.data) {
          let itemsArray: any[] = [];

          if (isVendors && (response.data.vendors || response.data.companies)) {
            const vendorsData =
              response.data.vendors || response.data.companies;
            if (Array.isArray(vendorsData)) {
              itemsArray = vendorsData.map((v: any) => ({
                brand_id: v.company_id,
                brand: decodeHTMLEntities(v.company),
                image_url: v.image_url || '',
                position: v.position || '0',
                description: decodeHTMLEntities(v.company_description),
                rating: v.average_rating || '0.0',
                ratings_count: v.discussion?.posts_count || 0,
                products_sold: '2,076', // Placeholder as per design, API doesn't seem to provide this yet
              }));
            } else {
              itemsArray = Object.keys(vendorsData).map((key: string) => {
                const v = vendorsData[key];
                return {
                  brand_id: v.company_id || key,
                  brand: decodeHTMLEntities(v.company),
                  image_url: v.image_url || '',
                  position: v.position || '0',
                  description: decodeHTMLEntities(v.company_description),
                  rating: v.average_rating || '0.0',
                  ratings_count: v.discussion?.posts_count || 0,
                  products_sold: '2,076', // Placeholder
                };
              });
            }
          } else if (!isVendors && response.data.brands) {
            const brandsObj = response.data.brands;
            itemsArray = Object.keys(brandsObj).map((key: string) => ({
              brand_id: brandsObj[key].variant_id || key,
              brand: decodeHTMLEntities(brandsObj[key].variant),
              image_url: brandsObj[key].image_url || '',
              position: brandsObj[key].position || '0',
            }));
          }

          setAllBrands(
            itemsArray.sort((a, b) => Number(a.position) - Number(b.position)),
          );
        }
      } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, title]);

  const filteredBrands = useMemo(() => {
    return allBrands.filter(b =>
      b.brand.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allBrands, searchQuery]);

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      {/* Header with Title and Back Arrow */}
      <Header
        name={title}
        variant={TypographyVariant.H6_MEDIUM}
        leftIcons={[
          {
            icon: ArrowLeft as any,
            onPress: () => navigation.goBack(),
            size: 24,
            color: ColorPalette.TEXT_GREY_500 as string,
          },
        ]}
      />

      {/* Standalone Search Bar Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBoxContainer}>
          <SearchBox
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={`Search ${title}`}
            customContainerStyle={styles.searchInput}
            iconColor={ColorPalette.TEXT_GREY_400 as string}
            iconStroke={2}
            iconSize={20}
            placeholderColor={ColorPalette.TEXT_GREY_200 as string}
            editable={true}
            autoFocus={false}
          />
          <View style={styles.micIconContainer}>
            <MicrophoneIcon
              size={20}
              color="#606060"
              style={undefined}
              onPress={undefined}
            />
          </View>
        </View>
      </View>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={ColorPalette.PRIMARY} />
        </View>
      ) : (
        <FlashList
          key={`${type}-${filteredBrands.length}`}
          data={filteredBrands}
          estimatedItemSize={80}
          renderItem={({item}: {item: any}) => {
            if (isVendors) {
              return (
                <VendorCard
                  item={item}
                  onPress={() => {
                    navigation.navigate('VendorDetails', {
                      vendorId: item.brand_id,
                      vendorName: item.brand,
                      isVendor: isVendors,
                    });
                  }}
                />
              );
            }

            return (
              <TouchableOpacity
                style={styles.brandCard}
                onPress={() => {
                  navigation.navigate('Search', {
                    screen: 'SearchResultScreen',
                    params: {
                      variant_id: item.brand_id,
                      variant_name: item.brand,
                    },
                  });
                }}>
                <View style={styles.brandImageContainer}>
                  {item.image_url ? (
                    <Image
                      source={{uri: toHttps(item.image_url)}}
                      style={styles.brandImage}
                    />
                  ) : (
                    <Typography
                      text={item.brand.charAt(0)}
                      variant={TypographyVariant.H4_BOLD}
                      customTextStyles={{color: ColorPalette.TEXT_GREY_100}}
                    />
                  )}
                </View>
                <Typography
                  text={item.brand}
                  variant={TypographyVariant.H6_BOLD}
                  customTextStyles={styles.brandName}
                  numberOfLines={1}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item: any) => item.brand_id.toString()}
          numColumns={isVendors ? 1 : 3}
          contentContainerStyle={{
            paddingBottom: getScreenHeight(4),
            paddingHorizontal: getScreenWidth(4),
            ...((!isVendors) && {
              backgroundColor: ColorPalette.WHITE as string,
              borderRadius: BorderRadius.Small,
            }),
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenWrapper>
  );
};

export default BrandsPage;
