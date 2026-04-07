import React, {useMemo, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import {Spacing, BorderRadius} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {Typography} from '../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';
import HistoryIcon from '../../../assets/icons/HistoryIcon';

export interface RocketDealItem {
  id: string;
  image: ImageSourcePropType | string;
}

interface RocketDealsProps {
  mainImage: ImageSourcePropType | string;
  timerValue?: string;
  gridItems: RocketDealItem[];
  moreCount?: number;
  containerStyle?: ViewStyle;
  onMainPress?: () => void;
  onItemPress?: (item: RocketDealItem) => void;
}

const RocketDeals: React.FC<RocketDealsProps> = ({
  mainImage,
  timerValue = '16h: 33m: 20s',
  gridItems,
  moreCount,
  containerStyle,
  onMainPress,
  onItemPress,
}) => {
  const mainImageSource =
    typeof mainImage === 'string' ? {uri: mainImage} : mainImage;

  const renderGridItem = (item: RocketDealItem, index: number) => {
    const isLast = index === 3 && moreCount && moreCount > 0;
    const itemImageSource =
      typeof item.image === 'string' ? {uri: item.image} : item.image;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.gridItem}
        onPress={() => onItemPress?.(item)}
        activeOpacity={0.8}>
        <Image
          source={itemImageSource}
          style={styles.gridImage}
          resizeMode="contain"
        />
        {isLast && (
          <View style={styles.overlay}>
            <Typography
              text={`${moreCount}+`}
              variant={TypographyVariant.LSMALL_BOLD}
              customTextStyles={{color: ColorPalette.WHITE}}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Left Section: Main Image */}
      <TouchableOpacity
        style={styles.mainImageContainer}
        onPress={onMainPress}
        activeOpacity={0.9}>
        <Image
          source={mainImageSource}
          style={styles.mainImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Right Section: Timer & Grid */}
      <View style={styles.rightSection}>
        <View style={styles.timerHeader}>
          <Typography
            text="Discount ends in"
            variant={TypographyVariant.LSMALL_MEDIUM}
            customTextStyles={{color: ColorPalette.TEXT_GREY_100}}
          />
          <View style={styles.timerBadge}>
            <View style={styles.timerRow}>
              <HistoryIcon
                size={17}
                color={ColorPalette.TEXT_GREY_500 as string}
                strokeWidth={2}
                style={undefined}
              />
              <Typography
                text={timerValue}
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
              />
            </View>
          </View>
        </View>

        <View style={styles.gridContainer}>
          {gridItems
            .slice(0, 4)
            .map((item, index) => renderGridItem(item, index))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    gap: getScreenWidth(3),
  },
  mainImageContainer: {
    width: getScreenWidth(36.75),
    height: getScreenHeight(27.5),
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: BorderRadius.Small,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'column',
    height: getScreenHeight(27.5),
    gap: Spacing.XSmall, // increased from 6 to XSmall (8px) for 'more gap'
  },
  timerHeader: {
    gap: Spacing.XXXSmall,
  },
  timerBadge: {
    borderColor: ColorPalette.TIMER_BADGE_BORDER,
    borderWidth: 1,
    backgroundColor: ColorPalette.TIMER_BADGE,
    borderRadius: BorderRadius.XSmall,
    paddingVertical: getScreenHeight(1),
    paddingHorizontal: Spacing.XXSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.XXSmall,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flex: 1,
  },
  gridItem: {
    width: '48.5%',
    height: '48.5%', // Fill half the grid's height
    backgroundColor: ColorPalette.WelcomeBack,
    borderRadius: BorderRadius.Small,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gridImage: {
    width: '80%',
    height: '80%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
backgroundColor: ColorPalette.OPACITY_40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(RocketDeals);
