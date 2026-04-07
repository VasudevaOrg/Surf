import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../../config/ColorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import {BorderRadius, Spacing} from '../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: getScreenWidth(4),
    backgroundColor: ColorPalette.WHITE,
    marginBottom: getScreenHeight(2),
  },
  sectionContainer: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenWidth(4.3),
    // gap: getScreenHeight(0.5),
    width: '100%',
    borderWidth: 1.5,
    borderColor: ColorPalette.BACKGROUND_GREY_100,
    paddingBottom: getScreenHeight(0.4),
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(0.3),
    marginTop: getScreenHeight(0.8),
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getScreenHeight(1.8),
  },
  divider: {
    height: 1,
    backgroundColor: ColorPalette.BACKGROUND_GREY_100,
    marginVertical: getScreenHeight(0.8),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getScreenHeight(1.5),
  },
  title: {
    color: ColorPalette.TEXT_GREY_200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(3),
    width: '100%',
    paddingBottom: getScreenHeight(2.5),
  },
  input: {
    flex: 1,
    height: getScreenHeight(6),

    backgroundColor: ColorPalette.ROSE_PURPLE_10_OPACITY,
    borderRadius: BorderRadius.Small,

    paddingHorizontal: getScreenWidth(4),

    fontSize: 14,
    color: ColorPalette.ROSE_PURPLE_70_OPACITY,
  },
});
