import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import ChevronRightIcon from '../../../../assets/icons/ChevronRightIcon';
import ColorPalette from '../../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import { BorderRadius, Spacing } from '../../../../config/globalStyles';
import { Typography } from '../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../components/MainComponents/Typography/Typography.types';
import StarRating from '../../../../assets/icons/StarRating';
import HeartIcon from '../../../../assets/icons/HeartIcon';
import ShareIcon from '../../../../assets/icons/ShareIcon';

const { width } = Dimensions.get('window');

interface ImageSliderProps {
  images: ImageSourcePropType[];
  onImageChange?: (index: number) => void;
  onImagePress?: (index: number) => void;
  rating: number;
  isFavorite?: boolean;
  onAddToWishlist?: () => void;
  onShare?: () => void;
  loading?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  onImageChange,
  onImagePress,
  rating = 0,
  onAddToWishlist,
  onShare,
  isFavorite = false,
  loading = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [containerWidth, setContainerWidth] = useState(
    width - getScreenWidth(8),
  );

  const onLayout = (event: any) => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    setContainerWidth(layoutWidth);
  };

  const onMomentumScrollEnd = useCallback(
    (event: any) => {
      const scrollOffset = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollOffset / containerWidth);
      if (index !== activeIndex && index >= 0 && index < images.length) {
        setActiveIndex(index);
        onImageChange?.(index);
      }
    },
    [containerWidth, activeIndex, images.length, onImageChange],
  );

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < images.length) {
      flatListRef.current?.scrollToIndex({
        index: index,
        animated: true,
      });
      setActiveIndex(index);
      onImageChange?.(index);
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageSourcePropType;
    index: number;
  }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onImagePress?.(index)}
      style={[styles.imageContainer, { width: containerWidth }]}>
      <View style={styles.cementBox}>
        <Image source={item} style={styles.image} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.outerContainer}>
      {/* White Card Container */}
      <View style={styles.whiteCard} onLayout={onLayout}>
        {/* Navigation Arrows Overlay */}
        {/* <TouchableOpacity
          style={[styles.arrowButton, styles.leftArrow]}
          onPress={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}>
          <View
            style={[styles.arrowCircle, activeIndex === 0 && {opacity: 0.3}]}>
            <View style={{transform: [{rotate: '180deg'}]}}>
              <ChevronRightIcon
                size={12}
                color={ColorPalette.WHITE}
                style={undefined}
              />
            </View>
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={[styles.arrowButton, styles.rightArrow]}
          onPress={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === images.length - 1}>
          <View
            style={[
              styles.arrowCircle,
              activeIndex === images.length - 1 && {opacity: 0.3},
            ]}>
            <ChevronRightIcon
              size={12}
              color={ColorPalette.WHITE}
              style={undefined}
            />
          </View>
        </TouchableOpacity> */}

        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={containerWidth}
          snapToAlignment="start"
          decelerationRate="fast"
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          keyExtractor={(_, index) => index.toString()}
          getItemLayout={(_, index) => ({
            length: containerWidth,
            offset: containerWidth * index,
            index,
          })}
          initialScrollIndex={0}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />
        {(rating && rating > 0) ? (
          <View style={styles.ratingContainer}>
            <Typography
              text={rating.toString()}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />
            <StarRating
              style={undefined}
              size={18}
              color={ColorPalette.RATING_COLOR_ICON as string}
            />
          </View>
        ) : null}
        <View style={styles.actionsContainer}>
          <View accessibilityLabel="Add to wishlist" style={styles.mainLabel}>
            <TouchableOpacity onPress={onAddToWishlist} disabled={loading}>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={ColorPalette.ROSE_PURPLE_400}
                />
              ) : (
                <HeartIcon
                  size={20}
                  style={undefined}
                  filled={isFavorite}
                  color={
                    (isFavorite
                      ? ColorPalette.RED_100
                      : ColorPalette.TEXT_GREY_400) as any
                  }
                />
              )}
            </TouchableOpacity>
          </View>
          {/* <View accessibilityLabel="Share product" style={styles.mainLabel}>
            <TouchableOpacity onPress={onShare}>
              <ShareIcon size={20} style={undefined} />
            </TouchableOpacity>
          </View> */}
        </View>
        {/* Indicators Inside White Card */}
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeIndex === index
                  ? styles.activeIndicator
                  : styles.inactiveIndicator,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    // marginVertical: getScreenHeight(1),
  },
  whiteCard: {
    height: getScreenHeight(45),
    backgroundColor: ColorPalette.WHITE,
    position: 'relative',
    borderRadius: Spacing.Medium,
    overflow: 'hidden',
    paddingTop: getScreenHeight(1.5), // Space above the cement box
    paddingBottom: getScreenHeight(2),
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getScreenWidth(12),
  },
  cementBox: {
    width: '90%',
    height: '95%',
    // backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: Spacing.Medium,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '85%',
    height: '85%',
  },
  arrowButton: {
    position: 'absolute',
    top: '42%', // Balanced relative to the now padded white card
    zIndex: 10,
    padding: 6,
  },
  leftArrow: {
    left: 8,
  },
  rightArrow: {
    right: 8,
  },
  // arrowCircle: {
  //   width: 28,
  //   height: 28,
  //   borderRadius: 14,
  //   backgroundColor: ColorPalette.TEXT_GREY_500,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getScreenHeight(1), // Added margin above indicators
    gap: getScreenWidth(1.8),
  },
  indicator: {
    height: getScreenHeight(0.6),
    borderRadius: BorderRadius.XXSmall,
  },
  activeIndicator: {
    width: getScreenWidth(8),
    backgroundColor: ColorPalette.PURPLE_200,
  },
  inactiveIndicator: {
    width: getScreenWidth(3.5),
    backgroundColor: ColorPalette.BACKGROUND_GREY_200,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1),
    paddingHorizontal: getScreenWidth(2.8),
    paddingVertical: getScreenHeight(0.6),
    backgroundColor: ColorPalette.BACKGROUND_GREY_40,
    // shadowColor: ColorPalette.BLACK,
    // shadowOffset: {
    //   width: 0,
    //   height: -8,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 40,
    // elevation: 9,
    borderRadius: Spacing.XXSmall,
  },
  actionsContainer: {
    position: 'absolute',
    top: 20,
    right: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(4),
  },
  mainLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: getScreenHeight(0.5),
    backgroundColor: ColorPalette.BACKGROUND_GREY_40,
    borderRadius: BorderRadius.Large,
    padding: 7
  },
});

export default ImageSlider;
