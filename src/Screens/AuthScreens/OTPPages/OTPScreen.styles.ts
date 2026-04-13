import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { BorderRadius, Spacing } from '../../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.WHITE,
  },
  bannerContainer: {
    padding: Spacing.Large,
    paddingTop: Spacing.Medium,
    marginBottom: Spacing.XLarge,
    alignSelf: 'flex-start',
  },
  mainTwoContainer: {
    gap: getScreenWidth(3),
    marginTop: Spacing.Large,
  },
  mainContainerTwo: {
    paddingHorizontal: Spacing.Large,
    paddingVertical: getScreenHeight(2),
  },

  contentWrapper: {
    gap: getScreenWidth(1),
  },
  containerTwo: {
    flexDirection: 'row',
    gap: getScreenWidth(2),
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    // gap: getScreenWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    paddingLeft: Spacing.Large,
    color: ColorPalette.TEXT_GREY_500,
  },
  subCaption: {
    paddingLeft: Spacing.Large,
    color: ColorPalette.TEXT_GREY_300,
  },
  subCaptionTwo: {
    color: ColorPalette.TEXT_GREY_500,
    paddingVertical: 0.1,
  },

  // OTP Input Styles
  otpContainer: {
    marginTop: Spacing.XXLarge,
    paddingHorizontal: Spacing.Large,
  },
  otpInputContainer: {
    width: '100%',
    gap: getScreenWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBox: {
    borderWidth: 1.5,
    borderRadius: BorderRadius.Medium,
    borderColor: ColorPalette.BACKGROUND_GREY_100,
    backgroundColor: ColorPalette.WHITE,
    height: getScreenHeight(8),
    width: getScreenWidth(15),
  },
  otpBoxFocused: {
    borderColor: ColorPalette.TEXT_GREY_400,
    borderWidth: 2,
    shadowColor: 'rgba(237, 219, 251, 0.80)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 6,
  },
  otpBoxFilled: {
    borderColor: ColorPalette.TEXT_GREY_400,
    borderWidth: 1.5,
    backgroundColor: ColorPalette.White,
  },

  iconContainer: {
    padding: Spacing.Small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBite: {
    alignSelf: 'center',
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: Spacing.Large,
    marginBottom: Spacing.Medium,
  },
  caption: {
    color: ColorPalette.TEXT_GREY_300,
    textAlign: 'center',
    paddingVertical: 0.5,
  },
  linkText: {
    color: ColorPalette.BLUE_CUSTOM,
    textDecorationLine: 'underline',
    paddingVertical: 0.5,
  },
  resendContainer: {
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.Medium,
    paddingHorizontal: Spacing.Large,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(1),
  },
  resendTimer: {
    marginTop: Spacing.XXSmall,
    color: ColorPalette.TEXT_GREY_300,
    fontSize: 12,
  },
});
