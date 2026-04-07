import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Typography } from '../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../MainComponents/Typography/Typography.types';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import ChevronRightIcon from '../../../assets/icons/ChevronRightIcon';
import StarIcon from '../../../assets/icons/StarIcon';
import ChevronIcon from '../../../assets/icons/ChevronIcon';
import { Button } from '../../MainComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../MainComponents/Button/Button.types';
import { styles } from './VendorCard.styles';
import StarRating from '../../../assets/icons/StarRating';

const toHttps = (url: string): string => {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://');
};
interface VendorCardProps {
  item: {
    brand_id: string;
    brand: string;
    image_url: string;
    description: string;
    products_sold: string;
    rating: string;
    ratings_count: number;
  };
  onPress: () => void;
  showReadMore?: boolean;
  showFollowButton?: boolean;
  showBanner?: boolean;
}

export const VendorCard: React.FC<VendorCardProps> = ({
  item,
  onPress,
  showReadMore = false,
  showFollowButton = false,
  showBanner = false,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const statDividerStyle = [styles.statDivider, { height: getScreenHeight(3) }];

  return (
    <TouchableOpacity style={styles.vendorCard} onPress={onPress}>
      <View style={styles.vendorInfoRow}>
        <Image
          source={{
            uri: toHttps(item.image_url) || 'https://via.placeholder.com/150',
          }}
          style={styles.vendorLogoLarge}
          resizeMode="contain"
        />
        <View style={styles.vendorTextContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography
              text={item.brand}
              variant={TypographyVariant.H6_SEMIBOLD}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_500,
              }}
            />
            {/* <ChevronRightIcon
              size={12}
              color={ColorPalette.TEXT_GREY_500 as string}
              style={undefined}
            /> */}
          </View>
          <View>
            <Typography
              text={item.description || 'No description available'}
              variant={TypographyVariant.LSMALL_REGULAR}
              customTextStyles={styles.vendorDescription}
              numberOfLines={showReadMore && !isExpanded ? 3 : undefined}
            />
            {showReadMore &&
              item.description &&
              item.description.length > 100 && (
                <TouchableOpacity
                  onPress={() => setIsExpanded(!isExpanded)}
                  style={styles.readMoreContainer}>
                  <Typography
                    text={isExpanded ? 'Read Less' : 'Read More'}
                    variant={TypographyVariant.LSMALL_BOLD}
                    customTextStyles={styles.readMoreText}
                  />
                  <View
                    style={{
                      transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
                      marginLeft: 4,
                    }}>
                    <ChevronIcon
                      size={10}
                      color={ColorPalette.RED as string}
                      style={undefined}
                      onPress={undefined}
                    />
                  </View>
                </TouchableOpacity>
              )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: getScreenWidth(1),
            }}>
            <StarRating style={undefined} size={20} />
            <Typography variant={TypographyVariant.LMEDIUM_REGULAR}>
              {item?.rating}
            </Typography>
            <Typography
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={{
                fontSize: 12,
                color: ColorPalette.TEXT_GREY_200,
              }}>
              {`(${item?.ratings_count} ratings)`}
            </Typography>
          </View>
        </View>
      </View>

      {showBanner && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: ColorPalette.BACKGROUND_GREY_50,
              width: '100%',
            }}
          />
          <Image
            source={require('../../../assets/images/bannerVendorDetails.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </>
      )}

      {/* <View style={styles.statsContainer}> */}
      {/* <View style={styles.statItem}>
          <Typography
            text={item.products_sold || '0'}
            variant={TypographyVariant.H4_BOLD}
            customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
          />
          <Typography
            text="Products Sold"
            variant={TypographyVariant.LSMALL_MEDIUM}
            customTextStyles={styles.statLabel}
          />
        </View>

        <View style={statDividerStyle} /> */}

      {/* <View style={styles.statItem}>
          <View style={styles.ratingContainer}>
            <Typography
              text={item.rating || '0.0'}
              variant={TypographyVariant.LSMALL_BOLD}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_500,
              }}
            />
            <StarIcon
              size={12}
              color={ColorPalette.ACTIVE_GREEN as string}
              strokeColor={ColorPalette.ACTIVE_GREEN as string}
              style={undefined}
              onPress={undefined}
            />
          </View>
          <Typography
            text={`${item.ratings_count || 0} Ratings`}
            variant={TypographyVariant.LSMALL_MEDIUM}
            customTextStyles={styles.statLabel}
          />
        </View> */}
      {/* </View> */}

      {showFollowButton && (
        <Button
          text="Follow"
          onPress={() => { }} // Placeholder
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          state={ButtonState.DEFAULT}
          customStyles={styles.followButton}
          customTextStyles={styles.followButtonText}
          bgColor={ColorPalette.ROSE_PURPLE_300}
        />
      )}
    </TouchableOpacity>
  );
};
