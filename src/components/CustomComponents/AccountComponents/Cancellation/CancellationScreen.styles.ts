import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {BorderRadius, Spacing} from '../../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ColorPalette.WelcomeBack,
    paddingHorizontal: getScreenWidth(4),
  },
  scrollContent: {
    paddingVertical: getScreenHeight(2),
    gap: getScreenHeight(2),
  },
  productCard: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Small,
    padding: getScreenWidth(4),
  },
  productRow: {
    flexDirection: 'row',
    gap: getScreenWidth(4),
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: getScreenWidth(20),
    height: getScreenWidth(20),
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: BorderRadius.Small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
    height: getScreenWidth(20),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(2),
    marginTop: getScreenHeight(0.5),
  },
  dateText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  sectionContainer: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Small,
    padding: getScreenWidth(4),
    gap: getScreenHeight(2),
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(3),
    marginBottom: getScreenHeight(1.5),
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ColorPalette.BACKGROUND_GREY_200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: ColorPalette.ROSE_PURPLE_300,
    borderWidth: 1.5,
  },
  input: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Small,
    padding: getScreenWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.WelcomeBack,
    minHeight: getScreenHeight(5),
    textAlignVertical: 'top',
  },
  warningBanner: {
    backgroundColor: ColorPalette.ARE_BG,
    padding: getScreenWidth(4),
    borderRadius: BorderRadius.Small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getScreenHeight(1), // Reduced margin
    marginHorizontal: getScreenWidth(4), // Add horizontal margin
  },
  footer: {
    paddingVertical: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE, // Ensure distinct background
    borderTopWidth: 1,
    borderTopColor: ColorPalette.Gray_100 || '#E0E0E0',
    paddingHorizontal: getScreenWidth(4),
  },
});
