import { StyleSheet } from 'react-native';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import ColorPalette from '../../../config/ColorPalette';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(3),
    paddingBottom: getScreenHeight(0.8),
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // paddingVertical: getScreenHeight(1.6),
    // paddingTop: getScreenHeight(3),
  },
  leftSection: {
    display: 'flex',
    // flexDirection: 'column',
    flexDirection: 'row',
    // gap: getScreenHeight(0.5),
    gap: getScreenWidth(2),
    alignItems: 'center',
    // flex: 1,
    // paddingRight: getScreenWidth(2),
  },
  subLeftContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(2),
    alignItems: 'center',
    width: '100%',
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(3),
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.40)',
    paddingVertical: getScreenHeight(0.75),
    paddingHorizontal: getScreenHeight(0.8),
    borderRadius: 999,
    backgroundColor: ColorPalette.WHITE_10,
  },
});
