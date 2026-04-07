import React, {useState, useMemo} from 'react';
import {View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import ColorPalette from '../../../../config/ColorPalette';
import {goBack} from '../../../../utils/navigationref';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import {TypographyVariant} from '../../../../components/MainComponents/Typography/Typography.types';
import {Header} from '../../../../components/CustomComponents/Header/Header';
import {styles} from './HelpSupport.styles';
import {SearchBox} from '../../../../components/CustomComponents/SearchBox/SearchBox';
import MicrophoneIcon from '../../../../assets/icons/MicrophoneIcon';
import {MenuItem} from '../../../../components/CustomComponents/MenuItem/MenuItem';
import ArrowRightIcon from '../../../../assets/icons/ArrowRightIcon';
import {Typography} from '../../../../components/MainComponents/Typography/Typography';
import {Button} from '../../../../components/MainComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../components/MainComponents/Button/Button.types';
import {Spacing} from '../../../../config/globalStyles';
import {SupportChoiceModal} from '../../../../components/CustomComponents/SupportModal/SupportChoiceModal';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store';
import ScreenWrapper from '../../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const CustomSearchBox = React.memo(({value, onChangeText, placeholder}) => (
  <View style={styles.searchBoxContainer}>
    <SearchBox
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      customContainerStyle={styles.searchInput}
      autoFocus={false}
    />
    <View style={styles.micIconContainer}>
      <MicrophoneIcon
        size={20}
        color="#606060"
        style={undefined}
        onPress={undefined}
      />
    </View>
  </View>
));

const HelpSupport = () => {
  const [searchText, setSearchText] = useState('');
  const [isSupportModalVisible, setSupportModalVisible] = useState(false);
  const {supportWhatsApp, supportEmail} = useSelector(
    (state: RootState) => state.app,
  );

  const faqItems = useMemo(
    () => [
      'How do I track my order?',
      'How can I get a refund?',
      'What is the return & exchange policy?',
      'How does reselling work?',
      'How can I refer & earn rewards?',
      'How do I manage my catalog?',
      'How do I update my account & profile?',
      'What offers & discounts are available?',
      'How do I track my order?',
      'How can I get a refund?',
      'What is the return & exchange policy?',
      'How does reselling work?',
      'How can I refer & earn rewards?',
      'How do I manage my catalog?',
      'How do I update my account & profile?',
      'What offers & discounts are available?',
    ],
    [],
  );

  const renderArrowIcon = useMemo(
    () => (
      <ArrowRightIcon
        style={undefined}
        color={ColorPalette.TEXT_GREY_400}
        size={24}
      />
    ),
    [],
  );

  const bottomContainerStyle = useMemo(
    () => ({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: ColorPalette.WHITE,
      paddingHorizontal: getScreenWidth(4),
      paddingVertical: getScreenHeight(2),
      gap: getScreenHeight(1),
    }),
    [],
  );

  const menuItemStyle = useMemo(
    () => ({
      paddingVertical: getScreenHeight(2),
    }),
    [],
  );

  const menuItemTextStyle = useMemo(
    () => ({
      color: ColorPalette.TEXT_GREY_500,
    }),
    [],
  );

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
     <ScreenWrapper
              backgroundColor={ColorPalette.WHITE}
              edges={['top', 'bottom']}
            >
      <Header
        name="Help & Support"
        variant={TypographyVariant.H6_SEMIBOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={22} onPress={goBack} />
        }
      />
      <View style={styles.searchContainer}>
        <CustomSearchBox
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Products"
        />
      </View>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: getScreenHeight(17)},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.questionContainer}>
          <Typography
            text="Frequently asked questions (FAQ)"
            variant={TypographyVariant.H6_MEDIUM}
            customTextStyles={{paddingHorizontal: getScreenWidth(4)}}
          />
          <View style={styles.menuContainer}>
            {faqItems.map((item, index) => (
              <MenuItem
                key={index}
                label={item}
                onPress={undefined}
                containerStyle={undefined}
                contentStyle={undefined}
                textStyle={undefined}
                rightIcon={renderArrowIcon}
                variant={TypographyVariant.PMEDIUM_REGULAR}
                textStyle={menuItemTextStyle}
                containerStyle={menuItemStyle}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={bottomContainerStyle}>
        <Typography
          text="Still need help? We're just an email away!"
          variant={TypographyVariant.LSMALL_REGULAR}
          customTextStyles={{
            textAlign: 'center',
            color: ColorPalette.TEXT_GREY_500,
          }}
        />
        <Button
          text="Send a message"
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          type={ButtonType.PRIMARY}
          onPress={() => {}}
          state={ButtonState.DEFAULT}
          customStyles={{
            borderRadius: Spacing.Medium,
          }}
          bgColor={ColorPalette.ROSE_PURPLE_300}
        />
      </View>
      <SupportChoiceModal
        isVisible={isSupportModalVisible}
        onClose={() => setSupportModalVisible(false)}
        whatsappNumber={supportWhatsApp}
        supportEmail={supportEmail}
      />
    </ScreenWrapper>
  );
};

export default HelpSupport;
