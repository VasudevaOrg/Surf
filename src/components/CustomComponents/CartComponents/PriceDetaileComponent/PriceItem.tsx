import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import { Spacing } from '../../../../config/globalStyles';
import ColorPalette from '../../../../config/ColorPalette';
import { Typography } from '../../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types';

interface priceItemProps {
  totalPrice: number;
  totalDiscount: number;
  orderTotal: number;
}

const PriceItem: React.FC<priceItemProps> = ({
  totalPrice,
  totalDiscount,
  orderTotal,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <Typography
          text="Price Details"
          variant={TypographyVariant.PMEDIUM_BOLD}
          customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
        />
        <View style={{ display: 'flex', gap: getScreenHeight(1) }}>
          <View style={styles.textContainer}>
            <Typography
              text="Total Product Price"
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
            />
            <Typography
              text={`$${totalPrice}`}
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
            />
          </View>
          <View style={styles.textContainer}>
            <Typography
              text="Total Discounts"
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={{
                color: ColorPalette.GREEN_200,
                textDecorationLine: 'underline',
              }}
            />
            <Typography
              text={`- $${totalDiscount}`}
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={{
                color: ColorPalette.GREEN_200,
                textDecorationLine: 'underline',
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: getScreenHeight(1.5),
        }}>
        <Typography
          text="Order Total"
          variant={TypographyVariant.PSMALL_MEDIUM}
          customTextStyles={{
            color: ColorPalette.TEXT_GREY_300,
          }}
        />
        <Typography
          text={`$${orderTotal}`}
          variant={TypographyVariant.LMEDIUM_BOLD}
          customTextStyles={{
            color: ColorPalette.TEXT_GREY_500,
          }}
        />
      </View>
      <View style={styles.thirdContainer}>
        <Image
          source={require('../../../../assets/images/offer.png')}
          style={{ width: getScreenWidth(3.75), height: getScreenHeight(1.87) }}
        />
        <Typography
          text={`Yay! Your total discount is ₹${totalDiscount}`}
          variant={TypographyVariant.PXSMALL_MEDIUM}
          customTextStyles={{ color: ColorPalette.GREEN_200 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(2),
    gap: getScreenHeight(2),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: Spacing.Small,
  },
  firstContainer: {
    display: 'flex',
    gap: getScreenHeight(1.5),
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thirdContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: getScreenHeight(1.5),
    backgroundColor: ColorPalette.GREEN_00,
    borderRadius: Spacing.XSmall,
    gap: getScreenWidth(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PriceItem;
