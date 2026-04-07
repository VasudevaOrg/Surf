import React, { useCallback, useState, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CategoriesNavigatorParamList } from '../../../../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getScreenHeight } from '../../../../helpers/screenSize';
import { styles } from './ViewAllScreen.styles';
import { Header } from '../../../../components/CustomComponents/Header/Header';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import ColorPalette from '../../../../config/ColorPalette';
import { goBack } from '../../../../utils/navigationref';
import { Typography } from '../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../components/MainComponents/Typography/Typography.types';
import { productsForYou } from '../../SearchPages/SearchScreen.constants';
import { ProductsGrid } from '../../../../components/CustomComponents/ProductsGrid';

// Define sort options (moved from FilterBadges)
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First', isSelected: false },
  { value: 'oldest', label: 'Oldest First', isSelected: false },
  { value: 'priceLowToHigh', label: 'Price: Low to High', isSelected: false },
  { value: 'priceHighToLow', label: 'Price: High to Low', isSelected: false },
];

// Define filter sections data
export const FILTER_SECTIONS = [
  {
    name: 'Category',
    type: 'checkbox',
    searchable: true,
    options: [
      'Top wear',
      'Bottom wear',
      'Inner wear & Sleep wear',
      'Sports & Active wear',
      'Footwear',
      "Men's Accessories",
      'Personal care & Grooming',
      'Beach wear',
    ],
  },
  {
    name: 'Gender',
    type: 'radio',
    options: ['Male', 'Female', 'Unisex', 'Kids'],
  },
  {
    name: 'Fabric',
    type: 'checkbox',
    searchable: true,
    options: [
      'Cotton',
      'Silk',
      'Linen',
      'Wool',
      'Polyester',
      'Blends',
      'Rayon',
      'Denim',
      'Satin',
    ],
  },
  {
    name: 'Color',
    type: 'checkbox',
    searchable: true,
    colors: {
      Olive: '#808000',
      Emerald: '#50C878',
      Blue: '#0000FF',
      Khaki: '#C3B091',
      Maroon: '#800000',
      Navy: '#000080',
      Lavender: '#E6E6FA',
      Magenta: '#FF00FF',
      Indigo: '#4B0082',
    },
    options: [
      'Olive',
      'Emerald',
      'Blue',
      'Khaki',
      'Maroon',
      'Navy',
      'Lavender',
      'Magenta',
      'Indigo',
    ],
  },
  {
    name: 'Price',
    type: 'radio',
    options: [
      'Under $10',
      '$10 - $25',
      '$25 - $50',
      '$50 - $100',
      'Above $100',
    ],
  },
  {
    name: 'Occasion',
    type: 'checkbox',
    searchable: true,
    options: [
      'Casual & Everyday',
      'Work & Office',
      'Party & Night Out',
      'Weddings & Festive',
      'Vacation & Travel',
    ],
  },
];

// Change to a standard function component with React.FC type
import CategoryBox from '../../../../components/CustomComponents/HomeComponents/CategoryBox';
import { navigate } from '../../../../utils/navigationref';
import { getScreenWidth } from '../../../../helpers/screenSize';
import ScreenWrapper from '../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const ViewAllScreen: React.FC = () => {
  const route =
    useRoute<
      RouteProp<
        { params: { category: string; subcategories: any[]; categoryId: string } },
        'params'
      >
    >();

  const { category, subcategories } = useMemo(
    () => ({
      category: route.params?.category || 'Category',
      subcategories: route.params?.subcategories || [],
    }),
    [route.params],
  );

  const handleCategoryPress = useCallback(
    (sub: any) => {
      navigate('MainScreens', {
        screen: 'Search',
        params: {
          screen: 'SearchResultScreen',
          params: {
            category,
            subCategory: sub.category,
            categoryOptions: [],
            category_id: sub.category_id,
          },
        },
      } as any);
    },
    [category],
  );

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name={category}
        leftIcon={
          <ArrowLeftIcon
            style={undefined}
            onPress={goBack}
            size={24}
            color={ColorPalette.TEXT_GREY_400}
          />
        }
        rightIcons={[
          {
            icon: SearchIcon,
            onPress: () => console.log('Search pressed'),
            size: 20,
            color: ColorPalette.TEXT_GREY_400,
            strokeWidth: 2,
          },
        ]}
        variant={TypographyVariant.H6_MEDIUM}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(5) },
        ]}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 12,
            marginTop: 12,
          }}>
          {subcategories.map((sub: any) => (
            <View
              key={sub.category_id}
              style={{
                width: '22%',
                alignItems: 'center',
                marginBottom: 20,
                marginHorizontal: '1.5%',
              }}>
              <CategoryBox
                title={sub.category}
                imageSource={
                  sub.image_url
                    ? { uri: sub.image_url }
                    : require('../../../../assets/images/noProductImageAvailable.png')
                }
                onPress={() => handleCategoryPress(sub)}
                imageContainerStyle={{
                  width: getScreenWidth(20),
                  height: getScreenHeight(9),
                  borderRadius: 8,
                }}
                containerStyle={{
                  gap: 4,
                  width: '100%',
                }}
                titleVariant={TypographyVariant.LSMALL_REGULAR}
              />
            </View>
          ))}
        </View>

        {subcategories.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <Typography
              text="No subcategories found"
              variant={TypographyVariant.PMEDIUM_MEDIUM}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
            />
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ViewAllScreen;
