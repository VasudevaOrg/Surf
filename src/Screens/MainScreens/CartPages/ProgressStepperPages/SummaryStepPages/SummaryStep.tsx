import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './SummaryStep.styles';
import CarIcon from '../../../../../assets/icons/CarIcon';
import { Typography } from '../../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../config/ColorPalette';
import SummaryItem from '../../../../../components/CustomComponents/CartComponents/SummaryItem/SummaryItem';
import DeleteIcon from '../../../../../assets/icons/DeleteIcon';
import ChevronIcon from '../../../../../assets/icons/ChevronIcon';
import LocationPinIcon from '../../../../../assets/icons/LocationPinIcon';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import FlowBite from '../../../../../assets/icons/FlowBite';
import MastercardIcon from '../../../../../assets/icons/MastercardIcon';
import VisaIcon from '../../../../../assets/icons/VisaIcon';
import PriceItem from '../../../../../components/CustomComponents/CartComponents/PriceDetaileComponent/PriceItem';
import { navigate } from '../../../../../utils/navigationref';
import TruckDelivery from '../../../../../assets/icons/TruckDeliveryIcon';
import TruckDeliveryIcon2 from '../../../../../assets/icons/TruckDeliveryIcon2';
import ShieldIcon from '../../../../../assets/icons/ShieldIcon';
import ArrowRightIcon from '../../../../../assets/icons/ArrowRightIcon';
import CardIcon from '../../../../../assets/icons/CardIcon';
import { BorderRadius, Spacing } from '../../../../../config/globalStyles';
import { Badge } from '../../../../../components/MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../../../components/MainComponents/Badges/Badge.types';

interface SummaryStepProps {
  cartData: any;
  selectedShippingMethod?: any;
  selectedPaymentMethod?: any;
  selectedAddress?: any;
  onEditAddress?: () => void;
  onEditPayment?: () => void;
  onEditOrderItem?: () => void;
  computedTotals?: any;
}

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

