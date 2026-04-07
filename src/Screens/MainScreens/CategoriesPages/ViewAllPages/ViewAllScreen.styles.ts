import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import { Spacing } from '../../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: ColorPalette.WelcomeBack,
    paddingVertical: getScreenHeight(1),
  },
  scrollContent: {
    gap: getScreenHeight(2),
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
    gap: getScreenHeight(1.5),
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    gap: getScreenHeight(1.5),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(2),
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  badgeTwoContainer: {
    borderRadius: getScreenWidth(2),
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(3),
  },
  searchResultCards: {
    display: 'flex',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
  },
});
