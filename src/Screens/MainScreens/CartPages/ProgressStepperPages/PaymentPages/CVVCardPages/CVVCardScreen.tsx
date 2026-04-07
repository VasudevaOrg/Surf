import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './CVVCardScreen.styles';
import { CVVCardScreenProps } from './CVVCardScreen.types';
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
import AnimatedTextInput from '../../../../../../components/MainComponents/TextInput/TextInput';
import VisaIcon from '../../../../../../assets/icons/VisaIcon';
import { Typography } from '../../../../../../components/MainComponents/Typography/Typography';
import { SlidingBar } from '../../../../../../components/CustomComponents/SlidingBar/SlidingBar';
import { SlidingBarOption } from '../../../../../../components/CustomComponents/SlidingBar/SlidingBar.types';
import CheckIcon from '../../../../../../assets/icons/CheckIcon';
import { TouchableOpacity } from 'react-native';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../../../components/MainComponents/Button';
import { OtpInput } from '../../../../../../components/MainComponents/OtpInput/OtpInput';
import { BorderRadius } from '../../../../../../config/globalStyles';
import ScreenWrapper from '../../../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const CVVCardScreen: React.FC<CVVCardScreenProps> = () => {
  const [nameOnCard, setNameOnCard] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [isSaveCardChecked, setIsSaveCardChecked] = React.useState(false);
  const [cvv, setCvv] = React.useState('');

  const cardTypeOptions: SlidingBarOption[] = [
    { id: '1', label: 'Personal' },
    { id: '2', label: 'Business' },
    { id: '3', label: 'Other' },
  ];
  const [selectedCardType, setSelectedCardType] =
    React.useState<SlidingBarOption>(cardTypeOptions[0]);
  return (
    // <SafeAreaView
    //   style={{flex: 1, backgroundColor: ColorPalette.WHITE}}
    //   edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}
    >
      <Header
        name="Enter CVV"
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
      //         params: {screen: 'HelpSupport'},
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
        <View style={styles.deductNotice}>
          <Typography
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            text="$1 will be deducted to verify the card, and the refund will be instantly initiated to your bank account."
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
        </View>
        <View style={styles.otpContainer}>
          <Typography
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_300,
              textAlign: 'center',
            }}>
            Enter the{' '}
            <Typography
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              text="3-digit CVV"
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />{' '}
            <Typography
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              text="from your Malta Bank card ending in"
              customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
            />{' '}
            <Typography
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              text="**** 2083."
              customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
            />{' '}
          </Typography>
          <View style={styles.otpInputContainer}>
            <OtpInput
              numberOfDigits={3}
              focusColor={ColorPalette.ROSE_PURPLE_300}
              onTextChange={setCvv}
              focusStickBlinkingDuration={500}
              theme={{
                containerStyle: {
                  justifyContent: 'center',
                  gap: getScreenWidth(4),
                },
                pinCodeContainerStyle: {
                  width: getScreenWidth(15),
                  height: getScreenWidth(15),
                  backgroundColor: ColorPalette.WHITE,
                  borderWidth: 0,
                  borderRadius: BorderRadius.Small,
                },
                focusedPinCodeContainerStyle: {
                  borderWidth: 1,
                  borderColor: '#4A4A4A',
                },
              }}
            />
          </View>
          <Button
            text="Processed"
            onPress={() => navigate('AddPayment')}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.LARGE}
            state={ButtonState.DEFAULT}
            bgColor={ColorPalette.ROSE_PURPLE_300}
            customStyles={{
              marginTop: getScreenHeight(4),
              width: '100%',
            }}
            withShadow
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default CVVCardScreen;
