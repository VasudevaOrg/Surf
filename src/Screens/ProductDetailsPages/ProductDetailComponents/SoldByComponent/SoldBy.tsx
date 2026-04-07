import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import ColorPalette from '../../../../config/ColorPalette';
import { Spacing } from '../../../../config/globalStyles';
import { Typography } from '../../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../../components/MainComponents/Typography/Typography.types';
import StoreIcon from '../../../../assets/icons/StoreIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../components/MainComponents/Button';
import { Badge } from '../../../../components/MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../../components/MainComponents/Badges/Badge.types';
import StarRating from '../../../../assets/icons/StarRating';

interface soldByProps {
  storeName: string;
  followers: number;
  productsSold: number;
  ratings: number;
  ratingsCount: number;
  onViewShop?: () => void;
}

const SoldBy: React.FC<soldByProps> = ({
  storeName,
  followers,
  productsSold,
  ratings,
  ratingsCount,
  onViewShop,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.firstContainer}>
        <Typography
          text="Sold By"
          variant={TypographyVariant.H6_MEDIUM}
          customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
        />
        <View style={styles.storeDetails}>
          <View style={styles.storeFirst}>
            <View style={styles.iconContainer}>
              <StoreIcon style={undefined} />
            </View>
            <Typography
              text={storeName}
              variant={TypographyVariant.PMEDIUM_BOLD}
              customTextStyles={{
                color: ColorPalette.TEXT_GREY_500,
                flex: 1,
                flexWrap: 'wrap',
              }}
            />
          </View>
          <Button
            text="View Shop"
            onPress={onViewShop || (() => { })}
            size={ButtonSize.SMALL}
            variant={ButtonVariant.PRIMARY}
            type={ButtonType.OUTLINED}
            state={ButtonState.DEFAULT}
            customStyles={{
              borderWidth: 1,
              borderRadius: Spacing.Small,
              borderColor: ColorPalette.ROSE_PURPLE_300,
              minWidth: getScreenWidth(20),
              flexShrink: 0,
            }}
            customTextStyles={{ color: ColorPalette.ROSE_PURPLE_300 }}
          />
        </View>
      </View>
      {/* <View style={styles.secondContainer}>
        <View style={styles.squareBox}>
          <Typography
            text={followers.toString()}
            variant={TypographyVariant.H6_MEDIUM}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
          <Typography
            text="Followers"
            variant={TypographyVariant.PSMALL_REGULAR}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_100,
              textAlign: 'center',
            }}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.squareBox}>
          <Typography
            text={productsSold.toString()}
            variant={TypographyVariant.H6_MEDIUM}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
          <Typography
            text="Products Sold"
            variant={TypographyVariant.PSMALL_REGULAR}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_100,
              textAlign: 'center',
              flexWrap: 'wrap',
              width: '100%',
            }}
            numberOfLines={2}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.squareBox}>
          <Badge
            text={ratings.toString()}
            variant={BadgeVariant.FILLED}
            type={BadgeType.PRIMARY}
            rightIcon={StarRating as any}
            iconSize={12}
            customContainerStyle={{
              backgroundColor: ColorPalette.GREEN_200,
              paddingVertical: getScreenHeight(0.7),
              paddingHorizontal: getScreenWidth(1.5),
              borderRadius: Spacing.Medium,
            }}
          />
          <Typography
            text={`${ratingsCount} Ratings`}
            variant={TypographyVariant.PSMALL_REGULAR}
            customTextStyles={{
              color: ColorPalette.TEXT_GREY_100,
              textAlign: 'center',
              flexWrap: 'wrap',
              width: '100%',
            }}
            numberOfLines={2}
          />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
  },
  firstContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(2),
  },
  storeDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeFirst: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(2),
    alignItems: 'center',
    flex: 1,
    marginRight: getScreenWidth(2),
  },
  iconContainer: {
    display: 'flex',
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(3),
    backgroundColor: ColorPalette.PRIMARY_00,
    borderRadius: Spacing.Large,
  },
  secondContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  squareBox: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: getScreenHeight(1),
    paddingHorizontal: getScreenWidth(3),
    gap: getScreenHeight(0.7),
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  divider: {
    height: getScreenHeight(5),
    width: 1,
    backgroundColor: ColorPalette.WelcomeBack,
  },
});

export default SoldBy;
