import React, { memo, useState, useRef } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import HeartIcon from '../../../../assets/icons/HeartIcon';
import StarRating from '../../../../assets/icons/StarRating';
import { toggleWishlistItem } from '../../../../store/slices/wishlistSlice';
import { Button } from '../../../MainComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../MainComponents/Button/Button.types';
import { Typography } from '../../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types';
import { styles } from './ProductCard.styles';
import { ProductCardProps } from './ProductCard.types';
import ColorPalette from '../../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import { Badge } from '../../../MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../MainComponents/Badges/Badge.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import {
  updateGuestQuantity,
  updateCartQuantityThunk,
  removeItemFromCart,
  removeGuestItem,
} from '../../../../store/slices/cartSlice';
import { Alert } from 'react-native';
import { useCartQuantity } from '../../../../hooks/useCartQuantity';
import { showToast } from '../../../MainComponents/Toast/ToastHelper';
import { ToastMessages } from '../../../MainComponents/Toast/ToastMessages';

/**
 * ProductCard: A reusable card component for displaying product information
 * with image, heart icon, title, price, rating, and add to cart button.
 *
 * @component
 * @param {ProductCardProps} props - Props for the ProductCard component
 * @returns {JSX.Element} The rendered ProductCard component
 */
const ProductCard: React.FC<ProductCardProps> = ({
  imageSource,
  title,
  originalPrice,
  discountedPrice,
  rating,
  reviewCount,
  deliveryInfo,
  onToggleFavorite,
  onAddToCart,
  onCardPress,
  testID,
  titleVariant = TypographyVariant.PMEDIUM_MEDIUM,
  priceVariant = TypographyVariant.H6_BOLD,
  buttonProps,
  buttonText = 'Add to cart',
  onImage = false,
  id,
  stock,
  isFavorite: isFavoriteProp,
}) => {
  const dispatch = useDispatch<any>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isFavoriteRedux = wishlistItems.some(
    (item: any) => String(item.product_id) === String(id),
  );

  const isFavorite = isFavoriteProp !== undefined ? isFavoriteProp : isFavoriteRedux;

  const {
    quantity: currentQuantity,
    increment: handleIncrement,
    decrement: handleDecrement,
  } = useCartQuantity(id);

  const [showQuantityTemporarily, setShowQuantityTemporarily] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
    }

    // Show quantity selector temporarily
    setShowQuantityTemporarily(true);

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set timer to hide quanity selector after 5 seconds
    timerRef.current = setTimeout(() => {
      setShowQuantityTemporarily(false);
    }, 5000);
  };

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleToggleFavorite = () => {
    if (!userId) {
      showToast(ToastMessages.CommonToastMessages.loginToAddWishlist, 'error');
      return;
    }
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  // Memoized components to prevent unnecessary re-renders
  const ProductImage = () =>
    typeof imageSource === 'string' ? (
      <Image source={{ uri: imageSource }} style={styles.image} />
    ) : (
      <Image source={imageSource} style={styles.image} />
    );

  const HeartButton = () => (
    <TouchableOpacity
      style={styles.heartIconContainer}
      onPress={handleToggleFavorite}
      activeOpacity={0.8}
      testID={`${testID}-heart-icon`}>
      <HeartIcon
        size={24}
        color={
          isFavorite
            ? (ColorPalette.RED_100 as string)
            : (ColorPalette.BLACK as string)
        }
        strokeWidth={isFavorite ? 2 : 1.5}
        filled={isFavorite}
        style={undefined}
      />
    </TouchableOpacity>
  );

  const Rating = () => (
    <View style={styles.ratingContainer}>
      <Typography
        text={(rating && rating > 0) ? rating.toFixed(1) : 'No Ratings'}
        variant={TypographyVariant.LSMALL_MEDIUM}
        customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
      />
      {(rating && rating > 0) ? (
        <StarRating
          style={undefined}
          size={12}
          color={ColorPalette.RATING_COLOR_ICON as string}
        />
      ) : null}
      {reviewCount ? (
        <Typography
          variant={TypographyVariant.LXSMALL_MEDIUM}
          text={`(${reviewCount})`}
          customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
        />
      ) : null}
    </View>
  );

  const PriceInfo = () => (
    <View style={styles.priceContainer}>
      <Typography
        variant={priceVariant}
        text={`€${discountedPrice.toFixed(2)}`}
        customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
      />
      {originalPrice ? (
        <Typography
          variant={TypographyVariant.LSMALL_MEDIUM}
          text={`€${originalPrice.toFixed(2)}`}
          customTextStyles={{
            color: ColorPalette.TEXT_GREY_100,
            textDecorationLine: 'line-through',
          }}
        />
      ) : null}
    </View>
  );

  // const DeliveryInfo = () =>
  //   deliveryInfo ? (
  //     <Badge
  //       text={deliveryInfo}
  //       variant={BadgeVariant.FILLED}
  //       type={BadgeType.PRIMARY}
  //       textVariant={TypographyVariant.LSMALL_MEDIUM}
  //       customContainerStyle={{
  //         backgroundColor: ColorPalette.WelcomeBack as string,
  //         paddingHorizontal: getScreenWidth(1.5),
  //         alignSelf: 'flex-start',
  //       }}
  //       customTextColor={ColorPalette.TEXT_GREY_400 as string}
  //     />
  //   ) : null;

  const QuantitySelector = () => (
    <View style={styles.quantitySelectorContainer}>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={handleDecrement}
        activeOpacity={0.7}>
        <Typography
          text="-"
          variant={TypographyVariant.LSMALL_SEMIBOLD}
          customTextStyles={{ color: ColorPalette.WHITE }}
        />
      </TouchableOpacity>
      <Typography
        text={String(currentQuantity)}
        variant={TypographyVariant.LSMALL_SEMIBOLD}
        customTextStyles={styles.quantityText}
      />
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={handleIncrement}
        activeOpacity={0.7}>
        <Typography
          text="+"
          variant={TypographyVariant.LSMALL_SEMIBOLD}
          customTextStyles={{ color: ColorPalette.WHITE }}
        />
      </TouchableOpacity>
    </View>
  );

  const CardContent = () => (
    <>
      <View style={styles.imageContainer}>
        <ProductImage />
        {stock !== undefined && stock <= 0 && (
          <View
            style={[
              styles.heartIconContainer,
              {
                backgroundColor: 'rgba(255,255,255,0.8)',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                borderRadius: 0,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Badge
              text="SOLD OUT"
              variant={BadgeVariant.FILLED}
              type={BadgeType.DANGER}
              customContainerStyle={{ backgroundColor: ColorPalette.RED_100 }}
            />
          </View>
        )}
        <HeartButton />
        <Rating />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.firstContainer}>
          <Typography
            variant={titleVariant}
            text={title}
            numberOfLines={1}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
          />
          <PriceInfo />
        </View>

        <View style={styles.detailsContainer}>
          {/* <DeliveryInfo /> */}
          {!onImage && <Rating />}
          {stock !== undefined && stock <= 0 ? (
            <Button
              text="Out of Stock"
              onPress={() => { }}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.PRIMARY}
              type={ButtonType.OUTLINED}
              state={ButtonState.DISABLED}
              customStyles={[
                styles.customButton,
                { borderColor: ColorPalette.TEXT_GREY_100 },
              ]}
              customTextStyles={[
                styles.customText,
                {
                  color: ColorPalette.TEXT_GREY_100,
                  fontSize: 10,
                },
              ]}
              useGradient={false}
            />
          ) : showQuantityTemporarily ? (
            <QuantitySelector />
          ) : (
            <Button
              text={buttonText}
              onPress={handleAddToCart}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.PRIMARY}
              type={ButtonType.OUTLINED}
              state={ButtonState.DEFAULT}
              customStyles={styles.customButton}
              customTextStyles={styles.customText}
              useGradient={true}
              {...buttonProps}
            />
          )}
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container} testID={testID ? String(testID) : undefined}>
      {onCardPress ? (
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={onCardPress}
          activeOpacity={0.95}>
          <CardContent />
        </TouchableOpacity>
      ) : (
        <CardContent />
      )}
    </View>
  );
};

export default memo(ProductCard);
