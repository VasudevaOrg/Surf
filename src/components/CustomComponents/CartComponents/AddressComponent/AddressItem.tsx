import React from 'react';
import { View, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { styles } from './AddressItem.styles';
import { Typography } from '../../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../MainComponents/Typography/Typography.types';
import ColorPalette from '../../../../config/ColorPalette';
import FlowBite from '../../../../assets/icons/FlowBite';
import { getScreenHeight, getScreenWidth } from '../../../../helpers/screenSize';
import { Badge } from '../../../MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../MainComponents/Badges/Badge.types';
import ArrowRightIcon from '../../../../assets/icons/ArrowRightIcon';

interface AddressItemProps {
  name: string;
  houseNo: string;
  streetName: string;
  country: string;
  phoneNumber: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  tag?: string;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const AddressItem: React.FC<AddressItemProps> = ({
  name,
  houseNo,
  streetName,
  country,
  phoneNumber,
  isSelected = false,
  onSelect,
  onEdit,
  tag = 'Home',
  testID,
  containerStyle,
}) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onSelect}
      activeOpacity={0.8}
      testID={testID}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Badge
            // text={tag}
            text={"Default"}
            textVariant={TypographyVariant.LMEDIUM_MEDIUM}
            variant={BadgeVariant.FILLED}
            type={BadgeType.SECONDARY}
            customContainerStyle={[
              styles.homeBadge,
              {
                backgroundColor: isSelected
                  ? ColorPalette.BACKGROUND_GREY_50
                  : "transparent",
              },
            ]}
            customTextColor={
              isSelected
                ? (ColorPalette.HOME_BLUE as string)
                : (ColorPalette.TEXT_GREY_100 as string)
            }
            customTextStyles={{ paddingVertical: getScreenHeight(0.1) }}
          />
        </View>


        {/* Edit Section */}
        <TouchableOpacity style={styles.editContainer} onPress={onEdit}>
          <Typography
            text="Edit"
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={{ color: ColorPalette.HOME_BLUE }}
          />
          <ArrowRightIcon
            size={20}
            style={undefined}
            color={ColorPalette.HOME_BLUE as string}
          />
        </TouchableOpacity>
      </View>



      <View style={styles.infoContainer}>
        <Typography
          text={name}
          variant={TypographyVariant.H6_MEDIUM}
        />
        <Typography
          text={houseNo}
          variant={TypographyVariant.LMEDIUM_MEDIUM}
          customTextStyles={styles.value}
        />
        <Typography
          text={streetName}
          variant={TypographyVariant.LMEDIUM_MEDIUM}
          customTextStyles={styles.value}
        />
        <Typography
          text={country}
          variant={TypographyVariant.LMEDIUM_MEDIUM}
          customTextStyles={styles.value}
        />
        <Typography
          text={phoneNumber}
          variant={TypographyVariant.LMEDIUM_MEDIUM}
          customTextStyles={[styles.value, {
            color: ColorPalette.TEXT_GREY_50,
          }]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AddressItem;
