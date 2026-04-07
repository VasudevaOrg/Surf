import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Badge } from '../../../components/MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../components/MainComponents/Badges/Badge.types';
import { toggleSurfy } from '../../../store/slices/surfySlice';
import { Animated, TouchableOpacity, View, StatusBar } from 'react-native';
import {
  HomeIcon,
  ClickedHomeIcon,
  SearchIcon,
  ClickedSearchIcon,
  CategoryIcon,
  ClickedCategoryIcon,
  AccountIcon,
  ClickedAccountIcon,
  CartIcon,
  ClickedCartIcon,
} from '../../../assets/icons/BottomNavIcons';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenWidth } from '../../../helpers/screenSize';
import { styles } from './BottomTabNavigator.styles';
import HomeScreen from '../../../Screens/MainScreens/HomePages/HomeScreen';
import CategoriesScreen from '../../../Screens/MainScreens/CategoriesPages/CategoriesScreen';
import AccountScreen from '../../../Screens/MainScreens/AccountPages/AccountScreen';
import { CartNavigator } from '../CartNavigator';
import { SearchNavigator } from '../SearchNavigator';
import SurfyChatButton from '../../../components/CustomComponents/SurfyChat/SurfyChatButton';
import SurfyChatModal from '../../../components/CustomComponents/SurfyChat/SurfyChatModal';

import { ScrollContext } from './ScrollContext';

const Tab = createBottomTabNavigator();

const TAB_CONFIG = {
  Home: {
    component: HomeScreen,
    icon: HomeIcon,
    activeIcon: ClickedHomeIcon,
    title: 'Home',
  },
  Search: {
    component: SearchNavigator,
    icon: SearchIcon,
    activeIcon: ClickedSearchIcon,
    title: 'Search',
    options: { unmountOnBlur: true },
  },
  Categories: {
    component: CategoriesScreen,
    icon: CategoryIcon,
    activeIcon: ClickedCategoryIcon,
    title: 'Categories',
  },
  Account: {
    component: AccountScreen,
    icon: AccountIcon,
    activeIcon: ClickedAccountIcon,
    title: 'Account',
  },
  Cart: {
    component: CartNavigator,
    icon: CartIcon,
    activeIcon: ClickedCartIcon,
    title: 'Cart',
  },
} as const;

