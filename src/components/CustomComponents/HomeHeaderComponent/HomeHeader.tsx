import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BellNotificationIcon from '../../../assets/icons/BellIcon';
import FlowBite from '../../../assets/icons/FlowBite';
import HeartIcon from '../../../assets/icons/HeartIcon';
import LocationMarkFill from '../../../assets/icons/LocationMarkFill';
import ColorPalette from '../../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {Typography} from '../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';
import {styles} from './HomeHeader.styles';
import {HomeHeaderProps} from './HomeHeader.types';
import {navigate} from '../../../utils/navigationref';
import AppLogo from '../../../assets/icons/AppLogo';
import AppName from '../../../assets/icons/AppName';
import {BorderRadius} from '../../../config/globalStyles';
import HomeIcon2, {HomeIcon} from '../../../assets/icons/BottomNavIcons';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  addressMain = 'Select Location',
  subAddress = 'Add your delivery address',
  leftIcon,
  containerStyles,
  rightIcons,
  leftIcons,
}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {/* <Typography
        text="Surf Malta"
        variant={TypographyVariant.LMEDIUM_BOLD}
        customTextStyles={{
          color: ColorPalette.WHITE,
          marginTop: getScreenHeight(2),
        }}
      /> */}
      <View style={styles.contentContainer}>
        {/* <View style={styles.leftSection}>
          <View style={styles.subLeftContainer}>
            <LocationMarkFill color={ColorPalette.WHITE} style={undefined} />
            <Typography
              text={addressMain}
              variant={TypographyVariant.H5_BOLD}
              customTextStyles={{
                color: ColorPalette.WHITE,
                // Enable text truncation
                maxWidth: '85%',
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
            <FlowBite
              style={undefined}
              size={12}
              color={ColorPalette.WHITE as any}
              strokeWidth={2}
            />
          </View>
          <Typography
            text={subAddress}
            variant={TypographyVariant.PMEDIUM_MEDIUM}
            customTextStyles={{
              color: ColorPalette.WHITE,
              maxWidth: '90%',
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </View> */}
        <View style={styles.leftSection}>
          <AppLogo
            style={undefined}
            color={ColorPalette.WHITE}
            height={35}
            width={35}
          />
          <AppName
            style={undefined}
            color={ColorPalette.WHITE}
            width={69}
            height={23}
          />
        </View>
        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() =>
              navigate('MainScreens', {
                screen: 'Home',
                params: {
                  screen: 'WishList',
                },
              })
            }>
            <HeartIcon style={undefined} color={ColorPalette.WHITE} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() =>
              navigate('MainScreens', {
                screen: 'Home',
                params: {
                  screen: 'Notification',
                },
              })
            }>
            <BellNotificationIcon
              style={undefined}
              color={ColorPalette.WHITE}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* <View
        style={{
          height: getScreenHeight(4.5),
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: BorderRadius.XSmall,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: getScreenWidth(2),
          gap: getScreenWidth(2),
          backgroundColor: '#FFFFFF1A',
        }}
      >
        <HomeIcon2 size={16} color="#FFFFFF" style={undefined} />

        <View style={{ flex: 1, minWidth: 0, paddingRight: getScreenWidth(9) }}>
          <View style={{ flexDirection: 'row', gap: getScreenWidth(2) }}>
            <Typography
              text={addressMain}
              variant={TypographyVariant.PXSMALL_SEMIBOLD}
              customTextStyles={{ color: ColorPalette.WHITE }}
            />

            <Typography
              text={subAddress}
              variant={TypographyVariant.PXSMALL_MEDIUM}
              numberOfLines={1}
              ellipsizeMode="tail"
              customTextStyles={{ color: ColorPalette.WHITE }}
            />
          </View>
        </View>

        <ArrowDownIcon size={24} color="#FFFFFF" style={undefined} />
      </View> */}
    </View>
  );
};

const headerStyles = StyleSheet.create({
  badgeOverlay: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 10,
  },
  badge: {
    paddingHorizontal: 4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeHeader;
