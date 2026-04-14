import React from 'react';
import { Modal as RNModal, TouchableOpacity, View, Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import CloseIcon from '../../../assets/icons/CloseIcon';
import ColorPalette from '../../../config/ColorPalette';
import { Typography } from '../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../MainComponents/Typography/Typography.types';
import { styles } from './SupportChoiceModal.styles';
import { SupportChoiceModalProps } from './SupportChoiceModal.types';
import { navigate } from '../../../utils/navigationref';
import { showToast } from '../../MainComponents/Toast/ToastHelper';
import { ToastMessages } from '../../MainComponents/Toast/ToastMessages';

const FaqIcon = ({ size = 24, color = 'white', style }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}>
      {/* Circle */}
      <Path
        d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
        stroke={color}
        strokeWidth={2}
      />

      {/* Question Mark */}
      <Path
        d="M9.5 9.5C9.5 8.12 10.62 7 12 7C13.38 7 14.5 8.12 14.5 9.5C14.5 10.5 13.9 11.2 13.1 11.7C12.4 12.1 12 12.5 12 13.5V14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dot */}
      <Path
        d="M12 17H12.01"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const WhatsAppIcon = ({ size = 24, color = '#25D366' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill={color}
        d="M12 2C6.477 2 2 6.477 2 12c0 1.93.55 3.82 1.59 5.45L2 22l4.7-1.55A9.95 9.95 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.93 7.93 0 01-4.08-1.12l-.29-.17-2.79.92.93-2.72-.19-.3A7.92 7.92 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.43-5.34c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-.99-.37-1.9-1.18-.7-.62-1.17-1.39-1.31-1.63-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28z"
      />
    </Svg>
  );
};

const EmailIcon = ({ size = 24, color = ColorPalette.HOME_BLUE }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
      fill={color}
    />
  </Svg>
);

const GlobeIcon = ({ size = 24, color = ColorPalette.HOME_BLUE }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z"
      fill={color}
    />
  </Svg>
);

export const SupportChoiceModal: React.FC<SupportChoiceModalProps> = ({
  isVisible,
  onClose,
  whatsappNumber,
  supportEmail,
  contactUsUrl,
}) => {
  const handleFaq = () => {
    navigate('MainScreens', {
      screen: 'Account',
      params: { screen: 'HelpSupport' },
    });
    onClose();
  };

  const handleWhatsApp = () => {
    // Hardcoded static WhatsApp number as requested
    const staticWhatsApp = '+35679650714';
    const sanitizedNumber = staticWhatsApp.replace(/[^\d+]/g, '');

    const url = `whatsapp://send?phone=${sanitizedNumber}`;
    const fallbackUrl = `https://wa.me/${sanitizedNumber.replace('+', '')}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          return Linking.openURL(fallbackUrl);
        }
      })
      .catch(err => {
        console.error('An error occurred', err);
        showToast(
          ToastMessages.SupportChoiceModal.whatsappNotInstalled,
          'error',
        );
      })
      .finally(() => {
        onClose();
      });
  };

  const handleEmail = () => {
    // Hardcoded static Email as requested
    const staticEmail = 'info@surf.mt';
    const url = `mailto:${staticEmail}`;

    Linking.openURL(url)
      .catch(err => {
        console.error('An error occurred', err);
        showToast(ToastMessages.SupportChoiceModal.couldNotOpenMailApp, 'error');
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <RNModal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: ColorPalette.OPACITY_24,
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={e => e.stopPropagation()}>
            <View style={styles.header}>
              <Typography
                variant={TypographyVariant.H5_BOLD}
                text="Help & Support"
                customTextStyles={styles.title}
              />
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                accessibilityLabel="Close modal">
                <CloseIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              {/* <TouchableOpacity style={styles.optionButton} onPress={handleFaq}>
                <View
                  style={[
                    styles.optionIcon,
                    {backgroundColor: ColorPalette.GREEN_10},
                  ]}>
                  <FaqIcon style={undefined} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Typography
                    variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                    text="FAQs"
                    customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
                  />
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text="Find quick answers to common questions"
                    customTextStyles={{color: ColorPalette.TEXT_GREY_300}}
                  />
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleWhatsApp}>
                <View
                  style={[
                    styles.optionIcon,
                    { backgroundColor: ColorPalette.GREEN_10 },
                  ]}>
                  <WhatsAppIcon />
                </View>
                <View style={styles.optionTextContainer}>
                  <Typography
                    variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                    text="WhatsApp"
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                  />
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text="Chat with us on WhatsApp"
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleEmail}>
                <View
                  style={[
                    styles.optionIcon,
                    { backgroundColor: ColorPalette.PURPLE_10 },
                  ]}>
                  <EmailIcon color="#9010CF" />
                </View>
                <View style={styles.optionTextContainer}>
                  <Typography
                    variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                    text="Email"
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                  />
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text="Send us an email"
                    customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
                  />
                </View>
              </TouchableOpacity>

              {contactUsUrl && (
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => {
                    navigate('WebViewScreen' as any, {
                      url: contactUsUrl,
                      title: 'Contact Us',
                    });
                    onClose();
                  }}>
                  <View
                    style={[
                      styles.optionIcon,
                      { backgroundColor: 'rgba(0, 122, 255, 0.1)' },
                    ]}>
                    <GlobeIcon color="#007AFF" />
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Typography
                      variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                      text="Contact via Website"
                      customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
                    />
                    <Typography
                      variant={TypographyVariant.PXSMALL_REGULAR}
                      text="Visit our support page"
                      customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </RNModal>
  );
};
