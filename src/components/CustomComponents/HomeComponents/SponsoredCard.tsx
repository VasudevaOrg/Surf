import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { Spacing } from '../../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { Typography } from '../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../MainComponents/Typography/Typography.types';

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
interface SponsoredBrand {
  id: string;
  image: ImageSourcePropType | string;
  title: string;
  subTitle: string;
  onPress?: () => void;
}

interface SponsoredCardProps {
  brands: SponsoredBrand[];
  containerStyle?: ViewStyle;
  itemContainerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
}

const SponsoredCard: React.FC<SponsoredCardProps> = ({
  brands,
  containerStyle,
  itemContainerStyle,
  imageStyle,
}) => {
  const brandContainerStyle = useMemo(
    () => [styles.brandContainer, itemContainerStyle],
    [itemContainerStyle],
  );

  const brandImageStyle = useMemo(
    () => [styles.brandImage, imageStyle],
    [imageStyle],
  );

  const titleTextStyle = useMemo(
    () => ({
      color: ColorPalette.TEXT_GREY_500,
      // marginTop: getScreenHeight(0.5),
      paddingVertical: getScreenHeight(0.1),
    }),
    [],
  );

  const subTitleTextStyle = useMemo(
    () => ({
      color: ColorPalette.TEXT_GREY_100,
      paddingVertical: getScreenHeight(0.1),
    }),
    [],
  );

  const renderBrand = (brand: SponsoredBrand) => {
    const imageSource =
      typeof brand.image === 'string' ? { uri: toHttps(brand.image) } : brand.image;

    return (
      <TouchableOpacity
        key={brand.id}
        style={styles.itemWrapper}
        onPress={brand.onPress}
        activeOpacity={0.7}
      >
        <View style={brandContainerStyle}>
          <Image
            source={imageSource}
            style={brandImageStyle}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Typography
            text={brand.title}
            variant={TypographyVariant.LSMALL_SEMIBOLD}
            customTextStyles={titleTextStyle}
            numberOfLines={1}
          />
          <Typography
            text={brand.subTitle}
            variant={TypographyVariant.LXSMALL_MEDIUM}
            customTextStyles={subTitleTextStyle}
            numberOfLines={1}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.mainGrid, containerStyle]}>
      {brands?.map(renderBrand)}
    </View>
  );
};

const styles = StyleSheet.create({
  mainGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemWrapper: {
    width: '31%',
    // marginBottom: Spacing.XXSmall,
    gap: Spacing.XSmall,
    // marginTop: getScreenHeight(0.5),
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: Spacing.XXSmall,
  },
  brandContainer: {
    width: '100%',
    height: getScreenHeight(10),
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: Spacing.Medium,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: getScreenWidth(2),
  },
  brandImage: {
    width: '100%',
    height: '100%',
  },
});

export default React.memo(SponsoredCard);
