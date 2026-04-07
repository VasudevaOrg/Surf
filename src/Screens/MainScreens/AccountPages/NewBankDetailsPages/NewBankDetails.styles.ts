import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import {Spacing} from '../../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.WelcomeBack,
  },
  scrollContent: {
    gap: getScreenHeight(2),
  },
  mainContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.Medium,
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
  },
  bottomSection: {
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
  },
});
