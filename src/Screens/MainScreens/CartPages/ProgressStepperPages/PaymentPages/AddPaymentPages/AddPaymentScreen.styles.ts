import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../../../config/ColorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {BorderRadius} from '../../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: ColorPalette.WelcomeBack,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
  },
  scrollContent: {
    flexGrow: 1,
    gap: getScreenHeight(2),
  },
  PaymentCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Small,
    padding: getScreenHeight(2),
    gap: getScreenHeight(1.5),
  },
  paymentLabelContainer: {
    flex: 1,
    paddingRight: getScreenWidth(1),
  },
});
