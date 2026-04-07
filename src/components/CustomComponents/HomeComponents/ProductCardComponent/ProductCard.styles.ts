import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {Spacing} from '../../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.XSmall,
    backgroundColor: ColorPalette.WHITE,
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: ColorPalette.WelcomeBack,
  },
  touchableContainer: {
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: getScreenHeight(21.5),
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: Spacing.Small,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: Spacing.Small,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: getScreenWidth(1.5),
    borderRadius: Spacing.XXXLarge,
    backgroundColor: ColorPalette.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: ColorPalette.BLACK,
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 9,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(1.5),
    paddingBottom: getScreenHeight(1),
    paddingTop: getScreenHeight(1),
    gap: getScreenWidth(1.5),
  },
  firstContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(1),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: getScreenWidth(1),
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(0.6),
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1),
    paddingHorizontal: getScreenWidth(2),
    paddingVertical: getScreenHeight(0.5),
    backgroundColor: ColorPalette.WHITE,
    shadowColor: ColorPalette.BLACK,
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 9,
    borderRadius: Spacing.XXSmall,
  },
  ratingBadge: {
    backgroundColor: ColorPalette.GREEN_300,
  },
  customButton: {
    borderColor: ColorPalette.ROSE_PURPLE_300,
    borderWidth: 1,
    borderRadius: getScreenWidth(3.5),
    height: getScreenHeight(4),
  },
  customText: {
    color: ColorPalette.ROSE_PURPLE_300,
  },
  quantitySelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
    borderWidth: 1,
    borderColor: ColorPalette.ROSE_PURPLE_300,
    borderRadius: getScreenWidth(3.5),
    height: getScreenHeight(4),
    paddingHorizontal: getScreenWidth(3.5),
  },
  quantityButton: {
    padding: getScreenWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: ColorPalette.WHITE,
    minWidth: getScreenWidth(5),
    textAlign: 'center',
  },
});
