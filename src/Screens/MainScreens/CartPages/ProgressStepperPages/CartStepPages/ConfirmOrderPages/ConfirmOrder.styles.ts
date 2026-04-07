import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../../../config/ColorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {Spacing} from '../../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: ColorPalette.WelcomeBack,
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
  },
  scrollContent: {
    gap: getScreenHeight(1.5),
  },

  imageContainer: {
    width: getScreenHeight(5),
    height: getScreenHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: ColorPalette.GREEN_00,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    borderRadius: Spacing.Small,
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(2),
  },
  deliveryContainerTwo: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: ColorPalette.YELLOW_00,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    borderRadius: Spacing.Small,
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(2),
  },
  bestSellerContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenWidth(4),
  },
  horizontalListContainer: {
    gap: getScreenWidth(3),
  },
  billDetailsContainer: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    padding: getScreenWidth(4),
    gap: getScreenHeight(1.5),
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
});
