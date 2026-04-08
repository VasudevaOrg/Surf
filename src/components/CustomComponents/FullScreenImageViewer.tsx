import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
  StatusBar,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import CloseIcon from '../../assets/icons/CloseIcon';
import ColorPalette from '../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../helpers/screenSize';
import { BorderRadius, Spacing } from '../../config/globalStyles';

const { width, height } = Dimensions.get('window');

interface FullScreenImageViewerProps {
  visible: boolean;
  images: ImageSourcePropType[];
  initialIndex: number;
  onClose: () => void;
}

const ZoomableImage: React.FC<{
  source: ImageSourcePropType;
}> = ({source}) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedScale.value = 1;
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else if (scale.value > 4) {
        scale.value = withSpring(4);
        savedScale.value = 4;
      } else {
        savedScale.value = scale.value;
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (savedScale.value > 1) {
        const maxTranslateX = (width * (savedScale.value - 1)) / 2;
        const maxTranslateY = (height * (savedScale.value - 1)) / 2;

        translateX.value = Math.max(
          -maxTranslateX,
          Math.min(maxTranslateX, savedTranslateX.value + e.translationX),
        );
        translateY.value = Math.max(
          -maxTranslateY,
          Math.min(maxTranslateY, savedTranslateY.value + e.translationY),
        );
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedScale.value = 1;
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        scale.value = withSpring(2.5);
        savedScale.value = 2.5;
      }
    });

  const composedGesture = Gesture.Simultaneous(
    doubleTapGesture,
    Gesture.Simultaneous(pinchGesture, panGesture),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  if (!source) return null;

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.Image
        source={source}
        style={[styles.fullImage, animatedStyle]}
        resizeMode="contain"
      />
    </GestureDetector>
  );
};

const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({
  visible,
  images,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    if (visible) {
      setCurrentIndex(initialIndex);
    }
  }, [visible, initialIndex]);

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <GestureHandlerRootView style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <View style={styles.closeIconWrapper}>
            <CloseIcon
              size={24}
              color={ColorPalette.WHITE as any}
              style={undefined}
            />
          </View>
        </TouchableOpacity>

        {visible && images.length > 0 && (
          <PagerView
            key={`pager-${visible}-${images.length}-${initialIndex}`}
            style={styles.pagerView}
            initialPage={initialIndex}
            onPageSelected={e => setCurrentIndex(e.nativeEvent.position)}>
            {images.map((image, index) => (
              <View key={index} style={styles.page}>
                <ZoomableImage source={image} />
              </View>
            ))}
          </PagerView>
        )}

        {visible && images.length > 0 && (
          <View style={styles.indicatorContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentIndex === index
                    ? styles.activeIndicator
                    : styles.inactiveIndicator,
                ]}
              />
            ))}
          </View>
        )}
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  fullImage: {
    width: width,
    height: height * 0.8,
  },
  closeButton: {
    position: 'absolute',
    top: getScreenHeight(5),
    right: getScreenWidth(5),
    zIndex: 100,
    padding: 10,
  },
  closeIconWrapper: {
    width: getScreenWidth(11),
    height: getScreenHeight(5.2),
    borderRadius: BorderRadius.Full,
    backgroundColor: ColorPalette.WHITE_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: getScreenHeight(5),
    width: '100%',
    gap: Spacing.XSmall,
  },
  indicator: {
    height: getScreenHeight(0.8),
    borderRadius: BorderRadius.XXSmall,
  },
  activeIndicator: {
    width: getScreenWidth(6.5),
    backgroundColor: ColorPalette.WHITE,
  },
  inactiveIndicator: {
    width: getScreenWidth(2.1),
    backgroundColor: ColorPalette.WHITE_40,
  },
});

export default FullScreenImageViewer;
