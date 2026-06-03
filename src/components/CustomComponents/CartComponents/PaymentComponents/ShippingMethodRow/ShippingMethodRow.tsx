import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../../../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../config/ColorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import CheckIcon from '../../../../../assets/icons/CheckIcon';
import { BorderRadius } from '../../../../../config/globalStyles';
import { Image } from 'react-native';

interface ShippingMethodRowProps {
  isSelected: boolean;
  onPress: () => void;
  name: string;
  deliveryTime?: string;
  rate: string | number;
  imageUrl?: string;
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

const ShippingMethodRow: React.FC<ShippingMethodRowProps> = ({
  isSelected,
  onPress,
  name,
  deliveryTime,
  rate,
  imageUrl,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.leftSection}>
        {imageUrl ? (
          <Image
            source={{ uri: toHttps(imageUrl) }}
            style={[styles.shippingImage]}
          />
        ) : name === 'Loginext' ? (
          <Image
            source={require('../../../../../assets/images/maltapost.png')}
            style={[styles.shippingImage]}
          />
        ) : (
          <Image
            source={require('../../../../../assets/images/AppLogo.png')}
            style={[styles.shippingImage]}
          />
        )}

        <View style={styles.textContainer}>
          <Typography
            text={name}
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_500,
              paddingVertical: getScreenHeight(0.1),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: getScreenWidth(2),
            }}>
            {deliveryTime && (
              <>
                <Typography
                  text={deliveryTime}
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_100,
                  }}
                />
                <Typography
                  text="-"
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_100,
                  }}
                />
              </>
            )}

            <Typography
              text={typeof rate === 'number' ? `€${rate.toFixed(2)}` : rate}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_400,
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.radioButton}>
        {isSelected && (
          <View style={styles.radioButtonInner}>
            <CheckIcon size={16} checkColor={ColorPalette.WHITE as string} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    borderRadius: BorderRadius.Small,
    backgroundColor: ColorPalette.WHITE,
    borderWidth: 1.5,
    borderColor: ColorPalette.WelcomeBack,
    marginBottom: getScreenHeight(1),
  },
  selectedContainer: {
    borderColor: ColorPalette.ROSE_PURPLE_300,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: getScreenWidth(3),
  },
  radioButton: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    borderRadius: BorderRadius.Large,
    borderWidth: 1.5,
    borderColor: ColorPalette.TEXT_GREY_50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getScreenWidth(3),
  },
  radioButtonInner: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    borderRadius: BorderRadius.Large,
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: getScreenHeight(0.2),
  },
  shippingImage: {
    width: getScreenWidth(12.6),
    height: getScreenHeight(6),
    resizeMode: 'contain',
    borderRadius: BorderRadius.Full,
  },
});

export default ShippingMethodRow;
