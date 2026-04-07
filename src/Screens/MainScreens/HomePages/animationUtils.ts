import {Animated, Platform, UIManager} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/**
 * Creates scroll-based animations for header and search bar with dynamic heights
 * @param scrollY - Animated.Value tracking scroll position
 * @param headerHeightRef - Ref to the measured header height
 * @param searchBoxHeightRef - Ref to the measured search box height
 * @returns Object containing animation values and styles
 */
export const createScrollAnimations = (
  scrollY,
  headerHeightRef,
  searchBoxHeightRef,
  tabBarHeightRef,
) => {
  return {
    headerStyle: {
      transform: [{translateY: 0}],
      zIndex: 10,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
    },
    searchBarStyle: {
      transform: [{translateY: 0}],
      zIndex: 9,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
    },
    tabBarStyle: {
      transform: [{translateY: 0}],
      zIndex: 8,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
    },
    contentStyle: {
      paddingTop: 0,
    },
  };
};

/**
 * Updates animation interpolations when component heights change
 * @param scrollY - Animated.Value tracking scroll position
 * @param headerHeightRef - Ref to the measured header height
 * @param searchBoxHeightRef - Ref to the measured search box height
 * @param tabBarHeightRef - Ref to the measured tab bar height
 */
export const updateAnimationInterpolations = (
  scrollY,
  headerHeightRef,
  searchBoxHeightRef,
  tabBarHeightRef,
) => {
  const headerHeight = headerHeightRef.current;
  const searchBoxHeight = searchBoxHeightRef.current;
  const tabBarHeight = tabBarHeightRef.current;

  const totalHeight = headerHeight + searchBoxHeight + tabBarHeight;

  // These thresholds determine when elements start and finish animating
  const headerScrollThreshold = headerHeight;
  const searchBarScrollThreshold = headerHeight + searchBoxHeight;

  return {
    headerStyle: {
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [0, headerScrollThreshold],
            outputRange: [0, -headerHeight],
            extrapolate: 'clamp',
          }),
        },
      ],
      zIndex: 10,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
    },
    searchBarStyle: {
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [0, headerScrollThreshold, searchBarScrollThreshold],
            outputRange: [headerHeight, 0, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
      zIndex: 9,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
    },
    tabBarStyle: {
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [0, headerScrollThreshold, searchBarScrollThreshold],
            outputRange: [
              headerHeight + searchBoxHeight,
              searchBoxHeight,
              searchBoxHeight,
            ],
            extrapolate: 'clamp',
          }),
        },
      ],
      zIndex: 8,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
    },
    contentStyle: {
      paddingTop: totalHeight,
    },
  };
};

/**
 * Updates animation interpolations when component heights change
 * @param scrollY - Animated.Value tracking scroll position
 * @param headerHeightRef - Ref to the measured header height
 * @param searchBoxHeightRef - Ref to the measured search box height
 */

export const handleScroll = (
  event: any,
  scrollY: Animated.Value,
  prevScrollY: React.MutableRefObject<number>,
) => {
  const currentScrollY = event.nativeEvent.contentOffset.y;
  prevScrollY.current = currentScrollY;
};
