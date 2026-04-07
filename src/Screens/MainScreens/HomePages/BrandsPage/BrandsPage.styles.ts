import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {BorderRadius, Spacing} from '../../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';

const calculateWidthPercentage = (x: number) => getScreenWidth((x / 393) * 100);

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ColorPalette.WelcomeBack,
    paddingHorizontal: getScreenWidth(4),
  },
  searchContainer: {
    flexDirection: 'row',
    padding: getScreenWidth(4),
    alignItems: 'center',
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenWidth(4),
  },
  searchBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingRight: getScreenWidth(10),
  },
  micIconContainer: {
    position: 'absolute',
    right: getScreenWidth(2),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slidingBarsContainer: {
    backgroundColor: ColorPalette.WHITE,
    paddingBottom: getScreenHeight(1),
    paddingHorizontal: getScreenWidth(4),
  },
  scrollContent: {
    // paddingTop: getScreenHeight(2),
    gap: getScreenHeight(2),
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Small,
  },
  brandCard: {
    width: (getScreenWidth(100) - getScreenWidth(12)) / 3, // account for padding and gap
    marginBottom: Spacing.Medium,
    alignItems: 'center',
  },
  brandImageContainer: {
    width: '100%',
    aspectRatio: 1.35,
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: Spacing.Medium,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: getScreenWidth(2),
    marginBottom: Spacing.XSmall,
  },
  brandImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  brandName: {
    textAlign: 'center',
    color: ColorPalette.TEXT_GREY_500,
    fontSize: 12,
  },
  brandSubName: {
    textAlign: 'center',
    color: ColorPalette.TEXT_GREY_100,
  },
});
