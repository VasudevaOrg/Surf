import { StyleSheet } from 'react-native';
import ColorPalette from '../../../../../config/ColorPalette';
import { BorderRadius, Spacing } from '../../../../../config/globalStyles';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: getScreenHeight(2.5),
    marginBottom: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
  },
  firstContainer: {
    display: 'flex',
    flexDirection: 'column',
    // paddingVertical: getScreenHeight(2),
    // paddingHorizontal: getScreenHeight(3),
    // gap: getScreenHeight(3),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,

    padding: getScreenWidth(4.3),
    gap: getScreenHeight(2),
    width: "100%",
    borderWidth: 1.5,
    borderColor: ColorPalette.BACKGROUND_GREY_100,
    paddingBottom: getScreenHeight(0.3)
  },
  paymentText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  safePaymentContainer: {
    flexDirection: 'row',
    gap: getScreenWidth(1),
    alignItems: 'center',
    maxWidth: '40%',
  },
  radioContainer: {
    display: 'flex',
    // gap: getScreenHeight(2),
  },
  secondContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    padding: getScreenWidth(4.3),
    gap: getScreenHeight(0.5),
    width: "100%",
    borderWidth: 1.5,
    borderColor: ColorPalette.BACKGROUND_GREY_100,
    paddingBottom: getScreenHeight(3)
  },
  rowInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: getScreenWidth(3)
  },
  halfWidthInput: {
    flex: 1,
    // paddingHorizontal: getScreenWidth(4),
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getScreenWidth(4),
    marginTop: getScreenHeight(1),
    gap: getScreenWidth(2),
  },
  uncheckedBox: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: ColorPalette.ROSE_PURPLE_300,
  },
  billDetailsContainer: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    padding: getScreenWidth(4.3),
    gap: getScreenHeight(0.5),
    width: "100%",
    borderWidth: 1.5,
    borderColor: ColorPalette.BACKGROUND_GREY_100,
    paddingBottom: getScreenHeight(0.3)
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(0.3),
    marginTop: getScreenHeight(0.5)
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getScreenHeight(1.8),
  },
  divider: {
    height: 1,
    backgroundColor: ColorPalette.BACKGROUND_GREY_100,
    marginVertical: getScreenHeight(0.5),
  },
  continueIndicator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(2),
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.ORANGE_08,
    borderRadius: Spacing.Small,
  },
  trustIndicator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(3),
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.GREEN_08,
    borderRadius: Spacing.Small,
  },
  paymentLabelContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: getScreenHeight(0.2),
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getScreenHeight(1.8),
    paddingHorizontal: getScreenWidth(3),
    borderRadius: Spacing.Small,
    borderWidth: 1.5,
    borderColor: ColorPalette.BACKGROUND_GREY_100,
    gap: getScreenWidth(3),
  },

  selectedPaymentRow: {
    borderColor: ColorPalette.ROSE_PURPLE_300,
    backgroundColor: ColorPalette.ROSE_PURPLE_08,
  },

  iconContainer: {
    height: getScreenHeight(4.8),
    width: getScreenHeight(4.8),
    borderRadius: Spacing.Large,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
  },

  greyIcon: {
    backgroundColor: ColorPalette.BACKGROUND_GREY_100,
  },

  radioCircle: {
    height: getScreenHeight(2.8),
    width: getScreenHeight(2.8),
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: ColorPalette.BACKGROUND_GREY_200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioCircleSelected: {
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
    borderColor: ColorPalette.ROSE_PURPLE_300,
  },

  paymentRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.Medium,
    borderRadius: BorderRadius.Medium,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: ColorPalette.BACKGROUND_GREY_50,
    marginBottom: Spacing.Medium,
  },

  paymentRowContainerSelected: {
    borderColor: ColorPalette.PURPLE_200,
    backgroundColor: ColorPalette.PURPLE_50,
  },

  paymentIconContainer: {
    width: getScreenWidth(11.5),
    height: getScreenHeight(5.5),
    borderRadius: BorderRadius.Small,
    backgroundColor: ColorPalette.WHITE,
    borderColor: ColorPalette.BORDER_GREY_200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  paymentIconContainerSelected: {
    backgroundColor: ColorPalette.HOME_BLUE,
    borderWidth: 0,
  },

  paymentTextContainer: {
    flex: 1,
    marginLeft: Spacing.Medium,
  },

  paymentDescriptionText: {
    marginTop: getScreenHeight(0.5),
    color: ColorPalette.TEXT_GREY_100
  },

  paymentUnselectedCircle: {
    width: getScreenWidth(6.3),
    height: getScreenHeight(3),
    borderRadius: BorderRadius.Full,
    borderWidth: 1.5,
    borderColor: ColorPalette.TEXT_GREY_50,
  },
  subTypesContainer: {
    marginTop: -getScreenHeight(0.5),
    marginBottom: getScreenHeight(1),
    marginHorizontal: getScreenWidth(1),
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
    backgroundColor: ColorPalette.ROSE_PURPLE_08 || '#FAF5F5',
    borderRadius: BorderRadius.Small,
    borderWidth: 1,
    borderColor: ColorPalette.BACKGROUND_GREY_100,
    gap: getScreenHeight(1),
  },
  subTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getScreenHeight(1),
    gap: getScreenWidth(3),
  },
  subTypeRadioCircle: {
    width: getScreenWidth(5),
    height: getScreenWidth(5),
    borderRadius: BorderRadius.Full,
    borderWidth: 1.5,
    borderColor: ColorPalette.TEXT_GREY_300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTypeRadioCircleSelected: {
    borderColor: ColorPalette.ROSE_PURPLE_300,
  },
  subTypeRadioInner: {
    width: getScreenWidth(2.6),
    height: getScreenWidth(2.6),
    borderRadius: BorderRadius.Full,
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
  },
});
