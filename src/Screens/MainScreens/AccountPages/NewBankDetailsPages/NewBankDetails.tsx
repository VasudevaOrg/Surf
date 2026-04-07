import React, {useMemo, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import LocationPinIcon from '../../../../assets/icons/LocationPinIcon';
import QuestionMarkIcon from '../../../../assets/icons/QuestionMarkIcon';
import {Header} from '../../../../components/CustomComponents/Header/Header';
import {SlidingBar} from '../../../../components/CustomComponents/SlidingBar/SlidingBar';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../components/MainComponents/Button';
import AnimatedTextInput from '../../../../components/MainComponents/TextInput/TextInput';
import {Typography} from '../../../../components/MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import {Spacing} from '../../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import {goBack} from '../../../../utils/navigationref';
import {styles} from './NewBankDetails.styles';
import ScreenWrapper from '../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const NewBankDetails = () => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confAccountNumber, setConfAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
     <ScreenWrapper
              backgroundColor={ColorPalette.WHITE}
              edges={['top', 'bottom']}
            >
      <Header
        name="Add Bank Details"
        variant={TypographyVariant.PMEDIUM_BOLD}
        textColor={ColorPalette.TEXT_GREY_500}
        leftIcon={
          <ArrowLeftIcon style={undefined} onPress={goBack} size={22} />
        }
        // rightIcons={[
        //   {
        //     icon: QuestionMarkIcon,
        //     onPress: () => console.log('Search pressed'),
        //     size: 24,
        //     color: ColorPalette.TEXT_GREY_400,
        //     strokeWidth: 2,
        //   },
        // ]}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: getScreenHeight(4)},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainerTwo}>
          <AnimatedTextInput
            label="Account Holder’s Name"
            value={accountHolderName}
            onChangeText={setAccountHolderName}
            keyboardType="default"
            customBorderWidth={1}
            customContainerStyles={{paddingHorizontal: getScreenWidth(4)}}
          />
          <AnimatedTextInput
            label="Account Number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="default"
            customBorderWidth={1}
            customContainerStyles={{paddingHorizontal: getScreenWidth(4)}}
          />
          <AnimatedTextInput
            label="Confirm Account Number"
            value={confAccountNumber}
            onChangeText={setConfAccountNumber}
            keyboardType="default"
            customBorderWidth={1}
            customContainerStyles={{paddingHorizontal: getScreenWidth(4)}}
          />
          <AnimatedTextInput
            label="IFSC/BIC Code"
            value={ifscCode}
            onChangeText={setIfscCode}
            keyboardType="default"
            customBorderWidth={1}
            customContainerStyles={{paddingHorizontal: getScreenWidth(4)}}
          />
        </View>
        <View
          style={{
            marginVertical: getScreenHeight(1),
            marginHorizontal: getScreenWidth(4),
            paddingVertical: getScreenHeight(2),
            paddingHorizontal: getScreenWidth(4),
            borderRadius: Spacing.Small,
            backgroundColor: ColorPalette.YELLOW_00,
          }}>
          <Typography
            text="Please enter your correct bank details carefully. They will be used for all refunds, margins, and bonus payments."
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <Button
          text="Save Details"
          onPress={goBack}
          variant={ButtonVariant.PRIMARY}
          state={ButtonState.DEFAULT}
          size={ButtonSize.MEDIUM}
          customStyles={[{borderRadius: Spacing.Medium}]}
          withShadow
          bgColor={ColorPalette.ROSE_PURPLE_300}
        />
      </View>
    </ScreenWrapper>
  );
};

export default NewBankDetails;
