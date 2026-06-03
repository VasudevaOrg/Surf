import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { getScreenWidth, getScreenHeight } from '../../../helpers/screenSize';
import ColorPalette from '../../../config/ColorPalette';
import { Spacing } from '../../../config/globalStyles';
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
interface PromoCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const PromoCard: React.FC<PromoCardProps> = ({
  title,
  description,
  imageUrl,
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: toHttps(imageUrl) }} style={styles.image} />
        ) : (
          <Image
            source={require('../../../assets/images/demo1.png')}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <Typography
          text={title}
          variant={TypographyVariant.LSMALL_BOLD}
          numberOfLines={1}
          customTextStyles={styles.title}
        />
        {description ? (
          <Typography
            text={description}
            variant={TypographyVariant.LSMALL_REGULAR}
            numberOfLines={2}
            customTextStyles={styles.description}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getScreenWidth(40),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Medium,
    marginRight: getScreenWidth(3),
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: getScreenWidth(40), // Square
    backgroundColor: ColorPalette.WelcomeBack,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: Spacing.Small,
  },
  title: {
    color: ColorPalette.TEXT_GREY_500,
    marginBottom: 4,
  },
  description: {
    color: ColorPalette.TEXT_GREY_200,
    fontSize: 12,
  },
});

export default React.memo(PromoCard);
