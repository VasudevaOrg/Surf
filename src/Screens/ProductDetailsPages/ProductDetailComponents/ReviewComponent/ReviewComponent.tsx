import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import ColorPalette from '../../../../config/ColorPalette';
import {Spacing} from '../../../../config/globalStyles';
import {Typography} from '../../../../components/MainComponents/Typography/Typography';
import {TypographyVariant} from '../../../../components/MainComponents/Typography/Typography.types';
import StarRating from '../../../../assets/icons/StarRating';

interface ReviewImageProps {
  uri?: string;
  path?: string;
  source?: any;
}

interface ReviewComponentProps {
  userName: string;
  userProfileImage: any; // Flexible type for image source
  rating: number;
  postedDate: string;
  description: string;
  helpfulCount: number;
  images?: ReviewImageProps[];
  onHelpfulPress?: () => void;
  onImagePress?: (index: number) => void;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  userName,
  userProfileImage,
  rating,
  postedDate,
  description,
  helpfulCount,
  images = [],
  onHelpfulPress,
  onImagePress,
}) => {
  const getImageSource = (image: any) => {
    if (image === null || image === undefined) {
      return null;
    }

    if (typeof image === 'number') {
      return image;
    }

    if (typeof image === 'string') {
      return {uri: image};
    }

    if (image && image.uri) {
      return {uri: image.uri};
    }

    if (image && image.source) {
      return image.source;
    }

    return null;
  };

  const renderImageItem = ({item, index}: {item: any; index: number}) => {
    const source = getImageSource(item);
    return source ? (
      <TouchableOpacity
        onPress={() => onImagePress?.(index)}
        activeOpacity={0.8}
        style={styles.imageWrapper}>
        <Image source={source} style={styles.reviewImage} resizeMode="cover" />
      </TouchableOpacity>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.profileImageContainer}>
            {userProfileImage ? (
              <Image
                source={getImageSource(userProfileImage)}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.defaultProfileImage} />
            )}
          </View>
          <View style={styles.userDetailsContainer}>
            <Typography
              text={userName}
              variant={TypographyVariant.H6_BOLD}
              customTextStyles={styles.userName}
            />

            <View style={styles.divider} />
            <View style={styles.ratingContainer}>
              <Typography
                text={rating.toString()}
                variant={TypographyVariant.PMEDIUM_BOLD}
                customTextStyles={styles.ratingText}
              />
              <StarRating
                size={16}
                color={ColorPalette.GREEN_200 as string}
                style={undefined}
              />
            </View>
          </View>
        </View>
        <Typography
          text={postedDate}
          variant={TypographyVariant.PSMALL_REGULAR}
          numberOfLines={2}
          customTextStyles={styles.dateText}
        />
      </View>

      <Typography
        text={description}
        variant={TypographyVariant.PMEDIUM_REGULAR}
        customTextStyles={styles.descriptionText}
      />

      {images.length > 0 && (
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(_, index) => `review-image-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.helpfulButton}
        onPress={onHelpfulPress}
        activeOpacity={0.8}>
        <Typography
          text={`Helpful (${helpfulCount})`}
          variant={TypographyVariant.PMEDIUM_REGULAR}
          customTextStyles={styles.helpfulText}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenHeight(1.5),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getScreenWidth(1.5),
  },
  profileImageContainer: {
    width: getScreenWidth(10),
    height: getScreenWidth(10),
    borderRadius: getScreenWidth(5),
    overflow: 'hidden',
    backgroundColor: ColorPalette.WelcomeBack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  defaultProfileImage: {
    width: '70%',
    height: '70%',
    borderRadius: Spacing.Small,
    backgroundColor: ColorPalette.WelcomeBack,
  },
  userDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: ColorPalette.TEXT_GREY_500,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(1),
  },
  ratingText: {
    color: '#4CAF50',
  },
  dateText: {
    color: ColorPalette.TEXT_GREY_500,
    alignContent: 'flex-end',
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  descriptionText: {
    color: ColorPalette.TEXT_GREY_100,
  },
  imageWrapper: {
    width: getScreenWidth(20),
    height: getScreenWidth(20),
    borderRadius: Spacing.Small,
    overflow: 'hidden',
    marginRight: getScreenWidth(2),
    backgroundColor: ColorPalette.WelcomeBack,
  },
  reviewImage: {
    width: '100%',
    height: '100%',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  helpfulText: {
    color: ColorPalette.TEXT_GREY_500,
  },
  divider: {
    height: getScreenHeight(5),
    width: 1,
    backgroundColor: ColorPalette.WelcomeBack,
  },
});

export default ReviewComponent;
