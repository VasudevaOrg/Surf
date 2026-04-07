import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { Spacing } from '../../../config/globalStyles';

export const slidingBarStyles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: ColorPalette.WHITE,
  },
  scrollContent: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
  },
  option: {
    borderRadius: Spacing.XSmall,
    paddingVertical: getScreenHeight(1.25),
    paddingHorizontal: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.ButtonBackHome,
  },
  selectedOption: {
    backgroundColor: ColorPalette.MainHeading,
  },
  optionText: {
    color: ColorPalette.BLACK,
    paddingVertical: getScreenHeight(0.1),
  },
  selectedOptionText: {
    color: ColorPalette.WHITE,
  },
});
