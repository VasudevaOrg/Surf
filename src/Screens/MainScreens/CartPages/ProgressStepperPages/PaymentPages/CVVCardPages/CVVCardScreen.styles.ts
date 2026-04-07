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
  deductNotice: {
    backgroundColor: ColorPalette.ARE_BG,
    borderRadius: BorderRadius.Small,
    padding: getScreenHeight(2),
  },
  otpContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: getScreenWidth(5),
    marginTop: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(3),
  },
  otpInputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
