import { StyleSheet } from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import { Spacing } from '../../../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';

/**
 * Creates styles for the BestSellerCard component with responsive measurements
 * and consistent design elements.
 *
 * @returns {Object} StyleSheet object containing all styles for BestSellerCard
 */
export const createBestSellerCardStyles = () => {
  return StyleSheet.create({
    container: {
      width: getScreenWidth(30),
      borderRadius: Spacing.Small,
      backgroundColor: ColorPalette.WHITE,
      overflow: 'hidden',
    },
    touchableContainer: {
      flex: 1,
      gap: getScreenWidth(2),
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: getScreenHeight(15),
      backgroundColor: ColorPalette.WelcomeBack,
      borderRadius: Spacing.Small,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    heartIconContainer: {
      position: 'absolute',
      top: 8,
      right: 8,
      padding: getScreenWidth(1.5),
      borderRadius: Spacing.XXXLarge,
      backgroundColor: ColorPalette.WHITE,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: getScreenWidth(1.5),
    },
    priceRatingContainer: {
      flexDirection: 'row',
      gap: getScreenWidth(1),
      alignItems: 'center',
    },
    // ratingContainer: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   paddingHorizontal: getScreenWidth(1.5),
    //   gap: getScreenWidth(0.5),
    // },
    buttonContainer: {
      width: '100%',
      marginTop: getScreenHeight(0.6),
    },
    customButton: {
      borderColor: ColorPalette.ROSE_PURPLE_300,
      borderWidth: 1,
      borderRadius: getScreenWidth(3.5),
      height: getScreenHeight(4),
    },
    customText: {
      color: ColorPalette.ROSE_PURPLE_300,
    },
    ratingContainer: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: getScreenWidth(1),
      paddingHorizontal: getScreenWidth(2),
      paddingVertical: getScreenHeight(0.5),
      backgroundColor: ColorPalette.WHITE,
      borderRadius: Spacing.XXSmall,
    },
    quantitySelectorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: ColorPalette.ROSE_PURPLE_300,
      borderWidth: 1,
      borderColor: ColorPalette.ROSE_PURPLE_300,
      borderRadius: getScreenWidth(3.5),
      height: getScreenHeight(4),
      paddingHorizontal: getScreenWidth(3.5),
      color: ColorPalette.WHITE,
    },
    quantityButton: {
      padding: getScreenWidth(1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityText: {
      color: ColorPalette.WHITE,
      minWidth: getScreenWidth(5),
      textAlign: 'center',
    },
  });
};
