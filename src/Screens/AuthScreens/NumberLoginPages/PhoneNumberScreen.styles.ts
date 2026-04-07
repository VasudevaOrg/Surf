import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { BorderRadius, Spacing } from '../../../config/globalStyles';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ColorPalette.WHITE,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  skipContainer: {
    width: '100%',
    // paddingTop: getScreenHeight(5),
    paddingRight: getScreenWidth(4),
    alignItems: 'flex-end',
    zIndex: 10,
  },
  skipBadge: {
    position: 'absolute',
    left: getScreenWidth(26),
    top: getScreenHeight(4),
    backgroundColor: ColorPalette.OPACITY_60,
    borderRadius: Spacing.XLarge,
    borderColor: ColorPalette.OPACITY_60,
    paddingHorizontal: getScreenWidth(6),
    paddingVertical: getScreenHeight(1.2),
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    // flexGrow: 1,
    alignItems: 'center',
  },
  tagline: {
    color: ColorPalette.WHITE,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: ColorPalette.WHITE,
    flex: 1,
    // marginTop: getScreenHeight(-6)
  },
  contentPadding: {
    paddingHorizontal: getScreenWidth(14),
    marginBottom: getScreenHeight(1),
  },
  title: {
    textAlign: 'center',
    color: ColorPalette.TEXT_GREY_500,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: ColorPalette.BACKGROUND_GREY_200,
    marginHorizontal: getScreenWidth(4),
  },
  dividerText: {
    color: ColorPalette.TEXT_GREY_300,
  },
  mainContainerTwo: {
    marginTop: getScreenHeight(1),
  },
  caption: {
    color: ColorPalette.TEXT_GREY_300,
    textAlign: 'center',
  },
  linkText: {
    color: ColorPalette.BLUE_CUSTOM,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: getScreenHeight(2),
  },
  surfSplashImage: {
    height: getScreenHeight(15),
    width: getScreenWidth(36),
  },
  buttonContainer: {
    alignItems: 'center',
  },
  customButton: {
    width: getScreenWidth(90),
    height: getScreenHeight(7),
    paddingHorizontal: getScreenWidth(2.5),
    borderRadius: Spacing.Small,
    backgroundColor: ColorPalette.WHITE,
  },
  customText: {
    color: ColorPalette.WHITE,
    fontSize: 15
  },
  brandContainer: {
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: getScreenHeight(4),
    // paddingBottom: getScreenHeight(3),
    // gap: 8,
    height: '43%'
  },
  card: {
    width: getScreenWidth(26),
    height: getScreenHeight(12),
    borderRadius: BorderRadius.Large,
    // borderRadius: 22,
    backgroundColor: ColorPalette.BACKGROUND_GREY_50,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 12,
    marginRight: getScreenWidth(3.2),
  },
  fadeTop: {
    position: "absolute",
    top: 0,
    height: getScreenHeight(8),
    left: 0,
    right: 0,
    zIndex: 1
  },
  fadeBottom: {
    position: "absolute",
    bottom: 0,
    height: getScreenHeight(10),
    // height:100,
    left: 0,
    right: 0,
  },

  icon: {
    // width: 63,
    // height: 63,
    width: getScreenWidth(20),
    height: getScreenHeight(8)
  },
});