const SummaryStep: React.FC<SummaryStepProps> = ({
  cartData,
  selectedShippingMethod,
  selectedPaymentMethod,
  selectedAddress,
  onEditAddress,
  onEditPayment,
  onEditOrderItem,
  computedTotals,
}) => {
  // Normalize cart data (handle API response vs Redux fallback)
  const cartValues = cartData?.cart || cartData || {};

  // Products can be an array or an object (as seen in the provided API response)
  const rawProducts =
    cartValues?.products ||
    cartData?.product_groups?.[0]?.products ||
    cartData?.cart_products ||
    [];
  const products = Array.isArray(rawProducts)
    ? rawProducts
    : Object.values(rawProducts || {});

  const userProfile =
    cartValues?.user_data ||
    cartData?.user_profiles?.[0] ||
    cartData?.user_data;

  // Handlers for the SummaryItem actions
  const handleDelete = () => {
    console.log('Delete item clicked');
  };

  const handleNavigate = (productId: string) => {
    navigate('ProductDetail' as never, { productId } as never);
  };

  const handleCardPress = (productId: string) => {
    navigate('ProductDetail' as never, { productId } as never);
  };

  // Get address: priority to selectedAddress, then fallback
  const addressToDisplay = selectedAddress || userProfile;

  // Format address string
  let deliveryAddressStr = 'No delivery address selected';

  if (selectedAddress?.houseNo) {
    // It's from AddressStep
    deliveryAddressStr = `${selectedAddress.houseNo}, ${selectedAddress.streetName}, ${selectedAddress.country}`;
  } else if (addressToDisplay) {
    // Fallback to raw data structure
    const p = addressToDisplay;
    deliveryAddressStr = `${p.s_address || p.address || ''}, ${p.s_city || p.city || ''
      }, ${p.s_country_descr || p.country || ''} ${p.s_zipcode || p.zipcode || ''
      }`.trim();
  }

  const formatCurrency = (amount: any) => {
    if (amount === undefined || amount === null) return '€0.00';
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;

    // If it's a whole number, add .00, otherwise keep decimals
    return `€${num % 1 === 0 ? num.toFixed(2) : num}`;
  };

  // Calculate dynamic totals
  const subtotal =
    computedTotals?.subtotal || parseFloat(cartValues.subtotal || 0);
  const discount =
    computedTotals?.discount || parseFloat(cartValues.discount || 0);

  // Use API provided total if available, otherwise calculate
  // The API response "total" usually includes shipping if shipping is selected.
  // We prioritize the API value to ensure we match the backend.
  const apiTotal = parseFloat(cartValues.total || 0);

  const shippingCost = selectedShippingMethod
    ? parseFloat(selectedShippingMethod.rate)
    : computedTotals?.shipping || parseFloat(cartValues.shipping_cost || 0);

  const total =
    computedTotals?.total ||
    subtotal +
    shippingCost -
    discount +
    (computedTotals?.fee !== undefined ? computedTotals.fee : 0);
  const formatTotal =
    computedTotals?.format_total ||
    cartValues.format_total ||
    `€${total.toFixed(2)}`;

  const formatShipping =
    computedTotals?.format_shipping ||
    (selectedShippingMethod
      ? formatCurrency(selectedShippingMethod.rate)
      : formatCurrency(cartValues.shipping_cost || 0));

  // Calculate dynamic delivery date
  const formatEstimatedDelivery = (deliveryTime?: string) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const date = new Date();
    let daysToAdd = 3; // Fallback

    if (deliveryTime) {
      const numbers = deliveryTime.match(/\d+/g);
      if (numbers && numbers.length > 0) {
        daysToAdd = Math.max(...numbers.map(Number));
      } else if (deliveryTime.toLowerCase().includes('next day')) {
        daysToAdd = 1;
      }
    }

    date.setDate(date.getDate() + daysToAdd);

    const dayName = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthName = months[date.getMonth()];

    const suffix = (day: number) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${dayName}, ${dayOfMonth}${suffix(dayOfMonth)} ${monthName}`;
  };

  const deliveryDateText = formatEstimatedDelivery(
    selectedShippingMethod?.service_delivery_time,
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.deliveryContainer}>
          <TruckDeliveryIcon2
            style={undefined}
            size={20}
            color={ColorPalette.HOME_BLUE}
          />
          <Typography
            text={`Estimated Delivery by ${deliveryDateText}`}
            variant={TypographyVariant.LSMALL_MEDIUM}
            customTextStyles={{ color: ColorPalette.HOME_BLUE }}
          />
        </View>

        <View style={styles.summaryItemContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: getScreenWidth(2),
            }}>
            <Typography
              text={`Order Items (${products?.length})`}
              variant={TypographyVariant.H6_MEDIUM}
            />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            // onPress={onEditAddress}
            >
              <Typography
                text="Edit"
                onPress={onEditOrderItem}
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{
                  color: ColorPalette.HOME_BLUE,
                  paddingVertical: getScreenHeight(0.1),
                }}
              />
              <ArrowRightIcon
                size={18}
                style={undefined}
                color={ColorPalette.HOME_BLUE as string}
              />
            </TouchableOpacity>
          </View>
          {products.map((item: any) => (
            <SummaryItem
              key={item.item_id || item.product_id}
              imageSource={
                toHttps(item.image_url || item.main_pair?.detailed?.image_path || '')
                || 'https://via.placeholder.com/150'
              }
              title={item.product}
              price={item.format_price || `€${item.price}`}
              strikethroughPrice={
                item.original_price && item.original_price > item.price
                  ? `€${item.original_price}`
                  : undefined
              }
              shopName={item.company_name}
              onNavigate={() => handleNavigate(item.product_id)}
              onCardPress={() => handleCardPress(item.product_id)}
              testID="summary-item"
              priceVariant={TypographyVariant.H6_MEDIUM}
              quantity={item.amount}
            />
          ))}
        </View>

        {/* delivery addrress */}
        <View style={styles.paymentContainer}>
          {/* Header Row */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: getScreenWidth(2),
              }}>
              <LocationPinIcon
                style={undefined}
                size={20}
                color={ColorPalette.HOME_BLUE as string}
              />
              <Typography
                text="Delivery Address"
                variant={TypographyVariant.H6_MEDIUM}
              />
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={onEditAddress}>
              <Typography
                text="Change"
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{
                  color: ColorPalette.HOME_BLUE,
                  paddingVertical: getScreenHeight(0.1),
                }}
              />
              <ArrowRightIcon
                size={18}
                style={undefined}
                color={ColorPalette.HOME_BLUE as string}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Typography
              text={selectedAddress?.name}
              variant={TypographyVariant.H6_MEDIUM}
            />
            <Typography
              text={selectedAddress?.houseNo}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={styles.value}
            />
            <Typography
              text={selectedAddress?.streetName}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={styles.value}
            />
            <Typography
              text={selectedAddress?.country}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={styles.value}
            />
            <Typography
              text={selectedAddress?.phoneNumber}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={[
                styles.value,
                {
                  color: ColorPalette.TEXT_GREY_50,
                },
              ]}
            />
          </View>
        </View>

        {/* payment method */}
        <View style={styles.paymentContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: getScreenWidth(2),
              }}>
              <CardIcon size={20} color={ColorPalette.HOME_BLUE as string} />
              <Typography
                text="Payment Method"
                variant={TypographyVariant.H6_MEDIUM}
              />
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={onEditPayment}>
              <Typography
                text="Change"
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{
                  color: ColorPalette.HOME_BLUE,
                  paddingVertical: getScreenHeight(0.1),
                }}
              />
              <ArrowRightIcon
                size={18}
                style={undefined}
                color={ColorPalette.HOME_BLUE as string}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: getScreenWidth(2),
                alignItems: 'center',
                justifyContent: 'center',
                padding: getScreenWidth(2),
              }}>
              <View
                style={{
                  width: getScreenWidth(11.5),
                  height: getScreenHeight(5.5),
                  borderRadius: BorderRadius.Small,
                  backgroundColor: ColorPalette.PURPLE_08,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CardIcon size={18} color={ColorPalette.HOME_BLUE} />
              </View>
              <Typography
                text={selectedPaymentMethod?.payment || 'Select Payment Method'}
                variant={TypographyVariant.PMEDIUM_MEDIUM}
              />
            </View>
          </View>
        </View>

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
                text="Product Price"
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
              />
              <Typography
                text={
                  computedTotals?.format_subtotal && discount > 0
                    ? `€${(subtotal + discount).toFixed(2)}`
                    : computedTotals?.format_subtotal ||
                    formatCurrency(subtotal)
                }
                variant={TypographyVariant.PMEDIUM_SEMIBOLD}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
            {discount > 0 && (
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
                  text={
                    computedTotals?.format_discount ||
                    `-€${discount.toFixed(2)}`
                  }
                  variant={TypographyVariant.PMEDIUM_SEMIBOLD}
                  customTextStyles={{ color: ColorPalette.GREEN_200 }}
                />
              </View>
            )}
            <View style={styles.billRow}>
              <Typography
                text="Shipping"
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
            {(computedTotals?.tax > 0 ||
              parseFloat(cartValues?.tax || 0) > 0) && (
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
                      computedTotals?.format_tax ||
                      cartValues?.format_tax ||
                      formatCurrency(cartValues?.tax)
                    }
                    variant={TypographyVariant.PMEDIUM_SEMIBOLD}
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                  />
                </View>
              )}
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
                text={computedTotals?.format_fee || '€0.99'}
                variant={TypographyVariant.PMEDIUM_SEMIBOLD}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.orderRow}>
            <View style={{ flexDirection: 'column', gap: getScreenHeight(0.3) }}>
              <Typography
                text="Order Total"
                variant={TypographyVariant.H6_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
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
              text={formatTotal}
              variant={TypographyVariant.H6_MEDIUM}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
          </View>
        </View>
        <View style={[styles.trustIndicator, { marginTop: getScreenHeight(1) }]}>
          <ShieldIcon
            style={undefined}
            size={15}
            color={ColorPalette.TEXT_GREY_50}
          />
          <Typography
            text="Secure Checkout with PayPal - SSL Encrypted"
            variant={TypographyVariant.LSMALL_REGULAR}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_50 }}
          />
        </View>
      </View>
    </>
  );
};

export default SummaryStep;
