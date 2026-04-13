import React, { useMemo, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import { Header } from '../../../components/CustomComponents/Header/Header';
import { MenuItem } from '../../../components/CustomComponents/MenuItem/MenuItem';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { goBack } from '../../../utils/navigationref';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { styles } from './AccountScreen.styles';
import { API_ENDPOINTS } from '../../../config/ApiConfig';
import { useState, useEffect } from 'react';
import BagIcon from '../../../assets/icons/BagIcon';
import MastercardIcon from '../../../assets/icons/MastercardIcon';
import { AccountIcon } from '../../../assets/icons/BottomNavIcons';
import LocationPinIcon from '../../../assets/icons/LocationPinIcon';
import HeartIcon from '../../../assets/icons/HeartIcon';
import StockIcon from '../../../assets/icons/StoreIcon';
import GlobeIcon from '../../../assets/icons/GlobeIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import ShareIcon from '../../../assets/icons/ShareIcon';
import BellNotificationIcon from '../../../assets/icons/BellIcon'; // Check export name
import LockIcon from '../../../assets/icons/LockIcon';
import {
  MoneyIcon,
  FileIcon,
  InfoIcon,
  LogoutIcon,
} from '../../../assets/icons/AccountScreenIcons';
import { AccountOptionCard } from '../../../components/CustomComponents/AccountComponents/AccountOptionCard/AccountOptionCard';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { ConfirmationModal } from '../../../components/CustomComponents/ConfirmationModal/ConfirmationModal';
import { logout } from '../../../store/slices/authSlice';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../components/MainComponents/Button';
import { Spacing } from '../../../config/globalStyles';
import { SupportChoiceModal } from '../../../components/CustomComponents/SupportModal/SupportChoiceModal';
import ScreenWrapper from '../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';
import UserIcon from '../../../assets/icons/UserIcon';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeft';
import BoxIcon from '../../../assets/icons/BoxIcon';
import { Screen } from 'react-native-screens';
import DeleteIcon from '../../../assets/icons/DeleteIcon';

const AccountScreen = () => {
  const navigation = useNavigation<any>();
  const [profileData, setProfileData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isSupportModalVisible, setSupportModalVisible] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const { supportWhatsApp, supportEmail, pageIds } = useSelector(
    (state: RootState) => state.app,
  );
  const dispatch = useDispatch();

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setLoadingProfile(false);
      return;
    }
    try {
      setLoadingProfile(true);
      const response = await axios.get(API_ENDPOINTS.USER_PROFILE(userId));
      if (response.data && response.data.profile) {
        setProfileData(response.data.profile);
      }
    } catch (error: any) {
      console.error('Error fetching user profile:', error.message);
    } finally {
      setLoadingProfile(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile]),
  );

  // const gridData = useMemo(() => {
  //   if (!userId) return [];
  //   return [
  //     {
  //       label: 'Your Orders',
  //       icon: (
  //         <BagIcon
  //           size={24}
  //           color={ColorPalette.TEXT_GREY_500 as string}
  //           stroke={ColorPalette.TEXT_GREY_500 as string}
  //           style={undefined}
  //         />
  //       ),
  //       onPress: () => {
  //         navigate('MainScreens', {
  //           screen: 'Account',
  //           params: { screen: 'OrderScreen' },
  //         });
  //       },
  //     },
  //     {
  //       label: 'Help & Support',
  //       icon: (
  //         <QuestionMarkIcon
  //           size={24}
  //           color={ColorPalette.TEXT_GREY_500 as string}
  //           style={undefined}
  //         />
  //       ),
  //       onPress: () => {
  //         navigate('MainScreens', {
  //           screen: 'Account',
  //           params: { screen: 'HelpSupport' },
  //         });
  //       },
  //     },
  //     {
  //       label: 'Payments',
  //       icon: <MastercardIcon size={24} style={undefined} />,
  //       onPress: () => {
  //         navigate('MainScreens', {
  //           screen: 'Cart',
  //           params: { screen: 'AddPayment' },
  //         });
  //       },
  //     },
  //   ];
  // }, [userId]);

  const infoItems = useMemo(() => {
    if (!userId) return [];
    return [
      {
        label: 'Orders',
        subtitle: 'View your order history and status',
        leftIcon: (
          <BoxIcon
            size={24}
            color={ColorPalette.TEXT_GREY_500 as string}
            style={undefined}
          />
        ),
        rightIcon: (
          <ArrowRightIcon
            style={undefined}
            color={ColorPalette.TEXT_GREY_400}
          />
        ),
        onPress: () => {
          navigation.navigate('MainScreens', {
            screen: 'Account',
            params: { screen: 'OrderScreen' },
          });
        },
      },
      // {
      //   label: 'My Profile',
      //   subtitle: 'View and edit your profile details',
      //   image: undefined,
      //   leftIcon: (
      //     <AccountIcon
      //       size={24}
      //       color={ColorPalette.TEXT_GREY_500 as string}
      //       style={undefined}
      //     />
      //   ),
      //   rightIcon: (
      //     <ArrowRightIcon
      //       style={undefined}
      //       color={ColorPalette.TEXT_GREY_400}
      //     />
      //   ),
      //   onPress: () => {
      //     navigate('MainScreens', {
      //       screen: 'Account',
      //       params: { screen: 'PersonalInfo' },
      //     });
      //   },
      // },
      {
        label: 'Wishlist',
        subtitle: 'Saved items for later purchase',
        image: undefined,
        leftIcon: (
          <HeartIcon
            size={24}
            color={ColorPalette.TEXT_GREY_500 as string}
            style={undefined}
          />
        ),
        rightIcon: (
          <ArrowRightIcon
            style={undefined}
            color={ColorPalette.TEXT_GREY_400}
          />
        ),
        onPress: () => {
          navigation.navigate('MainScreens', {
            screen: 'Home',
            params: { screen: 'WishList' },
          });
        },
      },
      // {
      //   label: 'Address',
      //   subtitle: 'Manage shipping details',
      //   image: undefined,
      //   leftIcon: (
      //     <LocationPinIcon
      //       size={24}
      //       color={ColorPalette.TEXT_GREY_500 as string}
      //       style={undefined}
      //     />
      //   ),
      //   rightIcon: (
      //     <ArrowRightIcon
      //       style={undefined}
      //       color={ColorPalette.TEXT_GREY_400}
      //     />
      //   ),
      //   onPress: () => {
      //     navigate('MainScreens', {
      //       screen: 'Account',
      //       params: {screen: 'AddressScreen'},
      //     });
      //   },
      // },
      ...(userId
        ? [
          {
            label: 'Notifications',
            subtitle: 'Push, email & SMS alerts',
            image: undefined,
            leftIcon: (
              <BellNotificationIcon
                size={24}
                color={ColorPalette.TEXT_GREY_500 as string}
                style={undefined}
              />
            ),
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.TEXT_GREY_400}
              />
            ),
            onPress: () => {
              navigation.navigate('MainScreens', {
                screen: 'Home',
                params: { screen: 'Notification' },
              });
            },
          },
        ]
        : []),
      // {
      //   label: 'Select currency',
      //   image: undefined,
      //   leftIcon: (
      //     <MoneyIcon
      //       size={24}
      //       color={ColorPalette.TEXT_GREY_500 as string}
      //       style={undefined}
      //     />
      //   ),
      //   rightIcon: (
      //     <ArrowRightIcon
      //       style={undefined}
      //       color={ColorPalette.TEXT_GREY_400}
      //     />
      //   ),
      //   onPress: () => { },
      // },
    ];
  }, [userId, navigation]);

  const otherItems = useMemo(
    () => [
      {
        label: 'Help center',
        subtitle: 'Chat & contact us',
        image: undefined,
        leftIcon: (
          <InfoIcon
            size={24}
            color={ColorPalette.TEXT_GREY_500 as string}
            style={undefined}
          />
        ),
        rightIcon: (
          <ArrowRightIcon
            style={undefined}
            color={ColorPalette.TEXT_GREY_400}
          />
        ),
        onPress: () => {
          setSupportModalVisible(true);
        },
      },
      {
        label: 'Terms & condition',
        subtitle: 'How we run the marketplace',
        image: undefined,
        leftIcon: (
          <FileIcon
            size={24}
            color={ColorPalette.TEXT_GREY_500 as string}
            style={undefined}
          />
        ),
        rightIcon: (
          <ArrowRightIcon
            style={undefined}
            color={ColorPalette.TEXT_GREY_400}
          />
        ),
        onPress: () => {
          if (pageIds?.terms_and_conditions_page) {
            navigation.navigate('WebViewScreen', {
              url: pageIds.terms_and_conditions_page,
              title: 'Terms & Conditions',
            });
          }
        },
      },
      {
        label: 'Privacy policy',
        subtitle: 'Your data & preferences',
        image: undefined,
        leftIcon: (
          <LockIcon
            size={24}
            color={ColorPalette.TEXT_GREY_500 as string}
            style={undefined}
          />
        ),
        rightIcon: (
          <ArrowRightIcon
            style={undefined}
            color={ColorPalette.TEXT_GREY_400}
          />
        ),
        onPress: () => {
          if (pageIds?.privacy_policy_page) {
            navigation.navigate('WebViewScreen', {
              url: pageIds.privacy_policy_page,
              title: 'Privacy Policy',
            });
          }
        },
      },
      {
        label: 'Share the app',
        subtitle: 'Share this app with friends',
        image: undefined,
        leftIcon: (
          <ShareIcon
            size={22}
            color={ColorPalette.TEXT_GREY_500 as string}
            style={undefined}
          />
        ),
        rightIcon: (
          <ArrowRightIcon
            style={undefined}
            color={ColorPalette.TEXT_GREY_400}
          />
        ),
        onPress: async () => {
          try {
            await Share.share({
              message:
                'Check out the Surf app! Download it here: ',
            });
          } catch (error: any) {
            console.error('Error sharing:', error.message);
          }
        },
      },
      ...(pageIds?.about_us_page
        ? [
          {
            label: 'About Us',
            subtitle: 'Learn more about us',
            image: undefined,
            leftIcon: (
              <InfoIcon
                size={24}
                color={ColorPalette.TEXT_GREY_500 as string}
                style={undefined}
              />
            ),
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.TEXT_GREY_400}
              />
            ),
            onPress: () => {
              navigation.navigate('WebViewScreen', {
                url: pageIds.about_us_page!,
                title: 'About Us',
              });
            },
          },
        ]
        : []),
    ],
    [pageIds, navigation],
  );

  const handleLogout = () => {
    setLogoutModalVisible(false);
    dispatch(logout());
  };

  const logOutItem = useMemo(() => {
    if (!userId) return [];
    return [
      {
        label: 'Log out',
        image: undefined,
        leftIcon: (
          <LogoutIcon
            size={22}
            color={ColorPalette.TEXT_GREY_500 as string}
            style={undefined}
          />
        ),
        // rightIcon: (
        //   <ArrowRightIcon
        //     style={undefined}
        //     color={ColorPalette.TEXT_GREY_400}
        //   />
        // ),
        onPress: () => {
          setLogoutModalVisible(true);
        },
      },
    ];
  }, [userId]);

  const deleteAccountItem = useMemo(() => {
    if (!userId) return [];
    return [
      {
        label: 'Delete account',
        image: undefined,
        leftIcon: (
          <DeleteIcon
            size={22}
            color={ColorPalette.TEXT_GREY_500 as string}
            style={undefined}
          />
        ),
        onPress: () => {
          setDeleteModalVisible(true);
        },
        rightIcon: undefined,
      },
    ];
  }, [userId]);

  const handleDeleteAccount = async () => {
    if (!userId) return;
    try {
      setDeleteModalVisible(false);
      const response = await axios.delete(API_ENDPOINTS.DELETE_PROFILE(userId));
      if (response.data && response.data.result === true) {
        Alert.alert(
          'Account Deletion Request',
          'We’ve received your request to delete your account.\nYour account will be permanently deleted within 24 hours.\nIf you did not request this, please contact support immediately.',
          [
            {
              text: 'OK',
              onPress: () => {
                dispatch(logout());
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error: any) {
      console.error('Error deleting account:', error.message);
    }
  };

  return (
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name="My Account"
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.TEXT_GREY_500}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={22} onPress={goBack} />
        }
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(15) }, // Increased padding to prevent cut-off
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          {/* <View style={styles.profileData}> */}
          {userId ? (
            loadingProfile ? (
              <ActivityIndicator size="small" color={ColorPalette.PRIMARY} />
            ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: getScreenWidth(2),
                  }}>
                  <LinearGradient
                    colors={['#FF4B7A', '#7C5CFF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.imageContainer}>
                    <UserIcon width={26} height={26} style={undefined} />
                  </LinearGradient>
                  <Typography
                    text={`${profileData?.firstname || 'User'} ${profileData?.lastname || ''
                      }`}
                    variant={TypographyVariant.LMEDIUM_MEDIUM}
                    customTextStyles={{
                      fontSize: 17,
                      lineHeight: 22,
                      textAlignVertical: 'center',
                    }}
                  // customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                  />
                  {/* <Typography
                    text={profileData?.phone || ''}
                    variant={TypographyVariant.LSMALL_REGULAR}
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
                    /> */}
                </View>

                <Button
                  text="Edit"
                  onPress={() => {
                    navigation.navigate('MainScreens', {
                      screen: 'Account',
                      params: { screen: 'PersonalInfo' },
                    });
                  }}
                  variant={ButtonVariant.PRIMARY}
                  state={ButtonState.DEFAULT}
                  size={ButtonSize.MEDIUM}
                  bgColor={ColorPalette.ROSE_PURPLE_300}
                  customStyles={{
                    borderRadius: Spacing.Small,
                    paddingHorizontal: Spacing.Large,
                    height: getScreenHeight(5),
                    // paddingTop:2.8
                    paddingTop: getScreenHeight(0.6),
                  }}
                  customTextStyles={{
                    textAlign: 'center',
                    // fontFamily: 'Inter',
                    fontSize: 14,
                  }}
                  withShadow
                />
              </>
            )
          ) : (
            <View
              style={{
                flexDirection: 'column',
                gap: getScreenWidth(4),
                paddingVertical: getScreenHeight(0.8),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: getScreenWidth(3),
                }}>
                <LinearGradient
                  colors={['#FF4B7A', '#7C5CFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.imageContainer}>
                  <UserIcon width={26} height={26} style={undefined} />
                </LinearGradient>
                <View style={{ gap: getScreenHeight(0.2) }}>
                  <Typography
                    text={`Welcome, Guest`}
                    variant={TypographyVariant.H6_SEMIBOLD}
                  // customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                  />
                  <Typography
                    text={`Sign in to track your orders, wishlist and rewards.`}
                    variant={TypographyVariant.LSMALL_REGULAR}
                    customTextStyles={{
                      color: ColorPalette.TEXT_GREY_300,
                      paddingVertical: getScreenHeight(0.1),
                      width: getScreenWidth(51),
                      lineHeight: 14,
                    }}
                  />
                </View>
              </View>

              <Button
                text="Login / Create Account"
                onPress={() => {
                  try {
                    // Try direct navigation first
                    navigation.navigate('Authentication', {
                      screen: 'PhoneNumberScreen',
                    });
                  } catch (error) {
                    console.log('Navigation to Authentication failed', error);
                  }
                }}
                variant={ButtonVariant.PRIMARY}
                state={ButtonState.DEFAULT}
                size={ButtonSize.MEDIUM}
                bgColor={ColorPalette.ROSE_PURPLE_300}
                customStyles={{
                  borderRadius: Spacing.Small,
                  // paddingHorizontal: Spacing.Large,
                  width: getScreenWidth(87),
                  height: getScreenHeight(6),
                  alignSelf: 'stretch',
                }}
                customTextStyles={{
                  textAlign: 'center',
                  // fontFamily: 'Inter',
                  fontSize: 14,
                }}
                withShadow
              />
            </View>
          )}
        </View>

        {/* <View style={styles.gridContainer}>
          {gridData.map((item, index) => (
            <AccountOptionCard
              key={index}
              label={item.label}
              icon={item.icon}
              onPress={item.onPress}
            />
          ))}
        </View> */}

        {userId && (
          <View
            style={{
              gap: getScreenHeight(0.8),
            }}>
            {infoItems.length > 0 && (
              <Typography
                text="Shopping"
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{
                  color: ColorPalette.TEXT_GREY_300,
                  paddingVertical: getScreenHeight(0.8),
                  paddingHorizontal: getScreenWidth(1),
                }}
              />
            )}
            <View style={styles.optionsContainer}>
              {infoItems.map((item, index) => (
                <MenuItem
                  key={index}
                  label={item.label}
                  subtitle={item.subtitle}
                  image={item.image}
                  rightIcon={item.rightIcon}
                  onPress={item.onPress}
                  textStyle={{ color: ColorPalette.GREY_TEXT_500 }}
                  variant={TypographyVariant.LMEDIUM_MEDIUM}
                  containerStyle={{
                    paddingVertical: getScreenHeight(1.5),
                    paddingHorizontal: getScreenWidth(4),
                  }}
                  leftIcon={item.leftIcon}
                  testID={`menu-item-${index}`}
                  contentStyle={undefined}
                  leftIconContainerStyle={styles.menuIconContainer}
                  rightIconContainerStyle={undefined}
                  leftIconBackgroundColor="#F3F4F6"
                  showBottomBorder={true}
                  isLastItem={
                    userId
                      ? item.label === 'Notifications'
                      : item.label === 'Address'
                  }
                />
              ))}
            </View>
          </View>
        )}

        <View
          style={{
            gap: getScreenHeight(0.8),
          }}>
          <Typography
            text="Support & legal"
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_300,
              paddingVertical: getScreenHeight(0.8),
              paddingHorizontal: getScreenWidth(1),
              marginTop: getScreenHeight(1),
            }}
          />
          <View style={styles.optionsContainer}>
            {otherItems.map((item, index) => (
              <MenuItem
                key={`other-${index}`}
                label={item.label}
                subtitle={item.subtitle}
                image={item.image}
                rightIcon={item.rightIcon}
                onPress={item.onPress}
                textStyle={{ color: ColorPalette.GREY_TEXT_500 }}
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                containerStyle={{
                  paddingVertical: getScreenHeight(1.5),
                  paddingHorizontal: getScreenWidth(4),
                }}
                leftIcon={item.leftIcon}
                testID={`other-menu-item-${index}`}
                contentStyle={undefined}
                leftIconContainerStyle={styles.menuIconContainer}
                rightIconContainerStyle={undefined}
                leftIconBackgroundColor="#F3F4F6"
                showBottomBorder={true}
                isLastItem={item.label === 'Share the app'}
              />
            ))}
          </View>
        </View>

        <View
          style={[
            styles.optionsContainer,
            {
              paddingVertical: getScreenHeight(0),
            },
          ]}>
          {deleteAccountItem.map((item, index) => (
            <MenuItem
              key={`other-${index}`}
              label={item.label}
              image={item.image}
              rightIcon={item.rightIcon}
              onPress={item.onPress}
              textStyle={{
                color: ColorPalette.GREY_TEXT_500,
                paddingVertical: getScreenHeight(0.1),
              }}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              containerStyle={{
                paddingVertical: getScreenHeight(1.5),
                paddingHorizontal: getScreenWidth(4),
              }}
              leftIcon={item.leftIcon}
              testID={`delete-menu-item-${index}`}
              contentStyle={undefined}
              leftIconContainerStyle={styles.menuIconContainer}
              rightIconContainerStyle={undefined}
              subtitle={undefined}
              leftIconBackgroundColor="#F3F4F6"
              showBottomBorder={true}
            />
          ))}
          {logOutItem.map((item, index) => (
            <MenuItem
              key={`other-${index}`}
              label={item.label}
              image={item.image}
              rightIcon={item.rightIcon}
              onPress={item.onPress}
              textStyle={{
                color: ColorPalette.GREY_TEXT_500,
                paddingVertical: getScreenHeight(0.1),
              }}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              containerStyle={{
                paddingVertical: getScreenHeight(1.5),
                paddingHorizontal: getScreenWidth(4),
              }}
              leftIcon={item.leftIcon}
              testID={`other-menu-item-${index}`}
              contentStyle={undefined}
              leftIconContainerStyle={styles.menuIconContainer}
              rightIconContainerStyle={undefined}
              subtitle={undefined}
              leftIconBackgroundColor="#F3F4F6"
            />
          ))}
        </View>
      </ScrollView>
      <ConfirmationModal
        isVisible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
        title="Log Out"
        message="Are you sure you want to log out?"
        confirmText="Log Out"
        cancelText="Cancel"
      />
      <ConfirmationModal
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
      <SupportChoiceModal
        isVisible={isSupportModalVisible}
        onClose={() => setSupportModalVisible(false)}
        whatsappNumber={supportWhatsApp}
        supportEmail={supportEmail}
        contactUsUrl={pageIds?.contact_us_page}
      />
    </ScreenWrapper>
  );
};

export default AccountScreen;
