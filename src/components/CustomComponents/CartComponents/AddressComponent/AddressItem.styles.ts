import { StyleSheet } from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import { BorderRadius, Spacing } from '../../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenWidth(4.3),
    width: "100%",
    borderWidth: 1.5,
    borderColor: ColorPalette.BACKGROUND_GREY_100,
  },
  contentContainer: {
    // Removed as structure changed
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getScreenHeight(1.5),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: getScreenWidth(3),
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: getScreenWidth(1),
  },
  homeBadge: {
    paddingHorizontal: getScreenWidth(3),
    paddingVertical: getScreenHeight(1),
    borderRadius: Spacing.Large,
  },
  infoContainer: {
    gap: getScreenHeight(1),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: ColorPalette.TEXT_GREY_400,
    flex: 1,
  },
  value: {
    color: ColorPalette.TEXT_GREY_200,
    flex: 1,
    // textAlign: 'right',
  },
  radioButtonContainer: {
    width: getScreenWidth(6.5),
    height: getScreenHeight(3),
    borderRadius: BorderRadius.Full,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: ColorPalette.ROSE_PURPLE_500 || '#E91E63', // Assuming a pinkish color
  },
  selectedRadioButtonContainer: {
    borderColor: ColorPalette.ROSE_PURPLE_300,
  },
  radioButtonInner: {
        width: getScreenWidth(3.25),
    height: getScreenHeight(1.5),
    borderRadius: 6,
    backgroundColor: ColorPalette.ROSE_PURPLE_300,
  },
  // Removed unused text styles
  textContainer: {},
  nameText: {},
  addressText: {},
  phoneText: {},
});
