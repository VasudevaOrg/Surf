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

export interface PopularCardData {
  id: string;
  image: ImageSourcePropType | string;
  title: string;
  subTitle: string;
  onPress?: () => void;
}

interface PopularCardsProps {
  data: PopularCardData[];
  containerStyle?: ViewStyle;
  itemContainerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  titleStyle?: any;
  subTitleStyle?: any;
}

const PopularCards: React.FC<PopularCardsProps> = ({
  data,
  containerStyle,
  itemContainerStyle,
  imageStyle,
  titleStyle,
  subTitleStyle,
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
    () => [
      {
        color: ColorPalette.TEXT_GREY_500,
        marginTop: getScreenHeight(0.5),
      },
      titleStyle,
    ],
    [titleStyle],
  );

  const subTitleTextStyle = useMemo(
    () => [
      {
        color: ColorPalette.TEXT_GREY_100,
      },
      subTitleStyle,
    ],
    [subTitleStyle],
  );

  const renderCard = (item: PopularCardData) => {
    const imageSource =
      typeof item.image === 'string' ? { uri: item.image } : item.image;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.itemWrapper}
        onPress={item.onPress}
        activeOpacity={0.7}>
        <View style={brandContainerStyle}>
          <Image
            source={imageSource}
            style={brandImageStyle}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Typography
            text={item.title}
            variant={TypographyVariant.LSMALL_SEMIBOLD}
            customTextStyles={titleTextStyle}
            numberOfLines={1}
          />
          <Typography
            text={item.subTitle}
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
      {data?.map(renderCard)}
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
    width: '48%',
    // marginBottom: Spacing.Medium,
  },
  brandContainer: {
    width: '100%',
    height: getScreenHeight(20),
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
  textContainer: {
    marginTop: Spacing.XSmall,
    gap: 2,
  },
});

export default React.memo(PopularCards);
