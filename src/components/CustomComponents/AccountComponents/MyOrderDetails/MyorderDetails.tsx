import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../Header/Header';
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import StarIcon from '../../../../assets/icons/StarIcon';
import { goBack } from '../../../../utils/navigationref';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';

import { styles } from './MyorderDetails.styles';
import { Typography } from '../../../MainComponents/Typography/Typography';
import {
  Button,
  ButtonType,
  ButtonSize,
  ButtonVariant,
  ButtonState,
} from '../../../MainComponents/Button';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../../config/ApiConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import ScreenWrapper from '../../ScreenWrapper/ScreenWrapper';

const MyorderDetails = ({ route }: { route: any }) => {
  const { orderId, status } = route.params || {};
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId, userId]);

  const fetchOrderDetails = async () => {
    if (!orderId || !userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        API_ENDPOINTS.ORDER_DETAILS(orderId, userId),
      );
      if (response.data && response.data.order_info) {
        setOrderDetails(response.data.order_info);
      }
    } catch (error) {
      console.error('Failed to fetch order details', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={ColorPalette.PRIMARY} />
      </SafeAreaView>
    );
  }

  if (!orderDetails) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          text="Order not found"
          variant={TypographyVariant.H6_MEDIUM}
        />
      </SafeAreaView>
    );
  }

  const {
    status: orderStatus,
    status_color,
    products,
    firstname,
    lastname,
    s_address,
    s_address_2,
    s_city,
    s_country_descr,
    timestamp,
    format_total,
    format_subtotal,
    format_shipping_cost,
    format_subtotal_discount,
    status_description,
    format_payment_surcharge,
    applied_promotions,
  } = orderDetails;

  const getProductImage = (product: any): any => {
    // Helper to recursively find any image path in the product object
    const findUri = (obj: any): string | null => {
      if (!obj || typeof obj !== 'object') return null;

      // Check common CS-Cart image fields
      if (typeof obj.image_path === 'string' && obj.image_path.length > 5)
        return obj.image_path;
      if (
        typeof obj.https_image_path === 'string' &&
        obj.https_image_path.length > 5
      )
        return obj.https_image_path;
      if (typeof obj.image_url === 'string' && obj.image_url.length > 5)
        return obj.image_url;

      // Recurse into children
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const result = findUri(obj[key]);
          if (result) return result;
        }
      }
      return null;
    };

    const uri = findUri(product);
    return uri ? { uri } : require('../../../../assets/images/demo.png');
  };

  const isCancelled = orderStatus === 'C' || status_description === 'Cancelled';
  const displayStatus = status_description || status || 'Pending';
  const displayColor = status_color || '#6C84FE';

  const addressLine1 = s_address || '';
  const addressLine2 = s_address_2 ? `${s_address_2}, ${s_city}` : s_city;
  const addressLine3 = s_country_descr || '';

  const placedDate = timestamp;

  const shopName = orderDetails.company || 'Unknown Shop';

  // Normalize products to array
  const productsArray = (
    Array.isArray(products) ? products : Object.values(products || {})
  ) as any[];

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name="Order summary"
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.TEXT_GREY_500 as string}
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
        {productsArray.map((product, index) => {
          const productImage = getProductImage(product);
          const productTitle = product.product || 'Unknown Product';
          return (
            <View key={index} style={styles.productCardContainer}>
              <View style={styles.imageContainer}>
                <Image source={productImage} style={styles.image} />
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.textContainer}>
                  <Typography
                    text={productTitle}
                    variant={TypographyVariant.PMEDIUM_MEDIUM}
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                  />
                  <Typography
                    text={shopName}
                    variant={TypographyVariant.LMEDIUM_REGULAR}
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
                  />
                </View>
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.radioButton,
                      {
                        borderColor: displayColor,
                        backgroundColor: 'transparent',
                      },
                    ]}>
                    <View
                      style={[
                        styles.radioButtonInner,
                        { backgroundColor: displayColor },
                      ]}
                    />
                  </View>
                  <Typography
                    text={displayStatus}
                    variant={TypographyVariant.LMEDIUM_BOLD}
                    customTextStyles={{
                      color: ColorPalette.TEXT_GREY_300,
                      paddingVertical: getScreenHeight(0.1),
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })}

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
                  text={format_subtotal}
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
                  text={format_shipping_cost}
                  variant={TypographyVariant.H6_MEDIUM}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                />
              </View>
              {Number(orderDetails.payment_surcharge) > 0 && (
                <View style={styles.billRow}>
                  <Typography
                    text="Convenience fee"
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
                  />
                  <Typography
                    text={format_payment_surcharge}
                    variant={TypographyVariant.H6_MEDIUM}
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                  />
                </View>
              )}
              {Number(orderDetails.discount || orderDetails.subtotal_discount) >
                0 && (
                  <View style={styles.billRow}>
                    <Typography
                      text={`Total Discounts${applied_promotions &&
                          applied_promotions.length > 0 &&
                          applied_promotions[0]?.[0]?.name
                          ? ` (${applied_promotions[0][0].name})`
                          : ''
                        }`}
                      variant={TypographyVariant.PMEDIUM_REGULAR}
                      customTextStyles={{ color: ColorPalette.GREEN_200 }}
                    />
                    <Typography
                      text={format_subtotal_discount}
                      variant={TypographyVariant.H6_MEDIUM}
                      customTextStyles={{ color: ColorPalette.GREEN_200 }}
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
                text={format_total}
                variant={TypographyVariant.H6_BOLD}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
            {/* 
            <Button
              text="Rate Order"
              type={ButtonType.PRIMARY}
              size={ButtonSize.LARGE}
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              onPress={() => {}}
              customStyles={{marginTop: 20}}
            /> */}
          </View>
        )}

        <View style={styles.deliveryDetailsContainer}>
          <Typography
            text="Delivery Details"
            variant={TypographyVariant.H6_BOLD}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
          <View style={styles.deliveryRow}>
            <View style={styles.deliverySubRow}>
              <Typography
                text="Placed on"
                variant={TypographyVariant.PMEDIUM_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
              <Typography
                text={placedDate}
                variant={TypographyVariant.PMEDIUM_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
            <View style={styles.deliverySubRow}>
              <Typography
                text="Delivered to"
                variant={TypographyVariant.PMEDIUM_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
              <View>
                <Typography
                  text={`${firstname} ${lastname}`}
                  variant={TypographyVariant.PMEDIUM_MEDIUM}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_500,
                    textAlign: 'right',
                  }}
                />
                <Typography
                  text={addressLine1}
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_300,
                    textAlign: 'right',
                  }}
                />
                <Typography
                  text={addressLine2}
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_300,
                    textAlign: 'right',
                  }}
                />
                <Typography
                  text={addressLine3}
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_300,
                    textAlign: 'right',
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default MyorderDetails;
