import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './AddCardScreen.styles';
import { AddCardScreenProps } from './AddCardScreen.types';
import { Header } from '../../../../../../components/CustomComponents/Header/Header';
import { TypographyVariant } from '../../../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../../../config/ColorPalette';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeft';
import { goBack, navigate } from '../../../../../../utils/navigationref';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getScreenHeight } from '../../../../../../helpers/screenSize';
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
import ScreenWrapper from '../../../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const AddCardScreen: React.FC<AddCardScreenProps> = () => {
  const [nameOnCard, setNameOnCard] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [isSaveCardChecked, setIsSaveCardChecked] = React.useState(false);

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
        name="Add Card"
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
        <View style={styles.inputContainer}>
          <AnimatedTextInput
            label="Name on card"
            value={nameOnCard}
            onChangeText={setNameOnCard}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.ROSE_PURPLE_300}
            customFocusedBorderColor={ColorPalette.ROSE_PURPLE_300}
            customBorderWidth={1}
          />
          <AnimatedTextInput
            label="Card number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="number-pad"
            customLabelColorFocused={ColorPalette.ROSE_PURPLE_300}
            customFocusedBorderColor={ColorPalette.ROSE_PURPLE_300}
            customBorderWidth={1}
            rightIcons={[
              {
                icon: (
                  <View style={styles.visaIconContainer}>
                    <VisaIcon size={24} style={undefined} />
                  </View>
                ),
              },
            ]}
          />
          <AnimatedTextInput
            label="Expiry date (MM/YY)"
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="number-pad"
            customLabelColorFocused={ColorPalette.ROSE_PURPLE_300}
            customFocusedBorderColor={ColorPalette.ROSE_PURPLE_300}
            customBorderWidth={1}
          />
        </View>
        <View style={styles.inputContainer}>
          <Typography
            text="Nick name for card"
            variant={TypographyVariant.H6_MEDIUM}
          />
          <SlidingBar
            options={cardTypeOptions}
            selectedOption={selectedCardType}
            onOptionSelect={setSelectedCardType}
          />
        </View>
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            onPress={() => setIsSaveCardChecked(!isSaveCardChecked)}
            style={[
              styles.checkboxContainer,
              isSaveCardChecked && { borderWidth: 0 },
            ]}>
            {isSaveCardChecked && (
              <CheckIcon
                size={20}
                backgroundColor={ColorPalette.ROSE_PURPLE_300}
                checkColor={ColorPalette.WHITE}
              />
            )}
          </TouchableOpacity>
          <Typography
            text="I agree to securely save my card with the card network (Visa, Mastercard, RuPay, etc.) for future payments."
            variant={TypographyVariant.PSMALL_REGULAR}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_300, flex: 1 }}
          />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Button
          text="Add & Secure Card"
          onPress={() => navigate('CVVCard')}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          state={ButtonState.DEFAULT}
          customStyles={styles.customButton}
          withShadow={true}
          bgColor={ColorPalette.ROSE_PURPLE_300}
        />
      </View>
    </ScreenWrapper>
  );
};

export default AddCardScreen;
