import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import {Typography} from '../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';
import {headerStyles} from './Header.styles';
import {HeaderProps} from './Header.types';

export const Header: React.FC<HeaderProps> = ({
  images,
  image, // Keep for backward compatibility
  name,
  rightIcons,
  leftIcons,
  variant = TypographyVariant.LSMALL_BOLD,
  textColor = ColorPalette.TEXT_GREY_500,
  leftIcon,
  rightIcon,
  containerStyles,
}) => {
  const allImages = images || (image ? [image] : []);

  return (
    <View style={[headerStyles.container, containerStyles]}>
      <View style={headerStyles.leftSection}>
        {allImages.length > 0 && (
          <View style={headerStyles.imagesContainer}>
            {allImages.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={img.onPress}
                disabled={!img.onPress}>
                <Image
                  source={img.source || {uri: img.uri}}
                  style={[headerStyles.mainImage, img.style]}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {leftIcons && leftIcons.length > 0 && (
          <View style={headerStyles.leftIconsSection}>
            {leftIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={item.onPress}
                  style={headerStyles.iconButton}>
                  <Icon
                    size={item.size || 24}
                    color={item.color || (ColorPalette.GREY_TEXT_400 as string)}
                    strokeWidth={item.strokeWidth || 2}
                    filled={item.filled}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {leftIcon && (
          <View style={[headerStyles.leftIconContainer]}>{leftIcon}</View>
        )}

        <View
          style={[
            headerStyles.nameContainer,
            !allImages.length &&
              !leftIcons?.length &&
              !leftIcon && {marginLeft: 0},
          ]}>
          <Typography
            variant={variant}
            text={name}
            customTextStyles={{color: textColor}}
          />
        </View>
      </View>

      <View style={headerStyles.rightSection}>
        {rightIcons &&
          rightIcons.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                style={headerStyles.iconButton}>
                <Icon
                  size={item.size || 24}
                  color={item.color || (ColorPalette.GREY_TEXT_400 as string)}
                  strokeWidth={item.strokeWidth || 2}
                  filled={item.filled}
                />
              </TouchableOpacity>
            );
          })}
        {rightIcon && (
          <View style={headerStyles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
    </View>
  );
};
