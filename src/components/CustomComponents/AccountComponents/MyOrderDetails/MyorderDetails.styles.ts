import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {BorderRadius, Spacing} from '../../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenHeight(2),
    backgroundColor: ColorPalette.WelcomeBack,
  },
  scrollContent: {
    gap: getScreenHeight(1.2),
  },
  productCardContainer: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Small,
    padding: getScreenWidth(4),
  },
  imageContainer: {
    width: getScreenWidth(25.5),
    height: getScreenHeight(10.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: BorderRadius.Small,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: getScreenHeight(0.2),
    justifyContent: 'space-between',
  },
  textContainer: {
    gap: getScreenHeight(0.5),
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(2),
  },
  radioButton: {
    width: getScreenWidth(5),
    height: getScreenWidth(5),
    borderRadius: getScreenWidth(2.5),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: getScreenWidth(2.5),
    height: getScreenWidth(2.5),
    borderRadius: getScreenWidth(1.25),
  },
  billDetailsContainer: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Small,
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
  footerContainer: {
    padding: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    borderTopWidth: 1,
    borderTopColor: ColorPalette.Gray_100 || '#E0E0E0',
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Small,
    padding: getScreenWidth(4),
    gap: getScreenWidth(2),
  },
  starIconWrapper: {
    backgroundColor: ColorPalette.TIMER_BADGE,
    padding: getScreenWidth(1.5),
    borderRadius: Spacing.XSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    flex: 1,
  },
  ratingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(1),
    flex: 1,
    flexShrink: 1,
  },
  deliveryDetailsContainer: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Small,
    padding: getScreenWidth(4),
    gap: getScreenHeight(1.5),
  },
  deliveryRow: {
    flexDirection: 'column',
    gap: getScreenHeight(1.5),
  },
  deliverySubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
