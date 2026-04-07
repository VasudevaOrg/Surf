import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import CartItem from '../../../../../components/CustomComponents/CartComponents/CartItemComponent/CartItem';
import { styles } from './CartStep.styles';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import { navigate } from '../../../../../utils/navigationref';
import { Typography } from '../../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../config/ColorPalette';
import BagIcon from '../../../../../assets/icons/BagIcon';
import BagIcon2 from '../../../../../assets/icons/BagIcon2';
import { TextInput } from 'react-native-gesture-handler';
import AnimatedTextInput from '../../../../../components/MainComponents/TextInput/TextInput';
import { Spacing } from '../../../../../config/globalStyles';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../../components/MainComponents/Button';

interface CartStepProps {
  products: any[];
  onUpdate: () => void;
  onRemove: (item: any) => void;
  onIncrement: (item: any) => void;
  onDecrement: (item: any) => void;
  cartData?: any;
  selectedShippingMethod?: any;
  onApplyCoupon?: (code: string) => void;
  isApplyingCoupon?: boolean;
  loadingProductId?: string | null;
}


const toHttps = (url: string): string => {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://');
};


const CartStep: React.FC<CartStepProps> = ({
  products,
  onUpdate,
  onRemove,
  onIncrement,
  onDecrement,
  cartData,
  selectedShippingMethod,
  onApplyCoupon,
  isApplyingCoupon,
  loadingProductId = null,
}) => {
  const [code, setCode] = useState('');

  const checkoutData = cartData;
  // Fallback to manual calculations if checkoutData.cart is missing (e.g. on validation error)
  const cart = checkoutData?.cart;
  const total = parseFloat(cart?.total || 0);
  const formatTotal = cart?.format_total || `€${total.toFixed(2)}`;

  const formatShipping = selectedShippingMethod
    ? selectedShippingMethod.format_rate || `€${selectedShippingMethod.rate}`
    : cart?.format_shipping_cost || '€0.00';

  const subtotalVal = parseFloat(cart?.subtotal || 0);
  const discountVal = parseFloat(
    cart?.subtotal_discount || cart?.discount || 0,
  );

  const handleCardPress = useCallback((productId: string) => {
    navigate('ProductDetail' as never, { productId } as never);
  }, []);

  const renderCartItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <CartItem
        key={item.item_id || item.product_id}
        imageSource={{
          uri: toHttps(
            item.image_url ||
            item.main_pair?.detailed?.image_path ||
            ''
          ) || 'https://via.placeholder.com/150',
        }}
        title={item.product}
        price={item.format_price || `€${item.price}`}
        strikethroughPrice={
          item.original_price && item.original_price > item.price
            ? `€${item.original_price}`
            : undefined
        }
        quantity={parseInt(item.amount)}
        onCardPress={() => handleCardPress(item.product_id)}
        containerStyle={{
          marginBottom:
            index === products.length - 1 ? 0 : getScreenHeight(1.5),
        }}
        onDecrement={() => onDecrement(item)}
        onIncrement={() => onIncrement(item)}
        onDelete={() => onRemove(item)}
        loading={
          String(item.item_id || item.product_id) === String(loadingProductId)
        }
        priceVariant={TypographyVariant.H6_MEDIUM}
      />
    ),
    [
      products.length,
      handleCardPress,
      onDecrement,
      onIncrement,
      onRemove,
      loadingProductId,
    ],
  );

  const coupons = checkoutData?.cart?.coupons;
  const isCouponApplied = coupons && Object.keys(coupons).length > 0;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          gap: getScreenHeight(1),
        }}>
        {products.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: getScreenWidth(2),
              paddingVertical: getScreenHeight(1),
            }}>
            <BagIcon2 />
            <Typography
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}>
              {products?.length} items in your cart
            </Typography>
          </View>
        )}
        <FlashList
          data={products}
          renderItem={renderCartItem}
          keyExtractor={item => item.item_id || item.product_id}
          showsVerticalScrollIndicator={false}
          extraData={loadingProductId}
          estimatedItemSize={100}
        />
      </View>
      {/* promo card */}
      <View style={styles.sectionContainer}>
        {/* Title */}
        <View style={styles.titleRow}>
          <Typography
            text="Have a promo code?"
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={styles.title}
          />
          {isCouponApplied && (
            <TouchableOpacity
              onPress={() => onApplyCoupon && onApplyCoupon('')}>
              <Typography
                text="Remove"
                variant={TypographyVariant.LSMALL_MEDIUM}
                customTextStyles={{ color: ColorPalette.RED_100 }}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Input + Button Row */}
        <View style={styles.row}>
          {/* Input */}
          <TextInput
            placeholder="Enter promo code"
            placeholderTextColor={ColorPalette.ROSE_PURPLE_70_OPACITY}
            value={isCouponApplied ? Object.keys(coupons)[0] : code}
            onChangeText={txt => {
              if (!isCouponApplied) setCode(txt);
            }}
            style={styles.input}
            editable={!isCouponApplied}
          />

          {/* Apply Button */}
          <Button
            text={isCouponApplied ? 'Applied' : 'Apply'}
            onPress={() => {
              if (onApplyCoupon && !isCouponApplied) {
                onApplyCoupon(code);
              }
            }}
            loading={isApplyingCoupon}
            state={isCouponApplied ? ButtonState.DISABLED : ButtonState.DEFAULT}
            size={ButtonSize.LARGE}
            bgColor={ColorPalette.WHITE as string}
            customStyles={{
              borderRadius: 12,
              paddingHorizontal: Spacing.Large,
              height: getScreenHeight(6),
              borderWidth: 1,
              borderColor: isCouponApplied
                ? ColorPalette.GREEN_200
                : (ColorPalette.ROSE_PURPLE_300 as string),
            }}
            customTextStyles={{
              textAlign: 'center',
              fontSize: 14,
              color: isCouponApplied
                ? ColorPalette.GREEN_200
                : ColorPalette.ROSE_PURPLE_300,
            }}
            withShadow={false}
          />
        </View>
      </View>

      {/* price details */}
      <View style={styles.sectionContainer}>
        <Typography
          text="Price Details"
          variant={TypographyVariant.H6_MEDIUM}
          customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
        />
        <View style={styles.rateRow}>
          <View style={styles.billRow}>
            <Typography
              text={`Product Price (Incl. of tax)`}
              // text={`Subtotal (${products.length} items)`} // prev rendering number of product include it subtotal price
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
            />
            <Typography
              text={checkoutData?.cart?.format_subtotal || '€0.00'}
              variant={TypographyVariant.PMEDIUM_SEMIBOLD}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
          </View>

          {/* {parseFloat(checkoutData?.cart?.tax || 0) > 0 && (
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
                customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
              />
            </View>
          )} */}
          {discountVal > 0 && (
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
                  checkoutData?.cart?.format_subtotal_discount ||
                  checkoutData?.cart?.format_discount ||
                  `-€${discountVal.toFixed(2)}`
                }
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
              text="Sub Total"
              variant={TypographyVariant.H6_SEMIBOLD}
            // customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
            />
            {/* <Typography
              text="Incl. all taxes and charges"
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
            /> */}
          </View>
          <Typography
            text={
              discountVal > 0
                ? `€${Math.max(0, subtotalVal - discountVal).toFixed(2)}`
                : checkoutData?.cart?.format_subtotal || '€0.00'
            }
            variant={TypographyVariant.H6_SEMIBOLD}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
        </View>
      </View>
    </View>
  );
};

export default CartStep;
