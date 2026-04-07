import React from 'react';
import { ScrollView, View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../../../../../components/CustomComponents/Header/Header';
import { TypographyVariant } from '../../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../../config/ColorPalette';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeft';
import QuestionMarkIcon from '../../../../../../assets/icons/QuestionMarkIcon';
import ChevronIcon from '../../../../../../assets/icons/ChevronIcon';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import { goBack, navigateToMain } from '../../../../../../utils/navigationref';
import { styles } from './ConfirmOrder.styles';
import { Button } from '../../../../../../components/MainComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/MainComponents/Button';
import { Spacing } from '../../../../../../config/globalStyles';
import { Typography } from '../../../../../../components/MainComponents/Typography/Typography';
import SummaryItem from '../../../../../../components/CustomComponents/CartComponents/SummaryItem/SummaryItem';
import CarIcon from '../../../../../../assets/icons/CarIcon';

import BestSellerCard from '../../../../../../components/CustomComponents/HomeComponents/BestSellerComponent/BestSellerCard';
import CardHeader from '../../../../../../components/CustomComponents/HomeComponents/CardHeader';
import { bestSellerProducts } from '../../../../../../Screens/MainScreens/HomePages/HomeScreen.constants';
import ScreenWrapper from '../../../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

import { useRoute } from '@react-navigation/native';

const ConfirmOrder = () => {
  const route = useRoute<any>();
  const orderData = route.params?.orderData || {};
  const cartData = route.params?.cartData || {};

  const orderId = orderData.order_id || cartData?.order_id || 'N/A';

  // Products from order data or cart data
  const products = orderData?.products || cartData?.products || [];
  const firstProduct = products[0] || {};

  const billDetails = orderData?.totals || cartData || {};

  const handleDelete = () => {
    console.log('Delete item clicked');
  };

  const handleNavigate = () => {
    console.log('Navigate to item details');
  };

  const handleCardPress = () => {
    console.log('Card pressed');
  };

  const renderBestSellerItem = ({ item }: any) => (
    <BestSellerCard
      imageSource={item.imageSource}
      title={item.title}
      price={item.price}
      rating={item.rating}
      isFavorite={item.isFavorite}
      onToggleFavorite={() => { }}
      onAddToCart={() => { }}
      onCardPress={() => { }}
    />
  );

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name="Confirmation"
        variant={TypographyVariant.H6_SEMIBOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={15} onPress={goBack} />
        }
      // rightIcons={[
      //   {
      //     icon: QuestionMarkIcon,
      //     color: ColorPalette.TEXT_GREY_400,
      //     size: 24,
      //   },
      // ]}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(15) },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.deliveryContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../../../../assets/images/circleTick.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: getScreenHeight(0.5),
            }}>
            <Typography
              text="Thank you for shopping with us!"
              variant={TypographyVariant.PSMALL_MEDIUM}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
            <Typography
              text={`ID: #${orderId}`}
              variant={TypographyVariant.PXSMALL_MEDIUM}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
            />
          </View>
        </View>

        {products.map((item: any, index: number) => (
          <SummaryItem
            key={item.product_id || index}
            imageSource={
              item.image_url ||
              item.main_pair?.detailed?.image_path ||
              require('../../../../../../assets/images/demo.png')
            }
            title={item.product || 'Product'}
            price={item.format_price || `€${item.price}`}
            strikethroughPrice={
              item.original_price && item.original_price > item.price
                ? `€${item.original_price}`
                : undefined
            }
            shopName={item.company_name}
            onDelete={handleDelete}
            onNavigate={handleNavigate}
            onCardPress={handleCardPress}
            testID="summary-item"
          />
        ))}

        <View style={styles.billDetailsContainer}>
          <Typography
            text="Bill Details"
            variant={TypographyVariant.H6_BOLD}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
          <View style={styles.rateRow}>
            <View style={styles.billRow}>
              <Typography
                text="Product Price"
                variant={TypographyVariant.PMEDIUM_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
              <Typography
                text={
                  parseFloat(billDetails.discount || 0) > 0
                    ? `€${(
                      parseFloat(billDetails.subtotal || 0) +
                      Math.abs(parseFloat(billDetails.discount || 0))
                    ).toFixed(2)}`
                    : billDetails.format_subtotal ||
                    `€${parseFloat(billDetails.subtotal || 0).toFixed(2)}`
                }
                variant={TypographyVariant.H6_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
            {parseFloat(billDetails.discount || 0) > 0 && (
              <View style={styles.billRow}>
                <Typography
                  text="Discounts"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_300,
                  }}
                />
                <Typography
                  text={
                    billDetails.format_discount ||
                    `-€${Math.abs(
                      parseFloat(billDetails.discount || 0),
                    ).toFixed(2)}`
                  }
                  variant={TypographyVariant.H6_MEDIUM}
                  customTextStyles={{ color: ColorPalette.GREEN_200 }}
                />
              </View>
            )}
            <View style={styles.billRow}>
              <Typography
                text="Shipping Charges"
                variant={TypographyVariant.PMEDIUM_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
              <Typography
                text={
                  billDetails.format_shipping_cost ||
                  `€${parseFloat(billDetails.shipping_cost || 0).toFixed(2)}`
                }
                variant={TypographyVariant.H6_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
            <View style={styles.billRow}>
              <Typography
                text="Handling charges"
                variant={TypographyVariant.PMEDIUM_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
              <Typography
                text="€0.99"
                variant={TypographyVariant.H6_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
            {parseFloat(billDetails.tax || 0) > 0 && (
              <View style={styles.billRow}>
                <Typography
                  text="Taxes (incl.)"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
                />
                <Typography
                  text={
                    billDetails.format_tax ||
                    `€${parseFloat(billDetails.tax || 0).toFixed(2)}`
                  }
                  variant={TypographyVariant.H6_MEDIUM}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                />
              </View>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.orderRow}>
            <View>
              <Typography
                text="Order Total"
                variant={TypographyVariant.H6_BOLD}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
              <Typography
                text="Incl. all taxes and charges"
                variant={TypographyVariant.PSMALL_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
            </View>
            <Typography
              text={billDetails.format_total || `€${billDetails.total || 0}`}
              variant={TypographyVariant.H6_BOLD}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
          </View>
        </View>

        {/* <View style={styles.bestSellerContainer}>
          <CardHeader
            title="You may also like this"
            showRightSection={false}
            alternativeImage={require('../../../../../../assets/images/prize.png')}
            alternativeImageStyle={{
              width: getScreenWidth(12),
              height: getScreenWidth(8),
            }}
          />
          <FlatList
            data={bestSellerProducts}
            renderItem={renderBestSellerItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContainer}
            nestedScrollEnabled
          />
          <FlatList
            data={bestSellerProducts}
            renderItem={renderBestSellerItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContainer}
            nestedScrollEnabled
          />
          <Button
            text="See All Products"
            rightIcon={ChevronIcon}
            iconSize={16}
            onPress={() => { }}
            state={ButtonState.DEFAULT}
            size={ButtonSize.LARGE}
            type={ButtonType.PRIMARY}
            customStyles={{
              borderRadius: Spacing.XSmall,
            }}
            bgColor={ColorPalette.WelcomeBack}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            variant={ButtonVariant.PRIMARY}
            imageOverlapOffset={-20}
            leftImages={[
              {
                source: require('../../../../../../assets/images/featured2.png'),
                style: { width: 15, height: 15 },
                containerStyle: {
                  backgroundColor: ColorPalette.PEACH_00,
                  borderRadius: Spacing.XXXLarge,
                  padding: getScreenWidth(2),
                  borderWidth: 2,
                  borderColor: ColorPalette.WHITE,
                },
              },
              {
                source: require('../../../../../../assets/images/featured2.png'),
                style: { width: 15, height: 15 },
                containerStyle: {
                  backgroundColor: ColorPalette.PEACH_00,
                  borderRadius: Spacing.XXXLarge,
                  padding: getScreenWidth(2),
                  borderWidth: 2,
                  borderColor: ColorPalette.WHITE,
                },
              },
              {
                source: require('../../../../../../assets/images/featured2.png'),
                style: { width: 15, height: 15 },
                containerStyle: {
                  backgroundColor: ColorPalette.PEACH_00,
                  borderRadius: Spacing.XXXLarge,
                  padding: getScreenWidth(2),
                  borderWidth: 2,
                  borderColor: ColorPalette.WHITE,
                },
              },
            ]}
          />
        </View> */}

        {/* <View style={styles.deliveryContainerTwo}>
          <CarIcon style={undefined} size={16} />
          <Typography
            text="Estimated Delivery by Wednesday, 26th Jul"
            variant={TypographyVariant.LSMALL_MEDIUM}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
        </View> */}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: ColorPalette.WHITE,
          paddingHorizontal: getScreenWidth(4),
          paddingVertical: getScreenHeight(2),
        }}>
        <Button
          text="Continue Shopping"
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          type={ButtonType.PRIMARY}
          onPress={navigateToMain}
          state={ButtonState.DEFAULT}
          bgColor={ColorPalette.ROSE_PURPLE_300}
          customStyles={{
            borderRadius: Spacing.Medium,
            borderWidth: 1.5,
            borderColor: ColorPalette.ROSE_PURPLE_300,
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ConfirmOrder;
