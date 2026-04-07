import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { BorderRadius, Spacing } from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ColorPalette.WelcomeBack,
  },
  scrollContent: {
    flexGrow: 1,
    position: 'relative',
  },
  skipButton: {
    position: 'absolute',
    top: getScreenHeight(4),
    right: getScreenWidth(5),
    zIndex: 999,
    borderColor: ColorPalette.OPACITY_60,
    backgroundColor: ColorPalette.OPACITY_60,
    paddingHorizontal: getScreenWidth(6),
    paddingVertical: getScreenHeight(1.2),
    borderRadius: Spacing.XLarge,
  },
  skipText: {
    color: ColorPalette.TEXT_GREY_500,
  },
  itemContainer: {
    width: getScreenWidth(100),
    height: getScreenHeight(52),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    // width: getScreenWidth(100),
    // height: getScreenHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.WelcomeBack,
    // backgroundColor: 'black',
  },
  image: {
    width: getScreenWidth(100),
    height: getScreenHeight(90),
  },
  modalContainer: {
    height: getScreenHeight(48),
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
    zIndex: 1,
  },
  modalInnerContainer: {
    flex: 1,
    // backgroundColor: ColorPalette.WHITE,
    // borderTopLeftRadius: Spacing.XXXLarge,
    // borderTopRightRadius: Spacing.XXXLarge,
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(5),
    // shadowColor: 'rgba(145, 1, 207, 0.3)',
    // shadowOffset: {
    //   width: 0,
    //   height: -8,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 40,
    // elevation: 8,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: getScreenHeight(4),
    gap: Spacing.XLarge,
  },
  textContainer: {
    // alignItems: 'center',
    gap: Spacing.XXSmall,
    paddingHorizontal: getScreenWidth(2)
  },
  title: {
    color: ColorPalette.TEXT_GREY_300,
    // textAlign: 'center',
  },
  description: {
    // color: ColorPalette.TEXT_GREY_300,
    // textAlign: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: Spacing.SMALLXX,
    paddingLeft: getScreenWidth(2)
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  customButton: {
    width: getScreenWidth(90),
    height: getScreenHeight(7),
    paddingHorizontal: getScreenWidth(2.5),
    borderRadius: Spacing.Small,
  },
  customText: {
    color: ColorPalette.WHITE,
  },
});
