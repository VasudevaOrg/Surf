import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import { TypographyVariant } from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import { goBack } from '../../../../utils/navigationref';
import { styles } from './NotificationScreen.styles';
import { Header } from '../../../../components/CustomComponents/Header/Header';
import { Typography } from '../../../../components/MainComponents/Typography/Typography';
import TruckDelivery from '../../../../assets/icons/TruckDeliveryIcon';
import DeliveryBoxIcon from '../../../../assets/icons/DeliveryBoxIcon';
import DeliverySuccessTick from '../../../../assets/icons/DeliverySuccessIcon';
import BellNotificationIcon from '../../../../assets/icons/BellIcon';
import EmptyComponent from '../../../../components/CustomComponents/EmptyComponent';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../components/MainComponents/Button';
import { NotificationItem } from './NotificationScreen.types';
import { JSX } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteIcon from '../../../../assets/icons/DeleteIcon';
import CheckmarkIcon from '../../../../assets/icons/CheckmarkIcon';
import NotificationCard from '../../../../components/CustomComponents/NotificationComponent/NotificationCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import {
  deleteNotifications,
  getNotifications,
  markNotificationsRead,
  setOnNotificationRefresh,
} from '../../../../services/NotificationService';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';
import { SystemBars } from 'react-native-edge-to-edge';
import { showToast } from '../../../../components/MainComponents/Toast/ToastHelper';
import { ToastMessages } from '../../../../components/MainComponents/Toast/ToastMessages';
import { getScreenWidth } from '../../../../helpers/screenSize';
// import TrashIcon from '../../../../assets/icons/TrashIcon'; // Missing
// import DoubleTickIcon from '../../../../assets/icons/DoubleTickIcon'; // Missing

