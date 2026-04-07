import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import PlusIconNormal from '../../../../assets/icons/PlusIconNormal';
import QuestionMarkIcon from '../../../../assets/icons/QuestionMarkIcon';
import NewBank from '../../../../components/CustomComponents/AccountComponents/NewBank/NewBank';
import EmptyComponent from '../../../../components/CustomComponents/EmptyComponent';
import { Header } from '../../../../components/CustomComponents/Header/Header';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../components/MainComponents/Button';
import { Typography } from '../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import { Spacing } from '../../../../config/globalStyles';
import { getScreenHeight } from '../../../../helpers/screenSize';
import { goBack, navigate } from '../../../../utils/navigationref';
import { styles } from './BankDetail.styles';
import ScreenWrapper from '../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const BankDetail = () => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);

  const bankDetails = [
    {
      id: '1',
      name: 'Malta Bank',
      accountName: 'Jessica',
      accountNumber: '********96',
      ifscCode: 'MT09292',
    },
    {
      id: '2',
      name: 'Malta Bank',
      accountName: 'Jessica',
      accountNumber: '********96',
      ifscCode: 'MT09292',
    },
    {
      id: '3',
      name: 'Malta Bank',
      accountName: 'Jessica',
      accountNumber: '********96',
      ifscCode: 'MT09292',
    },
    {
      id: '4',
      name: 'Malta Bank',
      accountName: 'Jessica',
      accountNumber: '********96',
      ifscCode: 'MT09292',
    },
    {
      id: '5',
      name: 'Malta Bank',
      accountName: 'Jessica',
      accountNumber: '********96',
      ifscCode: 'MT09292',
    },
  ];

  const isAddressEmpty = bankDetails.length === 0;

  const navigateToAddressAdd = () => {
    navigate('MainScreens', {
      screen: 'Account',
      params: {
        screen: 'NewBankDetails',
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
            imageSource={require('../../../../assets/images/location.png')}
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
                  source={require('../../../../assets/images/location.png')}
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
            {bankDetails.map((address, index) => (
              <NewBank
                key={address.id}
                name={address.name}
                accountName={address.accountName}
                accountNumber={address.accountNumber}
                ifscCode={address.ifscCode}
                isSelected={selectedAddressIndex === index}
                onSelect={() => setSelectedAddressIndex(index)}
                onEdit={() => handleEditAddress(index)}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default BankDetail;
