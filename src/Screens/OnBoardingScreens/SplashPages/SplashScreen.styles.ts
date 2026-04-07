import {StyleSheet} from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import {Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: Spacing.XSmall,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.WHITE,
  },
  footerContainer: {
    position: 'absolute',
    bottom: Spacing.XXLarge,
    alignItems: 'center',
  },
  surfSplashImage: {
    height: getScreenHeight(15),
    width: getScreenWidth(36),
  },
  footerText: {
    color: ColorPalette.TEXT_GREY_500,
  },
});
