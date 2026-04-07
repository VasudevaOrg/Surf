import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../../config/ColorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import {Spacing} from '../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: getScreenHeight(2.5),
    marginBottom: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
  },
  deliveryContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: ColorPalette.SUMMARY_BG,
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    borderRadius: Spacing.Medium,
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(2),
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenHeight(0.5),
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    borderRadius: Spacing.Small,
  },
  paymentContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenHeight(1.5),
    borderRadius: Spacing.Small,
    padding: getScreenWidth(4.3),
    width: '100%',
    borderWidth: 2.5,
    borderColor: ColorPalette.SUMMARY_BORDER,
  },
  billDetailsContainer: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    padding: getScreenWidth(4.3),
    gap: getScreenHeight(0.5),
    width: '100%',
    borderWidth: 2.5,
    borderColor: ColorPalette.SUMMARY_BORDER,
    paddingBottom: getScreenHeight(0.3),
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(0.5),
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getScreenHeight(1.5),
  },
  divider: {
    height: 1,
    backgroundColor: ColorPalette.WelcomeBack,
    marginVertical: getScreenHeight(0.5),
  },
  trustIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(2),
    // paddingVertical: getScreenHeight(2),
    // paddingHorizontal: getScreenWidth(4),
    // backgroundColor: ColorPalette.GREEN_08,
    // borderRadius: Spacing.Large,
  },
  infoContainer: {
    gap: getScreenHeight(1),
    marginLeft: getScreenWidth(6),
  },
  value: {
    color: ColorPalette.TEXT_GREY_100,
    flex: 1,
    // textAlign: 'right',
  },
  summaryItemContainer: {
    borderRadius: Spacing.Small,
    backgroundColor: ColorPalette.WHITE,
    overflow: 'hidden',
    width: '100%',
    borderWidth: 1.5,
    borderColor: ColorPalette.SUMMARY_BG,
    paddingHorizontal: getScreenWidth(1),
    paddingVertical: getScreenHeight(2),
    paddingBottom: getScreenHeight(0.4),
  },
});
