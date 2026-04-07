import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeft';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';
import NewAddressItem from '../../../../../components/CustomComponents/AccountComponents/NewAddressComponent/NewAddressItem';
import { Header } from '../../../../../components/CustomComponents/Header/Header';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../components/MainComponents/Button';
import { Typography } from '../../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../config/ColorPalette';
import { Spacing } from '../../../../../config/globalStyles';
import { getScreenHeight } from '../../../../../helpers/screenSize';
import { goBack, navigate } from '../../../../../utils/navigationref';
import { styles } from './AddressScreen.styles';
import EmptyComponent from '../../../../../components/CustomComponents/EmptyComponent';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { API_ENDPOINTS, AUTH_HEADER } from '../../../../../config/ApiConfig';
import { ActivityIndicator } from 'react-native';
import PlusIconNormal from '../../../../../assets/icons/PlusIconNormal';
import { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '../../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const AddressScreen = () => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const fetchAddresses = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        API_ENDPOINTS.USER_PROFILE(userId.toString()),
      );
      if (response.data && response.data.profile) {
        const profile = response.data.profile;
        const fetchedAddresses = [
          {
            id: 'default',
            name: `${profile.firstname || ''} ${profile.lastname || ''}`.trim(),
            houseNo: profile.s_address || '',
            streetName: `${profile.s_address_2 || ''}, ${profile.s_city || ''
              }, ${profile.s_zipcode || ''}`.trim(),
            country: profile.s_country_descr || profile.s_country || '',
            rawData: profile,
          },
        ];
        setAddresses(fetchedAddresses);
      }
    } catch (error: any) {
      console.error('Error fetching profile address:', error.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [fetchAddresses]),
  );

  const isAddressEmpty = addresses.length === 0;

  const navigateToAddressAdd = () => {
    navigate('MainScreens', {
      screen: 'Account',
      params: {
        screen: 'NewAddress',
      },
    });
  };

  const handleEditAddress = index => {
    console.log('Editing address at index:', index);
  };

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name="Address"
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.TEXT_GREY_500}
        leftIcon={
          <ArrowLeftIcon style={undefined} onPress={goBack} size={22} />
        }
      // rightIcons={[
      //   {
      //     icon: QuestionMarkIcon,
      //     onPress: () => console.log('Search pressed'),
      //     size: 24,
      //   },
      // ]}
      />
      {isAddressEmpty ? (
        <View style={styles.fullEmptyContainer}>
          <EmptyComponent
            imageSource={require('../../../../../assets/images/location.png')}
            title="No address added yet!"
            customContainerStyle={styles.emptyContainerStyles}
            variant={TypographyVariant.H6_SEMIBOLD}
            subVariant={TypographyVariant.PSMALL_REGULAR}
            subTitle="Add your Home or Office Address"
            buttonName="Add New Address"
            iconColor={ColorPalette.WHITE}
            iconComponent={PlusIconNormal}
            iconPosition="right"
            iconSize={18}
            onPress={navigateToAddressAdd}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: getScreenHeight(4),
            },
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.currentLocation}>
            <View style={styles.rowContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../../../assets/images/location.png')}
                  style={styles.image}
                />
              </View>
              <Typography
                text="Add another address"
                variant={TypographyVariant.PMEDIUM_REGULAR}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
            </View>
            <Button
              text="Add"
              size={ButtonSize.SMALL}
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              type={ButtonType.OUTLINED}
              customStyles={{
                borderRadius: Spacing.Small,
                borderColor: ColorPalette.ROSE_PURPLE_300,
                borderWidth: 1.5,
              }}
              customTextStyles={{ color: ColorPalette.ROSE_PURPLE_300 }}
              onPress={navigateToAddressAdd}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: getScreenHeight(2),
            }}>
            {loading ? (
              <View style={{ paddingVertical: getScreenHeight(10) }}>
                <ActivityIndicator size="large" color={ColorPalette.PRIMARY} />
              </View>
            ) : (
              addresses.map((address, index) => (
                <NewAddressItem
                  key={address.id}
                  name={address.name}
                  houseNo={address.houseNo}
                  streetName={address.streetName}
                  country={address.country}
                  isSelected={selectedAddressIndex === index}
                  onSelect={() => setSelectedAddressIndex(index)}
                  onEdit={() => {
                    navigate('MainScreens', {
                      screen: 'Account',
                      params: {
                        screen: 'NewAddress',
                        params: {
                          type: 'edit',
                          data: address.rawData,
                        },
                      },
                    });
                  }}
                />
              ))
            )}
          </View>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default AddressScreen;