// Helper to format timestamp
const formatTime = (timestamp: string) => {
  const now = new Date();
  const date = new Date(parseInt(timestamp) * 1000);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

const notificationUIConfig: Record<string, { bg: string; icon: JSX.Element }> = {
  administration: {
    bg: '#DFB4001A',
    icon: <DeliveryBoxIcon />,
  },
  products: {
    bg: '#3A5AFE1A',
    icon: <TruckDelivery />,
  },
  communication: {
    bg: '#1FC16B1A',
    icon: (
      <BellNotificationIcon
        style={undefined}
        color={ColorPalette.ROSE_PURPLE_300 as string}
        size={22}
      />
    ),
  },
  default: {
    bg: '#FF326A1A',
    icon: (
      <BellNotificationIcon
        style={undefined}
        color={ColorPalette.ORANGE_300 as string}
        size={22}
      />
    ),
  },
};

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(
    [],
  );
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const fetchNotifications = React.useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const result = await getNotifications(userId);
    if (result.success) {
      const sorted = (result.notifications || []).sort(
        (a: NotificationItem, b: NotificationItem) =>
          parseInt(b.timestamp) - parseInt(a.timestamp),
      );
      setNotifications(sorted);
    }
    setLoading(false);
    setRefreshing(false);
  }, [userId]);

  React.useEffect(() => {
    fetchNotifications();
    setOnNotificationRefresh(() => {
      fetchNotifications();
    });
    return () => setOnNotificationRefresh(null);
  }, [fetchNotifications]);

  useFocusEffect(
    React.useCallback(() => {
      fetchNotifications();
    }, [fetchNotifications]),
  );

  const handleMarkAllRead = async () => {
    if (!userId) return;
    const result = await markNotificationsRead(userId);
    if (result.success) {
      fetchNotifications();
    } else {
      showToast(
        ToastMessages.NotificationScreen.failedToMarkNotificationsAsRead,
        'error',
      );
    }
  };

  const handleDeleteAll = async () => {
    if (!userId) return;
    Alert.alert(
      'Delete All Notifications',
      'Are you sure you want to delete all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteNotifications(userId);
            if (result.success) {
              fetchNotifications();
            } else {
              showToast(
                ToastMessages.NotificationScreen.failedToDeleteNotifications,
                'error',
              );
            }
          },
        },
      ],
    );
  };

  const handleMarkSingleRead = async (notificationId: string) => {
    if (!userId) return;
    const result = await markNotificationsRead(userId, notificationId);
    if (result.success) {
      fetchNotifications();
    }
  };

  const handleDeleteSingle = async (notificationId: string) => {
    if (!userId) return;
    const result = await deleteNotifications(userId, notificationId);
    if (result.success) {
      fetchNotifications();
    }
  };

  const renderLeftActions = (notificationId: string) => {
    return (
      <TouchableOpacity
        onPress={() => handleMarkSingleRead(notificationId)}
        style={{
          backgroundColor: ColorPalette.PRIMARY,
          justifyContent: 'center',
          alignItems: 'center',
          width: getScreenWidth(21.5),
          marginVertical: 10,
          borderRadius: 12,
        }}>
        <CheckmarkIcon
          size={24}
          color={ColorPalette.BLACK as string}
          style={undefined}
        />
        <Typography
          text="Read"
          variant={TypographyVariant.LSMALL_MEDIUM}
          customTextStyles={{ color: ColorPalette.BLACK as string, marginTop: 4 }}
        />
      </TouchableOpacity>
    );
  };

  const renderRightActions = (notificationId: string) => {
    return (
      <TouchableOpacity
        onPress={() => handleDeleteSingle(notificationId)}
        style={{
          backgroundColor: ColorPalette.DANGER,
          justifyContent: 'center',
          alignItems: 'center',
          width: getScreenWidth(21.5),
          marginVertical: 10,
          borderRadius: 12,
        }}>
        <DeleteIcon
          size={24}
          color={ColorPalette.BLACK as string}
          style={undefined}
          onPress={() => handleDeleteSingle(notificationId)}
        />
        <Typography
          text="Delete"
          variant={TypographyVariant.LSMALL_MEDIUM}
          customTextStyles={{ color: ColorPalette.BLACK as string, marginTop: 4 }}
        />
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     if (Platform.OS === 'android') {
  //       StatusBar.setBackgroundColor('transparent');
  //       StatusBar.setBarStyle('dark-content');
  //     }
  //   }, [])
  // );

  return (
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      {/* <SystemBars style="dark" /> */}
      <Header
        name="Notifications"
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.TEXT_GREY_500 as string}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={24} onPress={goBack} />
        }
        rightIcon={
          <View style={{ flexDirection: 'row', gap: 15, paddingRight: 15 }}>
            {notifications.length > 0 && (
              <>
                <View onTouchEnd={handleMarkAllRead}>
                  <Typography
                    text="Read All"
                    variant={TypographyVariant.LSMALL_MEDIUM}
                    customTextStyles={{ color: ColorPalette.PRIMARY as string }}
                  />
                </View>
                <View onTouchEnd={handleDeleteAll}>
                  <Typography
                    text="Clear"
                    variant={TypographyVariant.LSMALL_MEDIUM}
                    customTextStyles={{ color: ColorPalette.DANGER as string }}
                  />
                </View>
              </>
            )}
          </View>
        }
      />
      <View style={styles.mainContainer}>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator
              size="large"
              color={ColorPalette.PRIMARY as string}
            />
          </View>
        ) : (
          <FlashList
            data={notifications}
            keyExtractor={item => item.notification_id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => {
              const config =
                notificationUIConfig[item.section] ||
                notificationUIConfig.default;

              return (
                <View style={{ marginBottom: 10 }}>
                  <Swipeable
                    renderLeftActions={() =>
                      renderLeftActions(item.notification_id)
                    }
                    renderRightActions={() =>
                      renderRightActions(item.notification_id)
                    }
                    overshootLeft={false}
                    overshootRight={false}
                    friction={1}
                    enableTrackpadTwoFingerGesture
                    rightThreshold={40}
                    leftThreshold={40}>
                    <NotificationCard
                      id={item.notification_id}
                      title={item.title}
                      time={formatTime(item.timestamp)}
                      icon={config.icon}
                      bg={config.bg}
                      isRead={
                        item.is_read?.toUpperCase() === 'Y' ||
                        item.is_read === '1'
                      }
                    />
                  </Swipeable>
                </View>
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyStateContainer}>
                <EmptyComponent
                  imageSource={require('../../../../assets/images/emptyNotificationBell.png')}
                  title="No notification yet"
                  variant={TypographyVariant.H6_SEMIBOLD}
                  subVariant={TypographyVariant.PXSMALL_REGULAR}
                  subTitle="We'll notify you when there's something new."
                  buttonName="Continue Shopping"
                  onPress={() => goBack()}
                  customContainerStyle={{ backgroundColor: 'transparent' }}
                  customImageStyle={{
                    height: 200,
                    width: 200,
                    marginBottom: 20,
                  }}
                />
              </View>
            }
          />
        )}
      </View>
    </ScreenWrapper>
  );
};
export default NotificationScreen;
