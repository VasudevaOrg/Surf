import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { Spacing } from '../../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
  },
  bottomBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: ColorPalette.BACKGROUND_GREY_200,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.XSmall,
  },
  leftIconContainer: {
    paddingVertical: getScreenHeight(0.5),
    paddingHorizontal: getScreenWidth(2),
  },
  rightIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: ColorPalette.TEXT_GREY_500,
  },
  subtitleText: {
    color: ColorPalette.TEXT_GREY_200,
    paddingVertical: getScreenHeight(0.2)
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: getScreenWidth(6),
    height: getScreenHeight(3),
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: Spacing.XXXLarge,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
