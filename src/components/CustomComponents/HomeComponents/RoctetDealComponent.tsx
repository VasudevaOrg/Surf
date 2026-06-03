import React from 'react';
import {
  ImageSourcePropType,
  View,
  Image,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import ColorPalette from '../../../config/ColorPalette';
import { Spacing } from '../../../config/globalStyles';
import { Typography } from '../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../..//MainComponents/Typography/Typography.types';
import InfoRightIcon from '../../..//assets/icons/InfoRightIcon';

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
interface RocketDealProp {
  imageSource: ImageSourcePropType | string;
  title: string;
  imageContainerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const RocketDealComponent: React.FC<RocketDealProp> = ({
  imageSource,
  title,
  imageContainerStyle,
  onPress,
}) => {
  const hotDealImage = React.useMemo(
    () => require('../../../assets/images/hotDeal.png'),
    [],
  );

  const renderedImage = React.useMemo(() => {
    if (typeof imageSource === 'string') {
      return <Image source={{ uri: toHttps(imageSource) }} style={styles.image} />;
    }
    return <Image source={imageSource} style={styles.image} />;
  }, [imageSource]);

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      activeOpacity={0.8}>
      <Image
        source={hotDealImage}
        style={styles.gotDealImage}
        fadeDuration={0}
        resizeMethod="resize"
      />
      <View style={styles.container}>
        <View style={[styles.imageContainer, imageContainerStyle]}>
          {renderedImage}
        </View>
        <View style={styles.textContainer}>
          <Typography
            text={title}
            variant={TypographyVariant.LSMALL_BOLD}
            customTextStyles={{ color: ColorPalette.WHITE }}
          />
          <InfoRightIcon style={undefined} size={12} onPress={undefined} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: getScreenWidth(30),
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.DEMAND_COLOR,
    paddingHorizontal: getScreenWidth(1.5),
    paddingVertical: getScreenHeight(0.7),
    borderRadius: Spacing.Medium,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: getScreenHeight(15.25),
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: Spacing.Small,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gotDealImage: {
    position: 'absolute',
    width: getScreenWidth(14.5),
    height: getScreenHeight(6.75),
    top: 0,
    left: 0,
    zIndex: 1,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1),
    paddingVertical: getScreenHeight(0.9),
    marginTop: getScreenHeight(0.4),
  },
});

export default React.memo(RocketDealComponent);
