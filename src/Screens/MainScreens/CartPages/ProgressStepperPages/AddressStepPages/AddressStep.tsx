import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { styles } from './AddressStep.styles';
import AddressItem from '../../../../../components/CustomComponents/CartComponents/AddressComponent/AddressItem';
import { Typography } from '../../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../config/ColorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../components/MainComponents/Button';
import { Spacing } from '../../../../../config/globalStyles';
import { navigate } from '../../../../../utils/navigationref';
import { API_ENDPOINTS, AUTH_HEADER } from '../../../../../config/ApiConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import LocationPinIcon from '../../../../../assets/icons/LocationPinIcon';
import ShippingMethodRow from '../../../../../components/CustomComponents/CartComponents/PaymentComponents/ShippingMethodRow/ShippingMethodRow';

interface AddressStepProps {
  selectedAddress?: any;
  onAddressSelected?: (address: any) => void;
  cartData?: any;
  selectedShippingMethod?: any;
  onShippingSelected?: (method: any) => void;
  isLoading?: boolean;
}

const AddressStep: React.FC<AddressStepProps> = ({
  selectedAddress,
  onAddressSelected,
  cartData,
  selectedShippingMethod,
  onShippingSelected,
  isLoading = false,
}) => {
  // Use cartData from props
  const checkoutData = cartData;
  // Local state for addresses list, but selection is now controlled/shared if props provided.
  // We keep local 'selectedAddressId' if not provided props, but for this refactor we rely on props or default to local behaviour if needed (though we want to lift it).
  // Actually, let's make it fully controlled if props are passed.

  const [localSelectedAddressId, setLocalSelectedAddressId] = useState<
    string | null
  >(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Helper to determine current selection
  const currentSelectedId = selectedAddress
    ? selectedAddress.id
    : localSelectedAddressId;

  const handleSelect = (addr: any) => {
    setLocalSelectedAddressId(addr.id);
    if (onAddressSelected) {
      onAddressSelected(addr);
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
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
          const defaultAddress = {
            id: 'default',
            name: `${profile.firstname || ''} ${profile.lastname || ''}`.trim(),
            houseNo: profile.s_address || '',
            streetName: `${profile.s_address_2 || ''}, ${profile.s_city || ''
              }, ${profile.s_zipcode || ''}`.trim(),
            country: profile.s_country_descr || profile.s_country || '',
            phoneNumber: profile.phone || profile.s_phone || '',
            tag: 'Default Dispatching',
            rawData: profile,
          };
          setAddresses([defaultAddress]);

          // Auto-select default if none selected
          if (!currentSelectedId) {
            handleSelect(defaultAddress);
          }
        }
      } catch (error: any) {
        console.error('Error fetching profile address:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userId]);

  const navigateToAddressAdd = () => {
    navigate('MainScreens', {
      screen: 'Account',
      params: {
        screen: 'NewAddress',
      },
    });
  };

  const handleShippingSelection = (shipping: any) => {
    if (onShippingSelected) {
      onShippingSelected(shipping);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: getScreenHeight(2) }}>
          {loading || isLoading ? (
            <View style={{ paddingVertical: getScreenHeight(10) }}>
              <ActivityIndicator size="large" color={ColorPalette.PRIMARY} />
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: getScreenWidth(2),
                  paddingVertical: getScreenHeight(0.5),
                }}>
                <LocationPinIcon
                  style={undefined}
                  size={20}
                  color={ColorPalette.HOME_BLUE as string}
                />
                <Typography
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}>
                  Select delivery address
                </Typography>
              </View>

              {addresses.map((addr: any) => (
                <AddressItem
                  key={addr.id}
                  name={addr.name}
                  houseNo={addr.houseNo}
                  streetName={addr.streetName}
                  country={addr.country}
                  phoneNumber={addr.phoneNumber}
                  tag={addr.tag}
                  isSelected={currentSelectedId === addr.id}
                  onSelect={() => handleSelect(addr)}
                  onEdit={() => {
                    navigate('MainScreens', {
                      screen: 'Account',
                      params: {
                        screen: 'PersonalInfo',
                      },
                    });
                  }}
                />
              ))}

              {/* Shipping Methods Section */}
              {checkoutData?.product_groups?.[0]?.shippings ? (
                <View
                  style={[
                    styles.firstContainer,
                    {
                      paddingBottom: getScreenHeight(1.2),
                    },
                  ]}>
                  <View style={styles.paymentText}>
                    <Typography
                      text="Select Shipping Method"
                      variant={TypographyVariant.H6_MEDIUM}
                      customTextStyles={{
                        color: ColorPalette.PAYMENT_COLOR,
                      }}
                    />
                  </View>
                  <View style={styles.radioContainer}>
                    {checkoutData.product_groups[0].shippings.map(
                      (shipping: any) => (
                        <ShippingMethodRow
                          key={shipping.shipping_id}
                          isSelected={
                            selectedShippingMethod?.shipping_id ===
                            shipping.shipping_id
                          }
                          onPress={() => handleShippingSelection(shipping)}
                          name={shipping.shipping}
                          deliveryTime={shipping.service_delivery_time}
                          rate={shipping.format_rate || shipping.rate}
                          imageUrl={shipping.image_url}
                        />
                      ),
                    )}
                  </View>
                </View>
              ) : (
                <View style={{ padding: Spacing.Medium, alignItems: 'center' }}>
                  {/* Explicitly show top-level API message if present */}
                  {checkoutData?.message && (
                    <Typography
                      text={checkoutData.message}
                      variant={TypographyVariant.PMEDIUM_MEDIUM}
                      customTextStyles={{
                        color: ColorPalette.RED_100,
                        textAlign: 'center',
                        marginBottom: Spacing.Small,
                      }}
                    />
                  )}
                  {/* This handles the case where shippings are empty, usually due to MOV or other restrictions */}
                  {checkoutData?.notifications &&
                    Object.values(checkoutData.notifications).map(
                      (n: any, idx) => (
                        <Typography
                          key={idx}
                          text={n.message}
                          variant={TypographyVariant.PMEDIUM_MEDIUM}
                          customTextStyles={{
                            color:
                              n.type === 'E'
                                ? ColorPalette.RED_100
                                : ColorPalette.ORANGE_300,
                            textAlign: 'center',
                          }}
                        />
                      ),
                    )}
                  {!checkoutData?.notifications && !checkoutData?.message && (
                    <Typography
                      text="No shipping methods available for your address or order volume."
                      variant={TypographyVariant.PMEDIUM_MEDIUM}
                      customTextStyles={{
                        color: ColorPalette.TEXT_GREY_100,
                        textAlign: 'center',
                      }}
                    />
                  )}
                </View>
              )}
            </>
          )}
          {/* {!loading && (
            <Typography
              variant={TypographyVariant.PSMALL_REGULAR}
              text="If address is wrong or empty, please update in profile section."
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_400,
                marginTop: getScreenHeight(1),
                textAlign: 'center',
                paddingHorizontal: getScreenWidth(4),
              }}
            />
          )} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddressStep;
