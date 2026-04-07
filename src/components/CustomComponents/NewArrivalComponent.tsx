import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ColorPalette from '../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../helpers/screenSize';
import {Spacing} from '../../config/globalStyles';
import {Typography} from '../MainComponents/Typography/Typography';
import {TypographyVariant} from '../MainComponents/Typography/Typography.types';
import NewTag from '../../assets/icons/NewTag';

interface NewArrivalComponentProps {
  imageSource: any;
  customStyles?: StyleProp<ViewStyle>;
  borderColors?: string[];
  backgroundColors?: string[];
  title: string;
  showNewTag?: boolean;
  tagBackgroundColor?: string;
}

const NewArrivalComponent: React.FC<NewArrivalComponentProps> = ({
  imageSource,
  customStyles,
  borderColors = ['#13072C', '#9E7BEA'],
  backgroundColors = ['#E1DEED', '#FFFFFF'],
  title,
  showNewTag = true,
  tagBackgroundColor = '#770D55',
}) => {
  const featuredImage = () =>
    typeof imageSource === 'string' ? (
      <Image source={{uri: imageSource}} style={styles.image} />
    ) : (
      <Image source={imageSource} style={styles.image} />
    );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={borderColors}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.gradientContainer, customStyles]}>
        <View style={styles.innerContainer}>
          <LinearGradient
            colors={backgroundColors}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.imageContainer}>
            {featuredImage()}
          </LinearGradient>

          {/* Featured text at the bottom */}
          <View style={styles.featuredTextWrapper}>
            <View style={styles.textContainer}>
              <Typography
                text={title}
                variant={TypographyVariant.LSMALL_SEMIBOLD}
                customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
              />
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* New Tag positioned absolutely at top-left */}
      {showNewTag && (
        <View style={styles.newTagContainer}>
          <NewTag backgroundColor={tagBackgroundColor} width={58} height={30} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 12, // Just enough margin to show the tag
  },
  gradientContainer: {
    padding: 3,
    borderRadius: Spacing.Small,
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
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: getScreenHeight(15),
    borderRadius: Spacing.Small - 2,
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
    borderTopEndRadius: Spacing.XSmall,
    borderTopStartRadius: Spacing.XSmall,
  },
  newTagContainer: {
    position: 'absolute',
    top: -15,
    left: 0,
    zIndex: 20,
  },
});

export default NewArrivalComponent;
