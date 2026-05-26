import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { API_ENDPOINTS } from '../../../../../config/ApiConfig';
import { styles } from './PaymentStep.styles';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../config/ColorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import CheckmarkIcon from '../../../../../assets/icons/CheckmarkIcon';
import RevolutIcon from '../../../../../assets/icons/RevolutIcon';
import MastercardIcon from '../../../../../assets/icons/MastercardIcon';
import VisaIcon from '../../../../../assets/icons/VisaIcon';
import AnimatedTextInput from '../../../../../components/MainComponents/TextInput/TextInput';
import CalendarIcon from '../../../../../assets/icons/CalendarIcon';
import CheckIcon from '../../../../../assets/icons/CheckIcon';
import PriceItem from '../../../../../components/CustomComponents/CartComponents/PriceDetaileComponent/PriceItem';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../components/MainComponents/Button';
import { BorderRadius, Spacing } from '../../../../../config/globalStyles';
import ChevronIcon from '../../../../../assets/icons/ChevronIcon';
import PaymentMethodRow from '../../../../../components/CustomComponents/CartComponents/PaymentComponents/PaymentMethodRow/PaymentMethodRow';
import ShippingMethodRow from '../../../../../components/CustomComponents/CartComponents/PaymentComponents/ShippingMethodRow/ShippingMethodRow';
import { getCheckoutData } from '../../../../../services/CartService';
import ShieldIcon from '../../../../../assets/icons/ShieldIcon';
import CardIcon from '../../../../../assets/icons/CardIcon';
import PaypalIcon from '../../../../../assets/icons/PaypalIcon';
import RoundedCheckIcon from '../../../../../assets/icons/RoundedCheckIcon';
import TruckDeliveryIcon from '../../../../../assets/icons/TruckDeliveryIcon';

interface PaymentStepProps {
  selectedShippingMethod?: any;
  onShippingSelected?: (method: any) => void;
  selectedPaymentMethod?: any;
  onPaymentSelected?: (method: any) => void;
  cartData?: any;
  computedTotals?: any;
  isLoading?: boolean;
}

const toHttps = (url: string): string => {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://');
};

