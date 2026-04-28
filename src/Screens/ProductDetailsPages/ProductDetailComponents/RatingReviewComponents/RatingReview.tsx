import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './RatingReview.styles';
import { RatingCategoryProps, RatingReviewProps } from './RatingReview.types';
import { Typography } from '../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../components/MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import StarRating from '../../../../assets/icons/StarRating';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import { BorderRadius } from '../../../../config/globalStyles';

const RatingCategory: React.FC<RatingCategoryProps> = React.memo(
  ({ label, count, percentage, color }) => (
    <View style={styles.categoryContainer}>
      <Typography
        text={label}
        variant={TypographyVariant.PMEDIUM_BOLD}
        customTextStyles={{
          color: ColorPalette.TEXT_GREY_500,
          width: getScreenWidth(20),
        }}
      />
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { backgroundColor: color, width: `${Math.min(percentage, 100)}%` },
          ]}
        />
      </View>
      <Typography
        text={`${count}`}
        variant={TypographyVariant.LMEDIUM_REGULAR}
        customTextStyles={{
          color: ColorPalette.TEXT_GREY_100,
          paddingHorizontal: getScreenWidth(1),
        }}
      />
    </View>
  ),
);

const RatingReview: React.FC<RatingReviewProps> = ({
  rating,
  totalRatings,
  totalReviews,
  excellent,
  veryGood,
  good,
  average,
  poor,
  onWriteReview,
}) => {
  // Calculate percentages only once
  const total = totalRatings || 1; // Prevent division by zero

  const categories = React.useMemo(
    () => [
      {
        label: 'Excellent',
        count: excellent,
        percentage: (excellent / total) * 100,
        color: ColorPalette.GREEN_200,
      },
      {
        label: 'Very Good',
        count: veryGood,
        percentage: (veryGood / total) * 100,
        color: ColorPalette.LIME_GREEN_200,
      },
      {
        label: 'Good',
        count: good,
        percentage: (good / total) * 100,
        color: ColorPalette.YELLOW_200,
      },
      {
        label: 'Average',
        count: average,
        percentage: (average / total) * 100,
        color: ColorPalette.ORANGE_200,
      },
      {
        label: 'Poor',
        count: poor,
        percentage: (poor / total) * 100,
        color: ColorPalette.RED_100,
      },
    ],
    [excellent, veryGood, good, average, poor, total],
  );

  return (
    <View style={styles.container}>
      <Typography
        text="Product Ratings & Reviews"
        variant={TypographyVariant.H6_MEDIUM}
        customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
      />

      <View style={styles.contentContainer}>
        <View style={styles.ratingContainer}>
          {(rating && rating > 0) ? (
            <View style={styles.ratingNumberContainer}>
              <Typography
                text={rating?.toFixed(1)}
                variant={TypographyVariant.H1_SEMIBOLD}
                customTextStyles={{ color: ColorPalette.GREEN_200 as any }}
              />
              <StarRating
                color={ColorPalette.GREEN_200 as string}
                size={20}
                style={undefined}
              />
            </View>
          ) : null}
          <View style={styles.ratingInfoContainer}>
            <Typography
              text={`${totalRatings} Ratings`}
              variant={TypographyVariant.LSMALL_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
            />
            <Typography
              text={`${totalReviews} Reviews`}
              variant={TypographyVariant.LSMALL_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_100 }}
            />
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <RatingCategory
              key={`rating-category-${index}`}
              label={category.label}
              count={category.count}
              percentage={category.percentage}
              color={category.color as string}
            />
          ))}

          <TouchableOpacity style={styles.writeReviewButton} onPress={onWriteReview}>
            <Typography
              text="Write a Review"
              variant={TypographyVariant.LSMALL_BOLD}
              customTextStyles={{ color: ColorPalette.ROSE_PURPLE_400 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
};

export default React.memo(RatingReview);
