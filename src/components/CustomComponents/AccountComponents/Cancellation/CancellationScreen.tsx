import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../Header/Header'; // Adjust path if needed
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types'; // Adjust path
import ColorPalette from '../../../../config/ColorPalette';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import ArrowDownIcon from '../../../../assets/icons/ArrowDownIcon';
import StarIcon from '../../../../assets/icons/StarIcon';
import { goBack } from '../../../../utils/navigationref';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';

import { styles } from './CancellationScreen.styles';
import { Typography } from '../../../MainComponents/Typography/Typography';
import {
  Button,
  ButtonType,
  ButtonSize,
  ButtonVariant,
  ButtonState,
} from '../../../MainComponents/Button';
import ScreenWrapper from '../../ScreenWrapper/ScreenWrapper';

const CancellationScreen = ({ route, navigation }) => {
  const { orderId, status, shopName, order_details, order_info } = route.params || {};

  // Dummy data mirroring the design
  const orderData = {
    image: require('../../../../assets/images/demo.png'),
    title: 'Men premium blue shoes',
    shopName: shopName || order_details?.company || order_info?.company || '',
    price: '$215.50',
    oldPrice: '$98.99',
    date: '18 Jul 2025',
  };

  const [selectedReason, setSelectedReason] = React.useState('');
  const [comment, setComment] = React.useState('');

  const reasons = [
    'Ordered by mistake',
    'Found a better price',
    'Delay in delivery',
    'No longer needed',
    'Other',
  ];

  const [isReasonExpanded, setIsReasonExpanded] = React.useState(false);

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <Header
        name="Cancel Order"
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.TEXT_GREY_500 as string}
        leftIcon={
          <ArrowLeftIcon style={undefined} onPress={goBack} size={22} />
        }
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(10) },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Product Card */}
        <View style={styles.productCard}>
          <Typography
            text={`Order ID: #${orderId || '27812423'}`}
            variant={TypographyVariant.PMEDIUM_BOLD}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_500,
              marginBottom: 8,
            }}
          />
          <View style={styles.productRow}>
            <View style={styles.imageContainer}>
              <Image source={orderData.image} style={styles.image} />
            </View>
            <View style={styles.productDetails}>
              <View>
                <Typography
                  text={orderData.title}
                  variant={TypographyVariant.PMEDIUM_MEDIUM}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                />
                <Typography
                  text={orderData.shopName}
                  variant={TypographyVariant.LMEDIUM_REGULAR} // Smaller text
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_100,
                    fontSize: 12,
                  }}
                />
              </View>

              <View style={styles.priceRow}>
                <Typography
                  text={orderData.price}
                  variant={TypographyVariant.H6_BOLD}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                />
                <Typography
                  text={orderData.oldPrice}
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  customTextStyles={{
                    color: ColorPalette.TEXT_GREY_100,
                    textDecorationLine: 'line-through',
                  }}
                />
              </View>
              <View style={styles.dateText}>
                <Typography
                  text={orderData.date}
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Reason For Cancellation */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsReasonExpanded(!isReasonExpanded)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography
              text={selectedReason || 'Select a reason for cancellation'}
              variant={TypographyVariant.H6_MEDIUM}
              customTextStyles={{
                color: selectedReason
                  ? ColorPalette.BLACK
                  : ColorPalette.TEXT_GREY_500,
              }}
            />
            <ArrowDownIcon
              size={20}
              color={ColorPalette.TEXT_GREY_500}
              style={{
                transform: [{ rotate: isReasonExpanded ? '180deg' : '0deg' }],
              }}
            />
          </TouchableOpacity>

          {isReasonExpanded && (
            <View style={{ marginTop: getScreenHeight(1) }}>
              {reasons.map(reason => (
                <TouchableOpacity
                  key={reason}
                  style={styles.reasonRow}
                  onPress={() => {
                    setSelectedReason(reason);
                    setIsReasonExpanded(false);
                  }}
                  activeOpacity={0.7}>
                  <View
                    style={[
                      styles.radioButton,
                      selectedReason === reason && styles.radioButtonSelected,
                    ]}>
                    {selectedReason === reason && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: ColorPalette.ROSE_PURPLE_300,
                        }}
                      />
                    )}
                  </View>
                  <Typography
                    text={reason}
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Additional Comments */}
        <View style={styles.sectionContainer}>
          <Typography
            text="Additional Comments:"
            variant={TypographyVariant.H6_MEDIUM}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Type here (Optional)"
            placeholderTextColor={ColorPalette.TEXT_GREY_100}
            multiline
            value={comment}
            onChangeText={setComment}
          />
        </View>
      </ScrollView>

      <View style={styles.warningBanner}>
        <Typography
          text="Are you sure you want to cancel this order?"
          variant={TypographyVariant.LMEDIUM_MEDIUM}
          customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
        />
      </View>

      {/* Footer - Fixed at bottom */}
      <View style={styles.footer}>
        <Button
          text="Cancel Order"
          onPress={() => {
            navigation.navigate('OrderCancelled', {
              orderId,
              status: 'Cancelled',
            });
          }}
          type={ButtonType.PRIMARY}
          size={ButtonSize.LARGE}
          variant={ButtonVariant.PRIMARY}
          bgColor={ColorPalette.ROSE_PURPLE_300 as string}
        />
      </View>
    </ScreenWrapper>
  );
};

export default CancellationScreen;