function AnimatedTabBarIcon({
  Icon,
  ActiveIcon,
  isFocused,
  scaleAnim,
  badgeCount,
}: any) {
  const IconComponent = isFocused ? ActiveIcon : Icon;

  const inactiveColor = ColorPalette.GREY_TEXT_200;

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}>
      {isFocused ? (
        <IconComponent
          primaryColor={ColorPalette.PURPLE_200}
          strokeColor="black"
          width={getScreenWidth(6)}
          height={getScreenWidth(6)}
        />
      ) : (
        <IconComponent
          color={inactiveColor}
          width={getScreenWidth(6)}
          height={getScreenWidth(6)}
        />
      )}
      {badgeCount > 0 && (
        <View style={styles.badgeOverlay}>
          <Badge
            text={String(badgeCount)}
            type={BadgeType.DANGER}
            variant={BadgeVariant.FILLED}
            textVariant={TypographyVariant.LXXSMALL_BOLD}
            customContainerStyle={[styles.badge, { paddingHorizontal: 0 }]}
            customTextStyles={{ marginHorizontal: 0, lineHeight: 12 }}
          />
        </View>
      )}
    </Animated.View>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const guestItems = useSelector(
    (state: RootState) => state.cart.guestCartItems,
  );
  const cartCount =
    (cartItems || []).reduce(
      (acc, item) => acc + (Number(item.amount) || 0),
      0,
    ) +
    (guestItems || []).reduce(
      (acc, item) => acc + (Number(item.amount) || 0),
      0,
    );

  const totalTabs = state.routes.length;
  const tabWidth = getScreenWidth(100) / totalTabs;

  const scaleAnims = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;

  React.useEffect(() => {
    state.routes.forEach((_: any, index: number) => {
      Animated.spring(scaleAnims[index], {
        toValue: state.index === index ? 1.2 : 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    });
  }, [state.index]);

  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabContainer}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const Icon = (TAB_CONFIG as any)[route.name]?.icon;
          const ActiveIcon = (TAB_CONFIG as any)[route.name]?.activeIcon;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem]}
              activeOpacity={0.7}>
              <AnimatedTabBarIcon
                Icon={Icon}
                ActiveIcon={ActiveIcon}
                isFocused={isFocused}
                scaleAnim={scaleAnims[index]}
                badgeCount={route.name === 'Cart' ? cartCount : 0}
              />
              <Animated.View
                style={{
                  opacity: scaleAnims[index].interpolate({
                    inputRange: [1, 1.2],
                    outputRange: [0.7, 1],
                  }),
                }}>
                <Typography
                  variant={TypographyVariant.LXSMALL_MEDIUM}
                  customTextStyles={[
                    styles.tabText,
                    isFocused ? styles.focusedTabText : styles.unfocusedTabText,
                  ]}>
                  {(TAB_CONFIG as any)[route.name]?.title}
                </Typography>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function BottomNavigation() {
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const tabBarAnim = useRef(new Animated.Value(1)).current;
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(false);

  const [isSurfyVisible, setIsSurfyVisible] = React.useState(false);

  // Threshold for showing/hiding the tab bar (in pixels)
  const THRESHOLD = 10;

  // Distance to translate the tab bar when hiding it
  const TAB_BAR_HEIGHT = 70;

  // Added a function to manually update scrollY
  const updateScrollY = (value: number) => {
    // Update the scrollY value
    scrollY.setValue(value);

    // Determine scroll direction
    const currentScrollingDown = value > lastScrollY.current;

    // Only trigger animation when direction changes or exceeds threshold
    if (
      currentScrollingDown !== isScrollingDown.current &&
      Math.abs(value - lastScrollY.current) > THRESHOLD
    ) {
      isScrollingDown.current = currentScrollingDown;

      // Animate tab bar visibility
      Animated.spring(tabBarAnim, {
        toValue: currentScrollingDown ? 0 : 1,
        friction: 10,
        tension: 70,
        useNativeDriver: true,
      }).start();
    }

    lastScrollY.current = value;
  };

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      // Determine scroll direction
      const currentScrollingDown = value > lastScrollY.current;

      // Only trigger animation when direction changes or exceeds threshold
      if (
        currentScrollingDown !== isScrollingDown.current &&
        Math.abs(value - lastScrollY.current) > THRESHOLD
      ) {
        isScrollingDown.current = currentScrollingDown;

        // Animate tab bar visibility
        Animated.spring(tabBarAnim, {
          toValue: currentScrollingDown ? 0 : 1,
          friction: 10,
          tension: 70,
          useNativeDriver: true,
        }).start();
      }

      lastScrollY.current = value;
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollY, updateScrollY }}>
      <Tab.Navigator
        tabBar={props => {
          const currentRouteName = props.state.routes[props.state.index].name;

          if (currentRouteName === 'Home') {
            if (Platform.OS === 'android') {
              StatusBar.setBackgroundColor('transparent');
            } (ColorPalette.HOME_BLUE || '#4A90E2');
            StatusBar.setBarStyle('light-content');
          } else {
            if (Platform.OS === 'android') {
              StatusBar.setBackgroundColor('transparent');
            } ('transparent');
            StatusBar.setBarStyle('dark-content');
          }

          if (currentRouteName === 'Cart') {
            return null;
          }

          return (
            <>
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: tabBarAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [TAB_BAR_HEIGHT, 0],
                      }),
                    },
                  ],
                  opacity: tabBarAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 0.8, 1],
                  }),
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}>
                <CustomTabBar {...props} />
              </Animated.View>
              <SurfyChatButton onPress={() => dispatch(toggleSurfy(true))} />
              <SurfyChatModal />
            </>
          );
        }}
        screenOptions={{
          headerShown: false,
        }}>
        {Object.entries(TAB_CONFIG).map(([name, config]) => (
          <Tab.Screen
            key={name}
            name={name}
            component={config.component}
            options={{
              title: config.title,
              ...((config as any).options || {}),
            }}
          />
        ))}
      </Tab.Navigator>
    </ScrollContext.Provider>
  );
}
