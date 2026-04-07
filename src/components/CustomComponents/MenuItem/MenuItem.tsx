import React from 'react';
import { TouchableOpacity, View, Image, StyleProp, ViewStyle } from 'react-native';
import { Typography } from '../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../MainComponents/Typography/Typography.types';
import { styles } from './MenuItem.styles';
import { MenuItemProps } from './MenuItem.types';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';

export const MenuItem = ({
  label,
  onPress,
  leftIcon,
  image,
  rightIcon = <ArrowRightIcon style={undefined} />,
  testID,
  disabled = false,
  variant = TypographyVariant.LMEDIUM_SEMIBOLD,
  containerStyle,
  contentStyle,
  textStyle,
  leftIconContainerStyle,
  rightIconContainerStyle,
  subtitle,
  leftIconBackgroundColor,
  showBottomBorder = false,
  isLastItem = false,
  numberOfLines = 1,
}: MenuItemProps) => {
  const leftIconStyles: StyleProp<ViewStyle> = [
    styles.leftIconContainer,
    leftIconContainerStyle,
    leftIconBackgroundColor ? { backgroundColor: leftIconBackgroundColor } : null,
  ];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        showBottomBorder && !isLastItem && styles.bottomBorder,
        containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      testID={testID}>
      <View style={[styles.content, contentStyle]}>
        {image ? (
          <View style={leftIconStyles}>
            <View style={styles.imageContainer}>
              <Image source={image} style={styles.profileImage} />
            </View>
          </View>
        ) : leftIcon ? (
          <View style={leftIconStyles}>{leftIcon}</View>
        ) : null}
        <View style={{ gap: 2, flex: 1 }}>
          <Typography
            variant={variant}
            text={label}
            customTextStyles={[styles.labelText, textStyle]}
            numberOfLines={numberOfLines}
          />
          {subtitle && (
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text={subtitle}
              customTextStyles={styles.subtitleText}
              numberOfLines={numberOfLines}
            />
          )}
        </View>
      </View>
      {rightIcon && (
        <View style={[styles.rightIconContainer, rightIconContainerStyle]}>
          {rightIcon}
        </View>
      )}
    </TouchableOpacity>
  );
};
