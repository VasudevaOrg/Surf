import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './ProductPriceInfo.styles';
import HeartIcon from '../../../../assets/icons/HeartIcon';
import ShareIcon from '../../../../assets/icons/ShareIcon';
import {formatCurrency} from '../../../../config/regex';
import {ProductInfoProps} from './ProductPriceInfo.types';
import {Badge} from '../../../../components/MainComponents/Badges/Badge';
import StarRating from '../../../../assets/icons/StarRating';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import {
  BadgeType,
  BadgeVariant,
} from '../../../../components/MainComponents/Badges/Badge.types';
import {TypographyVariant} from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import {Typography} from '../../../../components/MainComponents/Typography/Typography';
import CarIcon from '../../../../assets/icons/CarIcon';

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  price,
  strikeThrough = 0, // Default to 0
  rating,
  ratingNumber,
  reviewNumber,
  deliveryTime,
  deliveryPrice,
  onAddToWishlist,
  onShare,
  currency = '€',
  minDeliveryPrice,
  maxDeliveryPrice,
  isFavorite = false,
  stock,
}) => {
  const discount =
    strikeThrough > 0 ? Math.round((1 - price / strikeThrough) * 100) : 0;

  const deliveryPriceText =
    minDeliveryPrice && maxDeliveryPrice
      ? `Delivery: ${formatCurrency(
          minDeliveryPrice,
          currency,
        )}–${formatCurrency(maxDeliveryPrice, currency)}`
      : `Delivery: ${formatCurrency(deliveryPrice || 0, currency)}`;

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.textIconContainer}>
          <Typography
            text={title}
            variant={TypographyVariant.H6_SEMIBOLD}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_500,
              flexShrink: 1,
              flexWrap: 'wrap',
              width: getScreenWidth(56),
            }}
            numberOfLines={2}
          />
          {/* <View style={styles.actionsContainer}>
            <View accessibilityLabel="Add to wishlist" style={styles.mainLabel}>
              <TouchableOpacity onPress={onAddToWishlist}>
                <HeartIcon
                  size={24}
                  style={undefined}
                  filled={isFavorite}
                  color={
                    (isFavorite
                      ? ColorPalette.RED_100
                      : ColorPalette.TEXT_GREY_400) as any
                  }
                />
              </TouchableOpacity>
              <Typography
                text="Wishlist"
                variant={TypographyVariant.LSMALL_MEDIUM}
                customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
              />
            </View>

            <View accessibilityLabel="Share product" style={styles.mainLabel}>
              <TouchableOpacity onPress={onShare}>
                <ShareIcon size={24} style={undefined} />
              </TouchableOpacity>

              <Typography
                text="Share"
                variant={TypographyVariant.LSMALL_MEDIUM}
                customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
              />
            </View>
          </View> */}
        </View>

        <View style={styles.priceContainer}>
          {strikeThrough > 0 && (
            <Typography
              text={`${currency}${strikeThrough.toFixed(2)}`}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_100,
                textDecorationLine: 'line-through',
              }}
            />
          )}
          <Typography
            text={formatCurrency(price, currency)}
            variant={TypographyVariant.H4_SEMIBOLD}
            customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
          />
          {stock !== undefined && stock <= 0 && (
            <Badge
              text="SOLD OUT"
              variant={BadgeVariant.FILLED}
              type={BadgeType.DANGER}
              customContainerStyle={{
                backgroundColor: ColorPalette.RED_100,
                marginLeft: getScreenWidth(2),
              }}
            />
          )}
        </View>
      </View>

      {/* <View style={styles.ratingContainer}>
        <Badge
          text={rating.toFixed(1)}
          rightIcon={StarRating as any}
          type={BadgeType.PRIMARY}
          variant={BadgeVariant.FILLED}
          textVariant={TypographyVariant.LSMALL_MEDIUM}
          customContainerStyle={{
            backgroundColor: ColorPalette.GREEN_200,
            paddingVertical: getScreenHeight(0.5),
            paddingHorizontal: getScreenWidth(1.5),
          }}
        />
        <View style={styles.reviewText}>
          <Typography
            text={`${ratingNumber.toLocaleString()} Ratings,`}
            variant={TypographyVariant.LSMALL_MEDIUM}
            customTextStyles={{color: ColorPalette.TEXT_GREY_100}}
          />
          <Typography
            text={`${reviewNumber.toLocaleString()} Reviews`}
            variant={TypographyVariant.LSMALL_MEDIUM}
            customTextStyles={{color: ColorPalette.TEXT_GREY_100}}
          />
        </View>
      </View> */}

      {/* <View style={styles.deliveryContainer}>
        <Badge
          text={`Delivery in ${deliveryTime} ${
            deliveryTime === 1 ? 'hour' : 'hours'
          }`}
          type={BadgeType.PRIMARY}
          variant={BadgeVariant.FILLED}
          textVariant={TypographyVariant.LSMALL_MEDIUM}
          customContainerStyle={{
            backgroundColor: ColorPalette.WelcomeBack,
            paddingHorizontal: getScreenWidth(1.5),
            paddingVertical: getScreenHeight(0.5),
          }}
          customTextColor={ColorPalette.TEXT_GREY_400}
        />
        <View style={styles.carContainer}>
          <CarIcon style={undefined} color={ColorPalette.ROSE_PURPLE_200} />
          <Typography
            text={deliveryPriceText}
            variant={TypographyVariant.LXSMALL_REGULAR}
            customTextStyles={{color: ColorPalette.TEXT_GREY_300}}
          />
        </View>
      </View> */}
    </View>
  );
};

export default ProductInfo;
