import { StyleSheet } from 'react-native';
import { Spacing } from '../../../config/globalStyles';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.Medium,
    backgroundColor: ColorPalette.WHITE,
  },
  successImage: {
    height: getScreenHeight(26),
    width: getScreenWidth(53),
    marginBottom: getScreenHeight(3),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: getScreenHeight(4),
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.XSmall,
    color: ColorPalette.TEXT_GREY_500,
  },
  buttonContainer: {
    width: '100%',
  },
  desc: {
    width: getScreenWidth(70),
    textAlign: 'center',
    color: ColorPalette.TEXT_GREY_300
  },
});
