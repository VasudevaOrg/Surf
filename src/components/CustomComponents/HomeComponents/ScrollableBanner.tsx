import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ImageSourcePropType,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  ImageLoadEventData,
  Animated,
} from 'react-native';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import ColorPalette from '../../../config/ColorPalette';

interface BannerImage {
  id: string;
  source?: ImageSourcePropType;
  imageUrl?: string;
  onPress?: () => void;
}

interface BannerProps {
  images: BannerImage[];
  autoScrollInterval?: number;
  showIndicators?: boolean;
  customStyles?: {
    container?: object;
    banner?: object;
    indicatorContainer?: object;
    indicator?: object;
    activeIndicator?: object;
  };
}

const ScrollableBanner: React.FC<BannerProps> = ({
  images,
  autoScrollInterval = 3000,
  showIndicators = true,
  customStyles = {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const defaultHeight = useMemo(() => getScreenHeight(11.25), []);
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: autoScrollInterval,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        const nextIndex = (currentIndex + 1) % images.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * containerWidth,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }
    });

    return () => progress.stopAnimation();
  }, [currentIndex, containerWidth, images.length]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width);
  }, []);

  // Track the previous images to compare logically
  const prevImagesRef = useRef<BannerImage[]>([]);

  useEffect(() => {
    // Check if images are logically different by comparing IDs
    const currentIds = images.map(img => img.id).join(',');
    const prevIds = prevImagesRef.current.map(img => img.id).join(',');

    if (currentIds !== prevIds) {
      setImageHeights(Array(images.length).fill(defaultHeight));
      setIsImagesLoaded(false);
      prevImagesRef.current = images;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images, defaultHeight]);

  const scrollToNextImage = useCallback(() => {
    if (images.length > 1 && containerWidth > 0) {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * containerWidth,
        animated: true,
      });
    }
  }, [currentIndex, images.length, containerWidth]);

  useEffect(() => {
    if (images.length <= 1 || containerWidth === 0 || !isImagesLoaded) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(scrollToNextImage, autoScrollInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    images.length,
    autoScrollInterval,
    scrollToNextImage,
    containerWidth,
    isImagesLoaded,
  ]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (containerWidth <= 0) return;

      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(contentOffsetX / containerWidth);
      if (
        newIndex !== currentIndex &&
        newIndex >= 0 &&
        newIndex < images.length
      ) {
        setCurrentIndex(newIndex);
      }
    },
    [containerWidth, currentIndex, images.length],
  );

  const handleBannerPress = useCallback(
    (index: number) => {
      images[index]?.onPress?.();
    },
    [images],
  );

  const handleImageLoad = useCallback(
    (event: NativeSyntheticEvent<ImageLoadEventData>, index: number) => {
      const {width, height} = event.nativeEvent.source;
      if (containerWidth > 0 && width > 0) {
        const aspectRatio = width / height;
        const calculatedHeight = containerWidth / aspectRatio;

        setImageHeights(prevHeights => {
          const newHeights = [...prevHeights];
          newHeights[index] = calculatedHeight;

          // Check if all images have attempted to load (either loaded or errored)
          if (newHeights.every(h => h !== defaultHeight)) {
            setIsImagesLoaded(true);
          }

          return newHeights;
        });
      }
    },
    [containerWidth, defaultHeight],
  );

  const handleImageError = useCallback(
    (index: number) => {
      console.log(`Failed to load banner image at index ${index}`);
      setImageHeights(prevHeights => {
        const newHeights = [...prevHeights];
        // Set a fallback height for errored images so we don't wait forever
        newHeights[index] = defaultHeight + 0.001; // Slightly different to trigger every()

        if (newHeights.every(h => h !== defaultHeight)) {
          setIsImagesLoaded(true);
        }
        return newHeights;
      });
    },
    [defaultHeight],
  );

  const renderBannerImages = useMemo(() => {
    return images.map((image, index) => {
      const imageHeight = imageHeights[index] || defaultHeight;

      return (
        <TouchableOpacity
          key={image.id}
          activeOpacity={image.onPress ? 0.8 : 1}
          onPress={() => handleBannerPress(index)}
          style={[
            styles.touchable,
            {width: containerWidth, height: imageHeight},
          ]}>
          <Image
            source={image.imageUrl ? {uri: image.imageUrl} : image.source}
            style={[styles.banner, customStyles.banner, {height: imageHeight}]}
            resizeMode="cover"
            onLoad={event => handleImageLoad(event, index)}
            onError={() => handleImageError(index)}
          />
        </TouchableOpacity>
      );
    });
  }, [
    images,
    containerWidth,
    imageHeights,
    defaultHeight,
    customStyles.banner,
    handleBannerPress,
    handleImageLoad,
  ]);

  // Memoized indicators
  const renderIndicators = useMemo(() => {
    if (!showIndicators || images.length <= 1) return null;

    return (
      <View
        style={[styles.indicatorContainer, customStyles.indicatorContainer]}>
        {images.map((_, index) => (
          <View
            key={index}
            style={
              index === currentIndex ? styles.activeContainer : styles.indicator
            }>
            {index === currentIndex && (
              <Animated.View
                style={[
                  styles.activeIndicator,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, getScreenWidth(7.5)],
                    }),
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  }, [showIndicators, images.length, currentIndex, customStyles]);

  return (
    <View
      style={[styles.container, customStyles.container]}
      onLayout={handleLayout}>
      {containerWidth > 0 && (
        <>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}>
            {renderBannerImages}
          </ScrollView>
          {renderIndicators}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: Spacing.Medium,
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  touchable: {},
  banner: {
    width: '100%',
    borderRadius: Spacing.Small,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.SMALLXX,
    marginTop: Spacing.Small,
  },

  indicator: {
    width: getScreenWidth(4),
    height: getScreenWidth(1),
    borderRadius: BorderRadius.Full,
    backgroundColor: ColorPalette.WelcomeBack,
    overflow: 'hidden',
  },

  activeContainer: {
    width: getScreenWidth(7.5),
    height: getScreenWidth(1),
    borderRadius: BorderRadius.Full,
    backgroundColor: ColorPalette.WelcomeBack,
    overflow: 'hidden',
  },

  activeIndicator: {
    height: '100%',
    backgroundColor: ColorPalette.TEXT_GREY_400,
  },
});

export default React.memo(ScrollableBanner);
