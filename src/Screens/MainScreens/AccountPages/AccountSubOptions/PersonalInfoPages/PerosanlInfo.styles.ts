import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../helpers/screenSize';
import ColorPalette from '../../../../../config/ColorPalette';
import {Spacing, BorderRadius} from '../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    // Using Spacing enum for consistent padding
    // paddingHorizontal: getScreenHeight(2),
    // paddingVertical: getScreenHeight(1),
    // marginTop: getScreenHeight(2),
  },
  scrollContent: {
    gap: Spacing.Small,
  },
  mainContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.Medium,
    paddingVertical: getScreenHeight(2),
    // backgroundColor: ColorPalette.WHITE,
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.WHITE,
    paddingVertical: getScreenHeight(1),
  },
  inputBorder: {
    borderColor: ColorPalette.TEXT_GREY_400,
    borderWidth: 1,
    borderRadius: BorderRadius.XSmall,
  },
  deleteContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: Spacing.Small,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenWidth(3),
    backgroundColor: ColorPalette.WHITE,
    marginHorizontal: getScreenWidth(4),
    marginVertical: getScreenHeight(1),
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: getScreenWidth(6),
    height: getScreenHeight(3),
    borderRadius: Spacing.XSmall,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: getScreenHeight(1),
    borderRadius: BorderRadius.Small,
  },
});
