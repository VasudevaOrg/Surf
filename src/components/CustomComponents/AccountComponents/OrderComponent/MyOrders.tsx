import React, { useState, useMemo } from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ColorValue,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyOrderProps } from './MyOrders.types';
import { styles } from './MyOrders.styles';
import { Typography } from '../../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import ChevronDoubleIcon from '../../../../assets/icons/ChevronDoubleIcon';
import StarIcon from '../../../../assets/icons/StarIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../MainComponents/Button';
import { Badge } from '../../../MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../MainComponents/Badges/Badge.types';
import { Spacing } from '../../../../config/globalStyles';
import { getScreenHeight } from '../../../../helpers/screenSize';

const STATUS_COLORS: Record<string, string | ColorValue> = {
  delivered: '#1FC16B',
  cancelled: '#FB3748',
  shipped: '#6C84FE',
  default: ColorPalette.TEXT_GREY_500,
};

const RATING_LABELS = ['Bad', 'Ok', 'Good', 'Great', 'Excellent'];

const MyOrders: React.FC<MyOrderProps> = ({
  orderId,
  productId,
  imageSource,
  title,
  shopName,
  status,
  date,
  rating = 0,
  price,
  discount,
  promoName,
  orderTotal,
}) => {
  const [selectedRating, setSelectedRating] = useState(rating);
  const navigation = useNavigation<any>();

  const statusColor = useMemo(() => {
    const statusKey = status.toLowerCase();
    return STATUS_COLORS[statusKey] || STATUS_COLORS.default;
  }, [status]);

  const renderImage = () => {
    const imgSource =
      typeof imageSource === 'string' && imageSource.length > 0
        ? { uri: imageSource }
        : (imageSource as ImageSourcePropType);

    // Fallback if imageSource was an empty string or null in an object
    const finalSource =
      imgSource && (imgSource as any).uri === ''
        ? require('../../../../assets/images/demo.png')
        : imgSource;

    return <Image source={finalSource} style={styles.image} />;
  };

  const handleRatingSelect = (index: number) => {
    setSelectedRating(index + 1);
  };

  const handlePress = () => {
    navigation.navigate('MyOrderDetails', { orderId, status });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}>
      <View style={styles.firstContainer}>
        <View style={styles.firstSubOne}>
          <Typography
            text={`Order ID: #${orderId}`}
            variant={TypographyVariant.PMEDIUM_MEDIUM}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
          <ChevronDoubleIcon
            size={16}
            color={ColorPalette.TEXT_GREY_400}
            style={undefined}
            onPress={undefined}
          />
        </View>
        <View style={styles.firstSubTwo}>
          <View style={styles.imageContainer}>{renderImage()}</View>
          <View style={styles.dataContainer}>
            <View style={styles.textContainer}>
              <Typography
                text={title}
                variant={TypographyVariant.PMEDIUM_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_100 as any }}
              />
              <Typography
                text={shopName as string}
                variant={TypographyVariant.LSMALL_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_100 as any }}
              />
              {price ? (
                <Typography
                  text={price}
                  variant={TypographyVariant.PMEDIUM_BOLD}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_500 as any,
                    marginTop: 4,
                  }}
                />
              ) : null}
              {discount && Number(discount) > 0 ? (
                <Typography
                  text={`Discount: -€${discount}${promoName ? ` (${promoName})` : ''
                    }`}
                  variant={TypographyVariant.PMEDIUM_MEDIUM}
                  customTextStyles={{
                    color: ColorPalette.GREEN_200 as any,
                    marginTop: 2,
                  }}
                />
              ) : null}
              {orderTotal ? (
                <Typography
                  text={`Order Total: €${orderTotal}`}
                  variant={TypographyVariant.PMEDIUM_BOLD}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_500 as any,
                    marginTop: 2,
                  }}
                />
              ) : null}
            </View>
            <View style={styles.deliveryStatus}>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.radioButton,
                    {
                      borderColor: statusColor,
                      backgroundColor: `${statusColor as string}20`,
                    },
                  ]}>
                  <View
                    style={[
                      styles.radioButtonInner,
                      { backgroundColor: statusColor as any },
                    ]}
                  />
                </View>
                <Typography
                  text={status}
                  variant={TypographyVariant.PMEDIUM_MEDIUM}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                />
              </View>
              <Typography
                text={date}
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.ratingBarContainer}>
        <View style={styles.ratingTextContainer}>
          <View style={styles.starIconWrapper}>
            <StarIcon
              size={24}
              color={ColorPalette.RATING_COLOR as string} // Yellow star
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
          onPress={() =>
            navigation.navigate('RateOrder', {
              imageSource,
              title,
              orderId,
              productId,
            })
          }
          size={ButtonSize.SMALL}
          variant={ButtonVariant.PRIMARY}
          type={ButtonType.PRIMARY} // Solid button
          state={ButtonState.DEFAULT}
          bgColor={ColorPalette.ROSE_PURPLE_300 as any} // Custom rose/pink color
        />
      </View>
    </TouchableOpacity>
  );
};

export default MyOrders;
