import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { Spacing } from '../../../config/globalStyles';

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
  slidingBarsContainer: {
    // marginTop: getScreenHeight(16),
    padding: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
  },
  categoryContainer: {
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenHeight(1.5),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
  },
  footerContainer: {
    paddingVertical: getScreenHeight(18),
    paddingHorizontal: Spacing.Medium,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: Spacing.Medium,
    backgroundColor: ColorPalette.Cart_BG,
  },
  footerLine: {
    width: '100%',
    height: 1,
    backgroundColor: ColorPalette.BACKGROUND_GREY_100,
  },
  footerText: {
    color: ColorPalette.BACKGROUND_GREY_200,
    textAlign: 'left',
  },
  headerCustom: {
    backgroundColor: ColorPalette.HOME_BLUE,
    paddingTop: getScreenHeight(2),
  },
  searchContainer: {
    // padding: getScreenWidth(4),
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenWidth(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.HOME_BLUE,
    paddingBottom: getScreenHeight(1.7),
  },
  searchBoxCustom: {
    // marginVertical: getScreenHeight(4),
    borderRadius: Spacing.XSmall,
  },
  inputCustom: {
    color: ColorPalette.TEXT_GREY_300,
    // fontSize: 14,
    paddingTop: getScreenHeight(0.8)
  },
  micIconContainer: {
    position: 'absolute',
    right: getScreenWidth(7),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getScreenHeight(0.8),
  },
  dividerContainer: {
    position: 'absolute',
    right: getScreenWidth(15),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: getScreenHeight(3.5),
    width: getScreenWidth(0.5),
    backgroundColor: ColorPalette.BACKGROUND_GREY_100,
    marginBottom: getScreenHeight(0.8),
  },
});
