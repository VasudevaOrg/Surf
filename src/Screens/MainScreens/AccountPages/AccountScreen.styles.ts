import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { Spacing } from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenHeight(2),
    backgroundColor: ColorPalette.WelcomeBack,
  },
  scrollContent: {
    gap: getScreenHeight(2),
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: ColorPalette.WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getScreenWidth(3),
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    borderRadius: Spacing.Small,
    borderColor: ColorPalette.BACKGROUND_GREY_400,
    borderWidth: 0.2,
  },
  imageContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: getScreenHeight(0.6),
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 0.2,
    borderRadius: Spacing.Small,
    borderColor: ColorPalette.BACKGROUND_GREY_400,
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenHeight(0),
    overflow: 'hidden',
    paddingVertical: getScreenHeight(1)
  },
  menuIconContainer: {
    width: getScreenWidth(10),
    height: getScreenWidth(10),
    borderRadius: getScreenWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
