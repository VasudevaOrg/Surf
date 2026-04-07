import React from 'react';
import {
  TouchableOpacity,
  View,
  Platform,
  Image,
  ImageSourcePropType,
  ActivityIndicator,
} from 'react-native';
import StarRating from '../../../../../assets/icons/StarRating';
import CloseIcon from '../../../../../assets/icons/CloseIcon';
import CameraIcon from '../../../../../assets/icons/CameraIcon';
import LinearGradient from 'react-native-linear-gradient';
import ColorPalette from '../../../config/ColorPalette';
import {Typography} from '../Typography/Typography';
import {
  createButtonStyles,
  getBackgroundColor,
  getButtonHeight,
  getTextColor,
  getTypographyVariant,
} from './Button.styles';
import {
  ButtonProps,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  size = ButtonSize.MEDIUM,
  variant = ButtonVariant.PRIMARY,
  type = ButtonType.PRIMARY,
  state = ButtonState.DEFAULT,
  disabled = false,
  IconComponent, // Legacy prop
  leftIcon,
  rightIcon,
  leftImages,
  rightImages,
  iconPosition = 'left', // Legacy prop
  useGradient = false,
  customStyles,
  customTextStyles,
  bgColor,
  withShadow = false,
  iconSize,
  iconColor,
  imageContainerStyle,
  imageOverlapOffset = -10, // New prop to control the overlap amount
  loading = false,
}) => {
  const buttonHeight = getButtonHeight(size);
  const currentState = disabled || loading ? ButtonState.DISABLED : state;
  const styles = createButtonStyles(buttonHeight);
  const backgroundColor = getBackgroundColor(variant, type, currentState);

  const useCustomBgColor =
    bgColor && type === ButtonType.PRIMARY && !disabled && !loading;

  const shadowStyle =
    withShadow && type !== ButtonType.OUTLINED
      ? Platform.select({
          ios: {
            shadowColor: 'rgba(16, 24, 40, 0.08)',
            shadowOffset: {width: 0, height: 6},
            shadowOpacity: 1,
            shadowRadius: buttonHeight / 5,
          },
          android: {
            elevation: 10,
          } as any,
        })
      : {};

  const customBorderRadius = (customStyles as any)?.borderRadius;

  const containerStyle = [
    styles.container,
    {
      backgroundColor: useCustomBgColor
        ? (bgColor as any)
        : typeof backgroundColor === 'object'
        ? 'transparent'
        : backgroundColor,
      opacity: currentState === ButtonState.DISABLED ? 0.5 : 1,
    },
    type === ButtonType.OUTLINED && {
      borderColor:
        variant === ButtonVariant.PRIMARY
          ? ColorPalette.PURPLE_200
          : ColorPalette.ROSE_PURPLE_300,
    },
    withShadow && shadowStyle,
    customStyles,
  ];

  const renderLeftContent = () => {
    // Handle legacy IconComponent with left position
    if (IconComponent && iconPosition === 'left') {
      return (
        <View style={styles.icon}>
          <IconComponent size={iconSize} color={iconColor} />
        </View>
      );
    }

    // Handle left icon component
    if (leftIcon) {
      const LeftIconComponent = leftIcon; // Create local component variable with capital letter
      return (
        <View style={styles.icon}>
          <LeftIconComponent size={iconSize} color={iconColor} />
        </View>
      );
    }

    // Handle multiple left images with overlapping effect
    if (leftImages && leftImages.length > 0) {
      return (
        <View style={[styles.imagesGroup, {marginRight: 8}]}>
          {leftImages.map((imageItem, index) => (
            <View
              key={`left-image-container-${index}`}
              style={
                [
                  styles.imageContainer,
                  imageItem.containerStyle,
                  imageContainerStyle,
                  // Create overlapping effect by positioning each image
                  // relative to its index (except for the first image)
                  index > 0 && {
                    marginLeft: imageOverlapOffset, // Negative margin creates overlap
                    zIndex: leftImages.length - index, // Higher z-index for earlier images
                  },
                ] as any
              }>
              <Image
                key={`left-image-${index}`}
                source={imageItem.source}
                style={[styles.image, imageItem.style as any]}
                resizeMode={imageItem.resizeMode || 'contain'}
              />
            </View>
          ))}
        </View>
      );
    }

    return null;
  };

  const renderRightContent = () => {
    // Handle legacy IconComponent with right position
    if (IconComponent && iconPosition === 'right') {
      return (
        <View style={styles.iconRight}>
          <IconComponent size={iconSize} color={iconColor} />
        </View>
      );
    }

    // Handle right icon component
    if (rightIcon) {
      const RightIconComponent = rightIcon; // Create local component variable with capital letter
      return (
        <View style={styles.iconRight}>
          <RightIconComponent size={iconSize} color={iconColor} />
        </View>
      );
    }

    // Handle multiple right images with individual containers
    if (rightImages && rightImages.length > 0) {
      return (
        <View style={styles.imagesGroup}>
          {rightImages.map((imageItem, index) => (
            <View
              key={`right-image-container-${index}`}
              style={
                [
                  styles.imageContainer,
                  imageItem.containerStyle,
                  imageContainerStyle,
                  // Can also add overlapping effect for right images if needed
                  index > 0 && {
                    marginLeft: imageOverlapOffset,
                    zIndex: rightImages.length - index,
                  },
                ] as any
              }>
              <Image
                key={`right-image-${index}`}
                source={imageItem.source}
                style={[styles.image, imageItem.style as any]}
                resizeMode={imageItem.resizeMode || 'contain'}
              />
            </View>
          ))}
        </View>
      );
    }

    return null;
  };

  const renderContent = () => (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator
          color={getTextColor(variant, type, currentState) as string}
          size="small"
        />
      ) : (
        <>
          {renderLeftContent()}
          <Typography
            variant={getTypographyVariant(size)}
            text={text}
            customTextStyles={[
              {color: getTextColor(variant, type, currentState) as string},
              customTextStyles as any,
            ]}
          />
          {renderRightContent()}
        </>
      )}
    </View>
  );

  const shouldUseGradient =
    (useGradient ||
      (typeof backgroundColor === 'object' &&
        (backgroundColor as any).isGradient)) &&
    type === ButtonType.PRIMARY &&
    !disabled &&
    !loading &&
    !useCustomBgColor;

  if (shouldUseGradient) {
    const gradientConfig =
      typeof backgroundColor === 'object' && backgroundColor !== null
        ? (backgroundColor as any)
        : ({
            colors:
              variant === ButtonVariant.PRIMARY
                ? ColorPalette.SELLER_PRIMARY_GRADIENT.colors
                : [ColorPalette.ROSE_PURPLE_300, ColorPalette.ROSE_PURPLE_400],
            start: (ColorPalette.SELLER_PRIMARY_GRADIENT as any).start,
            end: (ColorPalette.SELLER_PRIMARY_GRADIENT as any).end,
          } as any);

    const gradientBorderRadius =
      customBorderRadius !== undefined
        ? (customBorderRadius as any)
        : buttonHeight / 5;

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={containerStyle}>
        <LinearGradient
          colors={gradientConfig.colors}
          start={gradientConfig.start}
          end={gradientConfig.end}
          style={[styles.gradient, {borderRadius: gradientBorderRadius}]}
        />
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyle}>
      {renderContent()}
    </TouchableOpacity>
  );
};
