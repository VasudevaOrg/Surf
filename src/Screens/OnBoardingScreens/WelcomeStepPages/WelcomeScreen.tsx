import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import { Button } from '../../../components/MainComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/MainComponents/Button/Button.types';
import ColorPalette from '../../../config/ColorPalette';
import { styles } from './WelcomeScreen.styles';
import { ONBOARDING_DATA } from './WelcomeScreen.constants';
import { TextButton } from '../../../components/MainComponents/TextButton';
import { Badge } from '../../../components/MainComponents/Badges/Badge';
import { BadgeType, BadgeVariant } from '../../../components/MainComponents/Badges/Badge.types';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any> | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  console.log("welcome screen currentIdx ", currentIndex);


  const isLastScreen = currentIndex === ONBOARDING_DATA.length - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex =
          prev === ONBOARDING_DATA.length - 1 ? ONBOARDING_DATA.length - 1 : prev + 1;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const navigateToSignIn = useCallback(() => {
    console.log('Navigating to SignIn screen');
    navigation.replace('Authentication', {
      screen: 'PhoneNumberScreen',
    });
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigateToSignIn();
    }
  }, [currentIndex, navigateToSignIn]);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderDotIndicators = useCallback(
    () => (
      <View style={styles.dotContainer}>
        {ONBOARDING_DATA.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 30, 8],
            extrapolate: 'clamp',
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [
              ColorPalette.WelcomeBack,
              ColorPalette.PURPLE_200,
              ColorPalette.WelcomeBack,
            ],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index.toString()}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  backgroundColor,
                },
              ]}
            />
          );
        })}
      </View>
    ),
    [scrollX],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback(item => item.id, []);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  const renderContent = () => {
    const currentItem = ONBOARDING_DATA[currentIndex];

    return (
      <>
        {!isLastScreen && (
          <Badge
            text="Skip"
            variant={BadgeVariant.OUTLINE}
            type={BadgeType.PRIMARY}
            onPress={navigateToSignIn}
            customContainerStyle={styles.skipButton}
            customTextColor={ColorPalette.WHITE}
            textVariant={TypographyVariant.LMEDIUM_REGULAR}
          />
        )}

        <FlatList
          ref={flatListRef}
          data={ONBOARDING_DATA}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />

        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <View style={styles.modalContent}>
              <View style={styles.textContainer}>
                <Typography
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  text={currentItem.title}
                  customTextStyles={styles.title}
                />
                <Typography
                  variant={TypographyVariant.H5_SEMIBOLD}
                  text={currentItem.description}
                  customTextStyles={styles.description}
                />
              </View>

              {renderDotIndicators()}

              <View style={styles.buttonContainer}>
                <Button
                  text={isLastScreen ? `Get Started` : 'Continue'}
                  onPress={handleNext}
                  variant={ButtonVariant.PRIMARY}
                  size={ButtonSize.LARGE}
                  state={ButtonState.DEFAULT}
                  customStyles={styles.customButton}
                  withShadow={true}
                  customTextStyles={styles.customText}
                />
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <StatusBar
        backgroundColor={ColorPalette.WelcomeBack}
        barStyle="dark-content"
        translucent={false}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
