import {StyleSheet} from 'react-native';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import ColorPalette from '../../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
    backgroundColor: ColorPalette.WHITE,
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.XXSmall,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.XSmall,
  },
  leftIconsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.XSmall,
    marginRight: Spacing.XSmall,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.XSmall,
  },
  mainImage: {
    width: getScreenWidth(8),
    height: getScreenWidth(8),
  },
  iconButton: {
    padding: Spacing.XXSmall,
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: Spacing.XSmall,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.Zero,
  },
  leftIconContainer: {
    paddingVertical: getScreenHeight(0.5),
    paddingHorizontal: getScreenWidth(1),
  },
  rightIconContainer: {
    paddingVertical: getScreenHeight(0.5),
    paddingHorizontal: getScreenWidth(1),
  },
});
