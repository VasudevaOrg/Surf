import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import HeartIcon from '../../../../assets/icons/HeartIcon';
import StarRating from '../../../../assets/icons/StarRating';
import { Typography } from '../../../MainComponents/Typography/Typography';
import { Button } from '../../../MainComponents/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../MainComponents/Button/Button.types';
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types';
import { BestSellerCardProps } from './BestSellerCard.types';
import { createBestSellerCardStyles } from './BestSellerCard.styles';
import { Badge } from '../../../MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../MainComponents/Badges/Badge.types';
import ColorPalette from '../../../../config/ColorPalette';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import {
  updateGuestQuantity,
  updateCartQuantityThunk,
  removeItemFromCart,
  removeGuestItem,
} from '../../../../store/slices/cartSlice';
import { toggleWishlistItem } from '../../../../store/slices/wishlistSlice';
import { Alert } from 'react-native';
import { useCartQuantity } from '../../../../hooks/useCartQuantity';
import { showToast } from '../../../MainComponents/Toast/ToastHelper';
import { ToastMessages } from '../../../MainComponents/Toast/ToastMessages';

/**
 * BestSellerCard: A reusable card component for displaying product information
 * with image, heart icon, title, price, rating, and add to cart button.
 *
 * @component
 * @param {BestSellerCardProps} props - Props for the BestSellerCard component
 * @returns {JSX.Element} The rendered BestSellerCard component
 *
 * @example
 * <BestSellerCard
 *   imageSource={require('../assets/product.png')}
 *   title="Designer Handwoven Shoes"
 *   price={165.50}
 *   rating={3.9}
 *   onAddToCart={() => console.log('Add to cart')}
 *   onToggleFavorite={() => console.log('Toggle favorite')}
 * />
 */
const BestSellerCard: React.FC<BestSellerCardProps> = ({
  imageSource,
  title,
  price = 0,
  rating = 0,
  onAddToCart,
  onCardPress,
  containerStyle,
  imageContainerStyle,
  contentContainerStyle,
  titleVariant = TypographyVariant.PSMALL_MEDIUM,
  priceVariant = TypographyVariant.LMEDIUM_BOLD,
  buttonProps,
  buttonText = 'Add to cart',
  showRating = true,
  testID,
  strikethroughPrice,
  onToggleFavorite,
  id,
  stock,
  isFavorite: isFavoriteProp,
  isProductDetail = false,
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
      onAddToCart({
        id,
        title,
        price: typeof price === 'number' ? price : 0,
        imageSource,
        rating,
      });
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

  const styles = createBestSellerCardStyles();

  /**
   * Renders the product image based on the image source type
   * Handles both URI strings and require() image sources
   */
  const renderImage = () => {
    if (typeof imageSource === 'string') {
      return <Image source={{ uri: imageSource }} style={styles.image} />;
    }
    return <Image source={imageSource} style={styles.image} />;
  };

  const handleToggleFavorite = () => {
    if (!userId) {
      showToast(ToastMessages.CommonToastMessages.loginToAddWishlist, 'error');
      return;
    }
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

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

  /**
   * Renders the main content of the card including image, heart icon,
   * product details, and action button
   */
  const renderContent = () => (
    <>
      <View style={[styles.imageContainer, imageContainerStyle]}>
        {renderImage()}
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
        <TouchableOpacity
          style={styles.heartIconContainer}
          onPress={handleToggleFavorite}
          activeOpacity={0.8}
          testID={`${testID}-heart-icon`}>
          <HeartIcon
            size={20}
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
        {/* Hide rating on image if isProductDetail (shown next to price instead) or strict check */}
        {!isProductDetail && (
          <View style={styles.ratingContainer}>
            <Typography
              text={(rating && rating > 0) ? rating.toString() : 'No Ratings'}
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
          </View>
        )}
      </View>

      <View style={[styles.contentContainer, contentContainerStyle]}>
        <Typography
          variant={titleVariant}
          text={title}
          numberOfLines={1}
          customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
        />

        <View
          style={[
            styles.priceRatingContainer,
            isProductDetail && {
              justifyContent: 'space-between',
              width: '100%',
              paddingRight: 4,
            },
          ]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Typography
              variant={priceVariant}
              text={`€${typeof price === 'number' ? price.toFixed(2) : '0.00'}`}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
            {typeof strikethroughPrice === 'number' && strikethroughPrice > 0 && (
              <Typography
                text={`€${strikethroughPrice.toFixed(2)}`}
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_300,
                  textDecorationLine: 'line-through',
                }}
              />
            )}
          </View>
          {isProductDetail && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Typography
                text={(rating && rating > 0) ? rating.toString() : 'No Ratings'}
                variant={TypographyVariant.LSMALL_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
              {(rating && rating > 0) ? (
                <StarRating
                  style={undefined}
                  size={12}
                  color={ColorPalette.RATING_COLOR as string} // Yellow color as requested
                />
              ) : null}
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
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
                  fontSize: 10, // Reduced font size to fit on one line
                },
              ]}
              useGradient={false}
            />
          ) : showQuantityTemporarily || currentQuantity > 0 ? (
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
    <View style={[styles.container, containerStyle]} testID={testID}>
      {onCardPress ? (
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={onCardPress}
          activeOpacity={0.95}>
          {renderContent()}
        </TouchableOpacity>
      ) : (
        renderContent()
      )}
    </View>
  );
};

export default BestSellerCard;
