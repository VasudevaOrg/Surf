import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import {Spacing} from '../../../../config/globalStyles';

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
  searchContainer: {
    display: 'flex',
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
  questionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(1),
    paddingTop: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    overflow: 'hidden',
  },
  menuContainer: {},
});
