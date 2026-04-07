import { StyleSheet } from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import { Spacing, BorderRadius } from '../../../../config/globalStyles';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: ColorPalette.OPACITY_50,
  },
  modalContent: {
    backgroundColor: ColorPalette.WHITE,
    borderTopLeftRadius: BorderRadius.Large,
    borderTopRightRadius: BorderRadius.Large,
    padding: getScreenWidth(5),
    maxHeight: getScreenHeight(80),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getScreenHeight(2),
  },
  ratingContainer: {
    alignItems: 'center',
    marginVertical: getScreenHeight(2),
  },
  starsRow: {
    flexDirection: 'row',
    gap: getScreenWidth(2),
    marginTop: getScreenHeight(1),
  },
  inputContainer: {
    marginVertical: getScreenHeight(2),
  },
  textArea: {
    minHeight: getScreenHeight(15),
    textAlignVertical: 'top',
  },
  uploadSection: {
    marginVertical: getScreenHeight(2),
    padding: getScreenWidth(4),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: ColorPalette.TEXT_GREY_100,
    borderRadius: BorderRadius.Small,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: getScreenWidth(2),
  },
  submitButton: {
    marginTop: getScreenHeight(2),
  },
});
