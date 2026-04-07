import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './AddPaymentScreen.styles';
import { AddPaymentScreenProps } from './AddPaymentScreen.types';
import { Header } from '../../../../../../components/CustomComponents/Header/Header';
import { TypographyVariant } from '../../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../../config/ColorPalette';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeft';
import { goBack, navigate } from '../../../../../../utils/navigationref';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import QuestionMarkIcon from '../../../../../../assets/icons/QuestionMarkIcon';
import { Typography } from '../../../../../../components/MainComponents/Typography/Typography';
import PaymentMethodRow from '../../../../../../components/CustomComponents/CartComponents/PaymentComponents/PaymentMethodRow/PaymentMethodRow';
import RevolutIcon from '../../../../../../assets/icons/RevolutIcon';
import DeleteIcon from '../../../../../../assets/icons/DeleteIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/MainComponents/Button';
import MastercardIcon from '../../../../../../assets/icons/MastercardIcon';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const AddPaymentScreen: React.FC<AddPaymentScreenProps> = () => {
  const [selectedPayment, setSelectedPayment] = React.useState('revolut');
  const navigation = useNavigation<any>();

  const handlePaymentSelection = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
  };

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}
    >
      <Header
        name="Payments"
        variant={TypographyVariant.H6_MEDIUM}
        textColor={ColorPalette.TEXT_GREY_500}
        leftIcon={
          <ArrowLeftIcon style={undefined} onPress={goBack} />
        }
      // rightIcons={[
      //   {
      //     icon: QuestionMarkIcon,
      //     size: 24,
      //     color: ColorPalette.TEXT_GREY_400,
      //     onPress: () => {
      //       navigate('MainScreens', {
      //         screen: 'Account',
      //         params: { screen: 'HelpSupport' },
      //       });
      //     },
      //   },
      // ]}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(4) },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.PaymentCard}>
          <Typography text="Cards" variant={TypographyVariant.H6_MEDIUM} />
          <PaymentMethodRow
            isSelected={selectedPayment === 'revolut'}
            onPress={() => handlePaymentSelection('revolut')}
            rightElement={
              <Button
                text="Add"
                onPress={() => navigation.navigate('AddCard')}
                state={ButtonState.DEFAULT}
                size={ButtonSize.SMALL}
                type={ButtonType.OUTLINED}
                variant={ButtonVariant.PRIMARY}
                customStyles={{
                  borderWidth: 1,
                  borderColor: ColorPalette.ROSE_PURPLE_300,
                }}
                customTextStyles={{
                  color: ColorPalette.ROSE_PURPLE_300,
                }}
              />
            }>
            <MastercardIcon style={{ width: 24, height: 24 }} size={24} />
            <View style={styles.paymentLabelContainer}>
              <Typography
                text="Add credit or debit cards"
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
            </View>
          </PaymentMethodRow>
        </View>
        <View style={styles.PaymentCard}>
          <Typography text="PayPal" variant={TypographyVariant.H6_MEDIUM} />
          <PaymentMethodRow
            isSelected={selectedPayment === 'revolut'}
            onPress={() => handlePaymentSelection('revolut')}
            rightElement={
              <Button
                text="Connect"
                onPress={() => { }}
                state={ButtonState.DEFAULT}
                size={ButtonSize.SMALL}
                type={ButtonType.OUTLINED}
                variant={ButtonVariant.PRIMARY}
                customStyles={{
                  borderWidth: 1,
                  borderColor: ColorPalette.ROSE_PURPLE_300,
                }}
                customTextStyles={{
                  color: ColorPalette.ROSE_PURPLE_300,
                }}
              />
            }>
            <MastercardIcon style={{ width: 24, height: 24 }} size={24} />
            <View style={styles.paymentLabelContainer}>
              <Typography
                text="Connect another PayPal account"
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
            </View>
          </PaymentMethodRow>
        </View>
        <View style={styles.PaymentCard}>
          <Typography
            text="Revolut Pay"
            variant={TypographyVariant.H6_MEDIUM}
          />
          <PaymentMethodRow
            isSelected={selectedPayment === 'revolut'}
            onPress={() => handlePaymentSelection('revolut')}
            rightElement={
              <DeleteIcon
                size={20}
                color={ColorPalette.TEXT_GREY_300}
                onPress={() => { }}
              />
            }>
            <RevolutIcon style={{ width: 24, height: 24 }} size={24} />
            <View style={styles.paymentLabelContainer}>
              <Typography
                text="Revolut Pay is now connected. You can pay securely with Revolut."
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
            </View>
          </PaymentMethodRow>
          <PaymentMethodRow
            isSelected={selectedPayment === 'revolut'}
            onPress={() => handlePaymentSelection('revolut')}
            rightElement={
              <Button
                text="Connect"
                onPress={() => { }}
                state={ButtonState.DEFAULT}
                size={ButtonSize.SMALL}
                type={ButtonType.OUTLINED}
                variant={ButtonVariant.PRIMARY}
                customStyles={{
                  borderWidth: 1,
                  borderColor: ColorPalette.ROSE_PURPLE_300,
                }}
                customTextStyles={{
                  color: ColorPalette.ROSE_PURPLE_300,
                }}
              />
            }>
            <RevolutIcon style={{ width: 24, height: 24 }} size={24} />
            <View style={styles.paymentLabelContainer}>
              <Typography
                text="Connect another Revolut account"
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
              />
            </View>
          </PaymentMethodRow>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AddPaymentScreen;
