import { StyleSheet } from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import { BorderRadius, Spacing } from '../../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  vendorCard: {
    width: '100%',
    backgroundColor: ColorPalette.WHITE,
    borderRadius: BorderRadius.Medium,
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1),
    marginBottom: Spacing.Medium,
    gap: Spacing.Medium,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: getScreenHeight(15),
    borderRadius: BorderRadius.Small,
  },
  vendorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.Medium,
  },
  vendorLogoLarge: {
    width: getScreenWidth(20),
    height: getScreenWidth(20),
    borderRadius: BorderRadius.Small,
    backgroundColor: ColorPalette.WelcomeBack,
    borderWidth: 1,
    borderColor: ColorPalette.BACKGROUND_GREY_100,
  },
  vendorTextContainer: {
    flex: 1,
    gap: Spacing.XXSmall,
  },
  vendorDescription: {
    color: ColorPalette.TEXT_GREY_200,
    paddingVertical: getScreenHeight(0.1),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing.Small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.XXXSmall,
  },
  statDivider: {
    width: 1,
    backgroundColor: ColorPalette.BACKGROUND_GREY_100,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorPalette.WelcomeBack,
    paddingHorizontal: Spacing.XSmall,
    paddingVertical: getScreenHeight(1),
    borderRadius: BorderRadius.Full,
    gap: getScreenHeight(1),
  },
  statLabel: {
    color: ColorPalette.TEXT_GREY_200,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.XXXSmall,
  },
  readMoreText: {
    color: ColorPalette.RED,
  },
  followButton: {
    marginTop: Spacing.Small,
    borderRadius: BorderRadius.Medium,
  },
  followButtonText: {
    // Button component handles primary text color usually,
    // but explicit if needed
  },
});
