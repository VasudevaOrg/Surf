import React from 'react';
import {
  ImageSourcePropType,
  View,
  Image,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import ColorPalette from '../../../config/ColorPalette';
import {Spacing} from '../../../config/globalStyles';
import {Typography} from '../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../..//MainComponents/Typography/Typography.types';
import InfoRightIcon from '../../..//assets/icons/InfoRightIcon';
import NewTag from '../../../assets/icons/NewTag';

interface NewArrivalProp {
  imageSource: ImageSourcePropType | string;
  title: string;
  imageContainerStyle?: StyleProp<ViewStyle>;
  customStyles?: StyleProp<ViewStyle>;
  borderColors?: string[];
  backgroundColors?: string[];
  onPress?: () => void;
}

const NewArrivalComponent: React.FC<NewArrivalProp> = ({
  imageSource,
  title,
  imageContainerStyle,
  onPress,
}) => {
  const renderedImage = React.useMemo(() => {
    if (typeof imageSource === 'string') {
      return <Image source={{uri: imageSource}} style={styles.image} />;
    }
    return <Image source={imageSource} style={styles.image} />;
  }, [imageSource]);

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      activeOpacity={0.8}>
      <NewTag style={styles.newTag} width={64} height={32} />
      <View style={styles.container}>
        <View style={[styles.imageContainer, imageContainerStyle]}>
          {renderedImage}
        </View>
        <View style={styles.textContainer}>
          <Typography
            text={title}
            variant={TypographyVariant.LSMALL_BOLD}
            customTextStyles={{color: ColorPalette.WHITE}}
          />
          <InfoRightIcon style={undefined} size={12} onPress={undefined} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: getScreenWidth(30),
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.TAG_COLOR,
    paddingHorizontal: getScreenWidth(1.5),
    paddingVertical: getScreenHeight(0.7),
    borderRadius: Spacing.Medium,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: getScreenHeight(15.25),
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
  newTag: {
    position: 'absolute',
    top: 2,
    left: 0,
    zIndex: 1,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1),
    paddingVertical: getScreenHeight(0.9),
    marginTop: getScreenHeight(0.4),
  },
});

export default React.memo(NewArrivalComponent);
