import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {Spacing} from '../../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getScreenWidth(8),
    minHeight: getScreenHeight(50),
  },
  illustration: {
    width: getScreenWidth(40),
    height: getScreenWidth(40),
    resizeMode: 'contain',
    marginBottom: getScreenHeight(1.5),
  },
  title: {
    color: ColorPalette.TEXT_GREY_500,
    textAlign: 'center',
    marginBottom: getScreenHeight(1),
  },
  message: {
    color: ColorPalette.TEXT_GREY_100,
    textAlign: 'center',
    marginBottom: getScreenHeight(3),
    lineHeight: 18,
  },
  retryButton: {
    paddingHorizontal: getScreenWidth(8),
    height: getScreenHeight(6),
    borderRadius: Spacing.XSmall,
  },
});
