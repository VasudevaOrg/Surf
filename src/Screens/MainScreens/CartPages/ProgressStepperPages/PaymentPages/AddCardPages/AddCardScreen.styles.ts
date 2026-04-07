import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../../../config/ColorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {BorderRadius, Spacing} from '../../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: ColorPalette.WelcomeBack,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
  },
  scrollContent: {
    flexGrow: 1,
    gap: getScreenHeight(2),
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Small,
    padding: getScreenHeight(2),
    gap: getScreenHeight(2.5),
  },
  visaIconContainer: {
    borderWidth: 1,
    borderColor: ColorPalette.BACKGROUND_GREY_200,
    borderRadius: BorderRadius.XXSmall,
    padding: Spacing.XXSmall,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.Small,
    paddingTop: Spacing.Small,
    justifyContent: 'flex-start',
    paddingHorizontal: Spacing.Small,
  },
  checkboxContainer: {
    width: getScreenWidth(5),
    height: getScreenWidth(5),
    borderRadius: BorderRadius.XXSmall,
    borderWidth: 1,
    borderColor: ColorPalette.TEXT_GREY_00,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.WHITE,
  },
  checkboxText: {
    flex: 1,
  },
  customButton: {
    width: '100%',
    paddingVertical: getScreenHeight(1.5),
    borderRadius: BorderRadius.Large,
  },
  footerContainer: {
    backgroundColor: ColorPalette.WHITE,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
  },
});