const PaymentStep: React.FC<PaymentStepProps> = ({
  selectedShippingMethod,
  onShippingSelected,
  selectedPaymentMethod,
  onPaymentSelected,
  cartData,
  computedTotals,
  isLoading,
}) => {
  const navigation = useNavigation<any>();

  // Form state (for future use)
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [sameAsShipping, setSameAsShipping] = useState(false);

  // Flat-map payment methods if they have sub-types (e.g. types)
  const paymentMethodsToRender = React.useMemo(() => {
    const list: any[] = [];
    if (cartData?.payment_methods?.length) {
      cartData.payment_methods.forEach((method: any) => {
        if (method.types && Array.isArray(method.types) && method.types.length > 0) {
          method.types.forEach((typeObj: any) => {
            list.push({
              ...method,
              payment: typeObj.payment,
              selected_type: typeObj.type,
              image: typeObj.image || method.image,
              unique_key: `${method.payment_id}_${typeObj.type}`,
            });
          });
        } else {
          list.push({
            ...method,
            unique_key: method.payment_id,
          });
        }
      });
    }
    return list;
  }, [cartData]);

  useEffect(() => {
    if (selectedPaymentMethod && !selectedPaymentMethod.selected_type) {
      // Find the first flat method that matches this payment_id
      const matchingFlatMethod = paymentMethodsToRender.find(
        (m: any) => m.payment_id === selectedPaymentMethod.payment_id
      );
      if (matchingFlatMethod) {
        onPaymentSelected?.(matchingFlatMethod);
      }
    }
  }, [selectedPaymentMethod, paymentMethodsToRender, onPaymentSelected]);

  const formatCurrency = (amount: any) => {
    if (amount === undefined || amount === null) return '€0.00';
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;

    // If it's a whole number, add .00, otherwise keep decimals
    return `€${num % 1 === 0 ? num.toFixed(2) : num}`;
  };

  // Show loader if explicitly loading OR if we don't have real methods yet
  if (isLoading || !cartData?.payment_methods) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: getScreenHeight(50),
        }}>
        <ActivityIndicator
          size="large"
          color={ColorPalette.PURPLE_200 as string}
        />
        <Typography
          text="Retrieving available methods..."
          variant={TypographyVariant.LMEDIUM_MEDIUM}
          customTextStyles={{
            marginTop: Spacing.Medium,
            color: ColorPalette.TEXT_GREY_300,
          }}
        />
      </View>
    );
  }
  // Use cartData from props
  const checkoutData = cartData;

  // Calculate dynamic totals
  const subtotal =
    parseFloat(checkoutData?.product_groups?.[0]?.products?.[0]?.subtotal) ||
    parseFloat(checkoutData?.cart?.subtotal || 0);

  const total = parseFloat(checkoutData?.cart?.total || 0);
  const formatTotal =
    checkoutData?.cart?.format_total || `€${total.toFixed(2)}`;

  const formatShipping =
    computedTotals?.format_shipping ||
    (selectedShippingMethod
      ? formatCurrency(selectedShippingMethod.rate)
      : formatCurrency(checkoutData?.cart?.shipping_cost || 0));

  const handlePaymentSelection = (payment: any) => {
    if (onPaymentSelected) {
      onPaymentSelected(payment);
    }
  };

  const handleShippingSelection = (shipping: any) => {
    if (onShippingSelected) {
      onShippingSelected(shipping);
    }
  };

  const toggleSameAsShipping = () => {
    setSameAsShipping(!sameAsShipping);
  };

  const getPaymentIcon = (method: any) => {
    const name = (method.payment || '').toLowerCase();
    if (name.includes('cash') || name.includes('cod') || name.includes('delivery')) {
      return <TruckDeliveryIcon size={24} color={ColorPalette.TEXT_GREY_500} />;
    }
    if (name.includes('card') || name.includes('credit') || name.includes('stripe')) {
      return <CardIcon size={24} color={ColorPalette.TEXT_GREY_500} />;
    }
    if (name.includes('revolut')) {
      return <RevolutIcon size={24} color={ColorPalette.TEXT_GREY_500} />;
    }
    if (name.includes('paypal')) {
      return <PaypalIcon size={24} color={ColorPalette.TEXT_GREY_500} />;
    }
    return undefined; // fallback to default image if none match and no image provided
  };


  return (
    <View style={styles.container}>
      <View style={styles.trustIndicator}>
        <ShieldIcon
          style={undefined}
          size={15}
          color={ColorPalette.GREEN_300}
        />
        <Typography
          text="100% Safe & Secure Payments"
          variant={TypographyVariant.LMEDIUM_REGULAR}
          customTextStyles={{ color: ColorPalette.GREEN_300 }}
        />
      </View>

      {/* Payment Methods Section  - new */}
      <View
        style={[
          styles.firstContainer,
          {
            paddingBottom: getScreenHeight(1.2),
          },
        ]}>
        <View style={styles.paymentText}>
          <Typography
            text="Select Payment Method"
            variant={TypographyVariant.H6_MEDIUM}
            customTextStyles={{ color: ColorPalette.PAYMENT_COLOR }}
          />
        </View>

        <View style={styles.radioContainer}>
          {paymentMethodsToRender.length ? (
            paymentMethodsToRender.map((method: any) => {
              const isSelected =
                selectedPaymentMethod?.payment_id === method.payment_id &&
                (method.selected_type
                  ? selectedPaymentMethod?.selected_type === method.selected_type
                  : true);

              return (
                <PaymentMethodRow
                  key={method.unique_key}
                  isSelected={isSelected}
                  onPress={() => handlePaymentSelection(method)}
                  imageSource={
  method.image
    ? { uri: toHttps(method.image) }
    : 'https://via.placeholder.com/150'
}
                  iconComponent={!method.image ? getPaymentIcon(method) : undefined}>
                  <View style={styles.paymentLabelContainer}>
                    <Typography
                      text={method.payment}
                      variant={TypographyVariant.LMEDIUM_MEDIUM}
                      customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
                    />
                  {method.description ? (
                      <Typography
                        text={method.description}
                        variant={TypographyVariant.PSMALL_REGULAR}
                        customTextStyles={{color: ColorPalette.TEXT_GREY_300}}
                      />
                    ) : null}
                  </View>
                </PaymentMethodRow>
              );
            })
          ) : (
            <Typography
              text="No payment methods available"
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_300,
                textAlign: 'center',
                paddingBottom: getScreenHeight(2),
              }}
            />
          )}
        </View>
      </View>

      {/* <View style={styles.secondContainer}>
        <Typography
          text="Card Details"
          variant={TypographyVariant.H6_MEDIUM}
          customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
        />
        <View style={{ marginTop: getScreenHeight(2), gap: getScreenHeight(2.5) }}>
          <AnimatedTextInput
            label="Card number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="number-pad"
            // customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
            // rightIcons={[
            //   {
            //     icon: <VisaIcon style={undefined} size={34} />,
            //   },
            // ]}
            showPlaceholder={true}
            placeholder="0000 0000 0000 0000"
          />
          <AnimatedTextInput
            label="Cardholder Name"
            value={nameOnCard}
            onChangeText={setNameOnCard}
            keyboardType="default"
            // customContainerStyles={{ paddingHorizontal: getScreenWidth(4) }}
            showPlaceholder={true}
            placeholder="Name on card"
          />
          <View style={styles.rowInputsContainer}>
            <AnimatedTextInput
              label="Expiry date"
              value={expiryDate}
              onChangeText={setExpiryDate}
              keyboardType="number-pad"
              showPlaceholder={true}
              placeholder="MM/YY"
              customContainerStyles={styles.halfWidthInput}
            // rightIcons={[
            //   {
            //     icon: <CalendarIcon style={undefined} />,
            //   },
            // ]}
            />
            <AnimatedTextInput
              label="CVC"
              value={securityCode}
              onChangeText={setSecurityCode}
              keyboardType="number-pad"
              showCountrySection={false}
              showPlaceholder={true}
              placeholder="***"
              customContainerStyles={styles.halfWidthInput}
            />
          </View>
        </View>
      </View> */}

      {/* price details */}
      <View style={styles.billDetailsContainer}>
        <Typography
          text="Price Details"
          variant={TypographyVariant.H6_MEDIUM}
          customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
        />
        <View style={styles.rateRow}>
          <View style={styles.billRow}>
            <Typography
              text="Product Price (Incl. of tax)"
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
            />
            <Typography
              text={checkoutData?.cart?.format_subtotal || '€0.00'}
              variant={TypographyVariant.PMEDIUM_SEMIBOLD}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
          </View>
          <View style={styles.billRow}>
            <Typography
              text="Shipping cost"
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_100,
                paddingVertical: getScreenHeight(0.1),
              }}
            />
            <Typography
              text={formatShipping}
              variant={TypographyVariant.PMEDIUM_SEMIBOLD}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
          </View>
          {parseFloat(checkoutData?.cart?.tax || 0) > 0 && (
            <View style={styles.billRow}>
              <Typography
                text="Tax (incl.)"
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_100,
                  paddingVertical: getScreenHeight(0.1),
                }}
              />
              <Typography
                text={
                  checkoutData?.cart?.format_tax ||
                  `€${checkoutData?.cart?.tax}`
                }
                variant={TypographyVariant.PMEDIUM_SEMIBOLD}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
          )}
          {parseFloat(computedTotals?.fee || 0) > 0 && (
            <View style={styles.billRow}>
              <Typography
                text="Handling charges"
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_100,
                  paddingVertical: getScreenHeight(0.1),
                }}
              />
              <Typography
                text={computedTotals?.format_fee || `€${computedTotals?.fee}`}
                variant={TypographyVariant.PMEDIUM_SEMIBOLD}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
          )}
          {checkoutData?.cart?.discount > 0 && (
            <View style={styles.billRow}>
              <Typography
                text="Discounts"
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_100,
                  paddingVertical: getScreenHeight(0.1),
                }}
              />
              <Typography
                text={checkoutData?.cart?.format_subtotal_discount || '€0.00'}
                variant={TypographyVariant.H6_MEDIUM}
                customTextStyles={{ color: ColorPalette.GREEN_200 }}
              />
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.orderRow}>
          <View style={{ flexDirection: 'column', gap: getScreenHeight(0.3) }}>
            <Typography
              text="Order Total"
              variant={TypographyVariant.H6_SEMIBOLD}
            // customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
            <Typography
              text="Incl. all taxes and charges"
              variant={TypographyVariant.LSMALL_REGULAR}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_50,
                paddingVertical: getScreenHeight(0.1),
              }}
            />
          </View>
          <Typography
            text={computedTotals?.format_total || formatTotal}
            variant={TypographyVariant.H6_SEMIBOLD}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
        </View>
      </View>
      <View style={styles.continueIndicator}>
        <Typography
          text="Clicking ‘Continue’ will not deduct any money."
          variant={TypographyVariant.LSMALL_REGULAR}
          customTextStyles={{
            color: ColorPalette.ORANGE_600,
            paddingVertical: getScreenHeight(0.1),
          }}
        />
      </View>
    </View>
  );
};

export default PaymentStep;
