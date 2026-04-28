import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../Header/Header'; // Adjust path if needed
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types'; // Adjust path
import ColorPalette from '../../../../config/ColorPalette';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import StarIcon from '../../../../assets/icons/StarIcon';
import { goBack } from '../../../../utils/navigationref';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';

import { styles } from './OrderCancelled.styles';
import { Typography } from '../../../MainComponents/Typography/Typography';
import {
  Button,
  ButtonType,
  ButtonSize,
  ButtonVariant,
  ButtonState,
} from '../../../MainComponents/Button';
import ScreenWrapper from '../../ScreenWrapper/ScreenWrapper';

const OrderCancelled = ({ route, navigation }) => {
  const { orderId, status, shopName, order_details, order_info } = route.params || {};

  // Dummy data mirroring the design
  const orderData = {
    image: require('../../../../assets/images/demo.png'),
    title: 'Men premium blue shoes',
    shopName: shopName || order_details?.company || order_info?.company || '',
    status: status || 'Shipped', // Use passed status or fallback
    statusColor: (status === 'Cancelled' ? '#FB3748' : '#6C84FE') || '#6C84FE', // Red for Cancelled, Blue for Shipped
  };

  const isCancelled = orderData.status === 'Cancelled';

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name="Order Cancelled"
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.TEXT_GREY_500}
        leftIcon={
          <ArrowLeftIcon style={undefined} onPress={goBack} size={22} />
        }
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(10) },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.productCardContainer}>
          <View style={styles.imageContainer}>
            <Image source={orderData.image} style={styles.image} />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.textContainer}>
              <Typography
                text={orderData.title}
                variant={TypographyVariant.PMEDIUM_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
              <Typography
                text={orderData.shopName}
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
              />
            </View>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.radioButton,
                  {
                    borderColor: orderData.statusColor,
                    backgroundColor: 'transparent',
                  },
                ]}>
                <View
                  style={[
                    styles.radioButtonInner,
                    { backgroundColor: orderData.statusColor },
                  ]}
                />
              </View>
              <Typography
                text={orderData.status}
                variant={TypographyVariant.LMEDIUM_BOLD}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
            </View>
          </View>
        </View>

        {/* Bill Details Section - Conditionally Rendered */}
        {!isCancelled && (
          <View style={styles.billDetailsContainer}>
            <Typography
              text="Bill Details"
              variant={TypographyVariant.H6_BOLD}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
            <View style={styles.rateRow}>
              <View style={styles.billRow}>
                <Typography
                  text="Total Product Price"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
                />
                <Typography
                  text="$1286"
                  variant={TypographyVariant.H6_MEDIUM}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                />
              </View>
              <View style={styles.billRow}>
                <Typography
                  text="Shipping Charges"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
                />
                <Typography
                  text="$5"
                  variant={TypographyVariant.H6_MEDIUM}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                />
              </View>
              <View style={styles.billRow}>
                <Typography
                  text="Total Discounts"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{ color: ColorPalette.GREEN_200 }}
                />
                <Typography
                  text="- $27"
                  variant={TypographyVariant.H6_MEDIUM}
                  customTextStyles={{ color: ColorPalette.GREEN_200 }}
                />
              </View>
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
                text="$1259"
                variant={TypographyVariant.H6_BOLD}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>

            <Button
              text="Download Invoice"
              onPress={() => console.log('Download Invoice')}
              type={ButtonType.OUTLINED}
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.PRIMARY}
              rightImages={[
                {
                  source: require('../../../../assets/images/Download.png'),
                  style: {
                    width: 20,
                    height: 20,
                    tintColor: ColorPalette.BLUE_300,
                    marginLeft: getScreenWidth(2),
                  } as any,
                },
              ]}
              customTextStyles={{ color: ColorPalette.BLUE_300 }}
              customStyles={{
                borderColor: ColorPalette.BLUE_300,
                borderWidth: 1.5,
              }}
            />
          </View>
        )}

        {/* Rating Section - Only for Delivered */}
        {orderData.status === 'Delivered' && (
          <View style={styles.ratingBarContainer}>
            <View style={styles.ratingTextContainer}>
              <View style={styles.starIconWrapper}>
                <StarIcon
                  size={24}
                  color={ColorPalette.RATING_COLOR as string}
                  strokeColor={ColorPalette.RATING_COLOR as string}
                  strokeWidth={1}
                  style={undefined}
                  onPress={() => { }}
                />
              </View>

              <View style={styles.ratingText}>
                <Typography
                  text="How was your experience?"
                  variant={TypographyVariant.PSMALL_MEDIUM}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                />
              </View>
            </View>
            <Button
              text="Rate Now"
              onPress={() => console.log('Rate Now Pressed')}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.PRIMARY}
              type={ButtonType.PRIMARY}
              state={ButtonState.DEFAULT}
              bgColor={ColorPalette.ROSE_PURPLE_300}
            />
          </View>
        )}

        {/* Order Details Section */}
        <View style={styles.billDetailsContainer}>
          <Typography
            text="Order Details"
            variant={TypographyVariant.H6_BOLD}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
          <View style={styles.billRow}>
            <Typography
              text="Order ID"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              {/* Copy Icon placeholder or just text for now as icon not found */}
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderWidth: 1,
                  borderColor: ColorPalette.TEXT_GREY_500,
                  borderRadius: 4,
                }}
              />
              <Typography
                text="#27812422423"
                variant={TypographyVariant.PMEDIUM_BOLD}
                customTextStyles={{ color: ColorPalette.BLACK }}
              />
            </View>
          </View>
          <View style={[styles.billRow, { alignItems: 'flex-start' }]}>
            <Typography
              text="Delivery Address"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
            />
            <View style={{ alignItems: 'flex-end' }}>
              <Typography
                text="Flat 3, Bluewave"
                variant={TypographyVariant.PMEDIUM_BOLD}
                customTextStyles={{ color: ColorPalette.BLACK }}
              />
              <Typography
                text="Apartments, Triq San Pawl"
                variant={TypographyVariant.PMEDIUM_BOLD}
                customTextStyles={{ color: ColorPalette.BLACK }}
              />
              <Typography
                text="Malta"
                variant={TypographyVariant.PMEDIUM_BOLD}
                customTextStyles={{ color: ColorPalette.BLACK }}
              />
            </View>
          </View>
          <View style={styles.billRow}>
            <Typography
              text="Order Placed"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
            />
            <Typography
              text="12 Jan 2025, 18:24 PM"
              variant={TypographyVariant.PMEDIUM_BOLD}
              customTextStyles={{ color: ColorPalette.BLACK }}
            />
          </View>
          <View style={styles.billRow}>
            <Typography
              text="Order Arrived at"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
            />
            <Typography
              text="18 Jan 2025, 11:24 AM"
              variant={TypographyVariant.PMEDIUM_BOLD}
              customTextStyles={{ color: ColorPalette.BLACK }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        {isCancelled ? (
          <Button
            text="Order Again"
            onPress={() => console.log('Order Again Pressed')}
            type={ButtonType.OUTLINED}
            size={ButtonSize.LARGE}
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            customStyles={{
              borderColor: ColorPalette.ROSE_PURPLE_300,
              borderWidth: 1.5,
            }}
            customTextStyles={{
              color: ColorPalette.ROSE_PURPLE_300,
            }}
          />
        ) : (
          <Button
            text="Cancel Order"
            onPress={() =>
              navigation.navigate('CancellationScreen', { orderId, status })
            }
            type={ButtonType.PRIMARY}
            size={ButtonSize.LARGE}
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            bgColor={ColorPalette.ROSE_PURPLE_300}
            withShadow={true}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default OrderCancelled;
