import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Typography } from '../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../config/ColorPalette';
import { globalStyles, Spacing } from '../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../helpers/screenSize';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
} from '../MainComponents/Button';

interface EmptyComponentProps {
  imageSource: ImageSourcePropType;
  title: string;
  subTitle: string;
  customContainerStyle?: object;
  customImageStyle?: object;
  customTextStyle?: object;
  variant?: TypographyVariant;
  subVariant?: TypographyVariant;
  buttonName?: string;
  iconComponent?: React.ComponentType<any>;
  iconSize?: number;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  onPress?: () => void;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({
  imageSource,
  title,
  subTitle,
  customContainerStyle,
  customImageStyle,
  customTextStyle,
  variant = TypographyVariant.H6_BOLD,
  subVariant = TypographyVariant.PSMALL_REGULAR,
  buttonName = 'View Products',
  iconComponent,
  iconSize,
  iconColor,
  iconPosition,
  onPress,
}) => {
  return (
    <View
      style={[
        globalStyles.secondaryContainer,
        styles.container,
        customContainerStyle,
      ]}>
      <Image
        source={imageSource}
        style={[styles.successImage, customImageStyle]}
        resizeMode="cover"
      />
      <View style={styles.textmainContainer}>
        <View style={styles.textContainer}>
          <Typography
            variant={variant}
            text={title}
            customTextStyles={[styles.title, customTextStyle]}
          />
          <Typography
            variant={subVariant}
            text={subTitle}
            customTextStyles={[styles.subTitle, customTextStyle]}
          />
        </View>
        <Button
          text={buttonName}
          state={ButtonState.DEFAULT}
          size={ButtonSize.SMALL}
          type={ButtonType.PRIMARY}
          bgColor={ColorPalette.ROSE_PURPLE_300}
          customStyles={{
            borderRadius: Spacing.Small, width: getScreenWidth(49)
            , height: getScreenHeight(6)
          }}
          withShadow
          iconPosition={iconPosition}
          IconComponent={iconComponent}
          iconSize={iconSize}
          iconColor={iconColor}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: ColorPalette.WHITE,
    // gap: getScreenWidth(10),
    marginTop: getScreenHeight(5),

  },
  successImage: {
    height: getScreenHeight(15),
    width: getScreenWidth(34),
  },
  textmainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenHeight(3),
    width: getScreenWidth(70.25),
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: getScreenHeight(0.5),
  },
  title: {
    textAlign: 'center',
    lineHeight: getScreenHeight(3),
  },
  subTitle: {
    width: getScreenWidth(75),
    textAlign: 'center',
    lineHeight: getScreenHeight(3),

  },
});

export default EmptyComponent;
