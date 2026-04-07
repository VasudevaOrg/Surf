import React, { useMemo, ReactNode } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import { Typography } from '../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import { Spacing } from '../../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';

interface CardTypeProp {
  title: string;
  miniTitle?: string;
  icon?: ReactNode;
  showIcon?: boolean;
  onViewAllPress?: () => void;
  showRightSection?: boolean;
  alternativeIcon?: ReactNode;
  alternativeImage?: ImageSourcePropType | string; // New prop for image
  alternativeImageStyle?: ImageStyle; // Optional style for the image
  titleVariant?: TypographyVariant;
  containerStyle?: ViewStyle;
}

const CardHeader: React.FC<CardTypeProp> = ({
  title,
  miniTitle = '',
  icon,
  showIcon = false,
  onViewAllPress,
  showRightSection = true,
  alternativeIcon,
  alternativeImage,
  alternativeImageStyle,
  titleVariant = TypographyVariant.H6_MEDIUM,
  containerStyle,
}) => {
  const titleTextStyle = useMemo(
    () => ({
      color: ColorPalette.TEXT_GREY_500,
    }),
    [],
  );
  const minititleTextStyle = useMemo(
    () => ({
      color: ColorPalette.TEXT_GREY_100,
      // marginTop: getScreenHeight(0.3),
      paddingVertical: getScreenHeight(0.1),
    }),
    [],
  );

  const viewAllTextStyle = useMemo(
    () => ({
      color: ColorPalette.TEXT_GREY_100,
    }),
    [],
  );

  // Function to render the appropriate alternativeContent
  const renderAlternativeContent = () => {
    if (alternativeIcon) {
      return <View>{alternativeIcon}</View>;
    }

    if (alternativeImage) {
      // Handle both string URLs and imported image sources
      const imageSource =
        typeof alternativeImage === 'string'
          ? { uri: alternativeImage }
          : alternativeImage;

      return (
        <Image
          source={imageSource}
          style={[styles.alternativeImage, alternativeImageStyle]}
          resizeMode="contain"
        />
      );
    }

    return null;
  };

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <View style={styles.titleContainer}>
        <View>
          <Typography
            text={title}
            variant={titleVariant}
            customTextStyles={titleTextStyle}
          />
          {miniTitle ? (
            <Typography
              text={miniTitle}
              variant={TypographyVariant.LSMALL_MEDIUM}
              customTextStyles={minititleTextStyle}
            />
          ) : null}
        </View>
        {showIcon && icon && (
          <View style={styles.titleIconContainer}>{icon}</View>
        )}
      </View>
      <View style={styles.secondContainer}>
        {onViewAllPress && (
          <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
            <Typography
              text="View all"
              variant={TypographyVariant.PSMALL_MEDIUM}
              customTextStyles={viewAllTextStyle}
            />
          </TouchableOpacity>
        )}
        {showRightSection ? (
          <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
            <ArrowRightIcon
              size={20}
              color={ColorPalette.PRIMARY_WHITE}
              style={undefined}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onViewAllPress}
            disabled={!onViewAllPress}
            activeOpacity={0.7}>
            {renderAlternativeContent()}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1),
  },
  titleIconContainer: {
    // Placeholder for title icon container
  },
  secondContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getScreenWidth(1),
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
    borderRadius: Spacing.XXXXLarge,
    padding: getScreenHeight(0.1),
  },
  alternativeImage: {
    width: getScreenWidth(7),
    height: getScreenWidth(8),
    borderRadius: Spacing.XXSmall,
  },
});

export default React.memo(CardHeader);
