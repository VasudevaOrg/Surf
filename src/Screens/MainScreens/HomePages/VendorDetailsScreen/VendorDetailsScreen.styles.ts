import { StyleSheet } from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import { Spacing } from '../../../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';

const HORIZONTAL_GAP = getScreenWidth(3); // ~12px

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: ColorPalette.WHITE,
    paddingVertical: getScreenHeight(2),
    // paddingHorizontal: getScreenWidth(4),
  },
  scrollContent: {
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorCardSection: {
    // ScrollView handles padding
    marginTop: getScreenHeight(-0.5)
  },
  productsSection: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small, // Match Spacing.Small but as literal or similar
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
  },
  productsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: getScreenWidth(4),
    gap: getScreenWidth(2),
    marginBottom: getScreenHeight(2),
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingHorizontal: getScreenWidth(4),
    justifyContent: 'space-between',
  },
  productCardWrapper: {
    width: (getScreenWidth(100) - getScreenWidth(9) - HORIZONTAL_GAP) / 2, // 16% accounts for ScrollView and Section padding
    marginBottom: getScreenHeight(2),
  },
});
