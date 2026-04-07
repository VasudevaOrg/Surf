import { StyleSheet } from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import { Spacing } from '../../../../config/globalStyles';

export const styles = StyleSheet.create({
  gridItem: {
    width: '30%', // Roughly 1/3 minus spacing
    aspectRatio: 1, // Square
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    alignItems: 'center',
    justifyContent: 'center',
    // gap: getScreenHeight(1), // Gap not needed on container if content handles it, but ok here too.
  },
  gridItemContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Medium,
  },
  iconWrapper: {
    width: getScreenWidth(12),
    height: getScreenWidth(12),
    borderRadius: getScreenWidth(6),
    backgroundColor: ColorPalette.Background_Light_Grey || '#F8F9FA', // Need a light fill
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: ColorPalette.TEXT_GREY_300,
    marginTop: getScreenHeight(1),
    textAlign: 'center',
  },
});
