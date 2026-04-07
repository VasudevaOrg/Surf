import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../config/ColorPalette';
import {Spacing} from '../../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.WHITE,
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    gap: getScreenHeight(2.5),
    borderRadius: Spacing.Small,
  },
  firstContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(1.5),
  },
  firstSubOne: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  firstSubTwo: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(3),
  },
  imageContainer: {
    position: 'relative',
    width: getScreenWidth(19),
    height: getScreenHeight(9.5),
    backgroundColor: ColorPalette.WelcomeBack,
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
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(0.7),
  },
  deliveryStatus: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(1),
  },
  radioButton: {
    width: getScreenWidth(3.5),
    height: getScreenWidth(3.5),
    borderRadius: getScreenWidth(1.75),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: getScreenWidth(1.8),
    height: getScreenWidth(1.8),
    borderRadius: getScreenWidth(0.9),
  },
  ratingBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorPalette.WHITE,
    gap: getScreenWidth(2),
  },
  starIconWrapper: {
    backgroundColor: ColorPalette.TIMER_BADGE,
    padding: getScreenWidth(1.5),
    borderRadius: Spacing.XSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    flex: 1,
  },
  ratingTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(1),
    flex: 1,
    flexShrink: 1,
  },
});
