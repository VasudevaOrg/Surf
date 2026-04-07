import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../../../config/ColorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {BorderRadius, Spacing} from '../../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenHeight(2),
    backgroundColor: ColorPalette.WelcomeBack,
  },
  scrollContent: {
    gap: getScreenHeight(2),
  },
  momentContainer: {
    padding: getScreenHeight(2),
    backgroundColor: ColorPalette.TRUST_INDICATOR,
    borderRadius: BorderRadius.Small,
  },
  bottomSection: {
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
  },
  ratingCard: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Medium,
    padding: getScreenHeight(2),
    marginTop: getScreenHeight(2),
  },
  productRow: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
  },
  productImage: {
    width: getScreenWidth(28),
    height: getScreenWidth(28),
    borderRadius: BorderRadius.Small,
    backgroundColor: ColorPalette.WelcomeBack,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getScreenHeight(1),
  },
  starWrapper: {
    alignItems: 'center',
    gap: Spacing.XSmall,
  },
});
