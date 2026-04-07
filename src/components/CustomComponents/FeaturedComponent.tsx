import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ColorPalette from '../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../helpers/screenSize';
import {Spacing} from '../../config/globalStyles';
import {Typography} from '../MainComponents/Typography/Typography';
import {TypographyVariant} from '../MainComponents/Typography/Typography.types';

interface FeaturedComponentProps {
  imageSource: any;
  customStyles?: StyleProp<ViewStyle>;
  borderColors?: string[];
  backgroundColors?: string[];
}

const FeaturedComponent: React.FC<FeaturedComponentProps> = ({
  imageSource,
  customStyles,
  borderColors = ['#13072C', '#9E7BEA'],
  backgroundColors = ['#E1DEED', '#FFFFFF'],
}) => {
  const featuredImage = () =>
    typeof imageSource === 'string' ? (
      <Image source={{uri: imageSource}} style={styles.image} />
    ) : (
      <Image source={imageSource} style={styles.image} />
    );

  return (
    <LinearGradient
      colors={borderColors}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={[styles.gradientContainer, customStyles]}>
      <View style={styles.innerContainer}>
        <View style={styles.featuredTextWrapper}>
          <View style={styles.textContainer}>
            <Typography
              text="Featured"
              variant={TypographyVariant.LSMALL_SEMIBOLD}
              customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
            />
          </View>
        </View>
        <LinearGradient
          colors={backgroundColors}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.imageContainer}>
          {featuredImage()}
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    padding: 3,
    borderRadius: Spacing.Small + 2,
    width: getScreenWidth(28),
  },
  innerContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small - 2,
    overflow: 'hidden',
  },
  featuredTextWrapper: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: getScreenHeight(15),
    borderRadius: Spacing.Small - 3,
    borderWidth: 4,
    borderColor: ColorPalette.WHITE,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: Spacing.Small,
  },
  textContainer: {
    backgroundColor: ColorPalette.WHITE,
    paddingHorizontal: getScreenWidth(2),
    paddingVertical: getScreenHeight(0.5),
    borderBottomEndRadius: Spacing.XSmall,
    borderBottomStartRadius: Spacing.XSmall,
  },
});

export default FeaturedComponent;
