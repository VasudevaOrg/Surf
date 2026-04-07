import React, { memo } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from "./NewAddressItem.styles";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../helpers/screenSize";
import { Typography } from "../../../MainComponents/Typography/Typography";
import { TypographyVariant } from "../../../MainComponents/Typography/Typography.types";
import ColorPalette from "../../../../config/ColorPalette";
import { Badge } from "../../../MainComponents/Badges/Badge";
import {
  BadgeType,
  BadgeVariant,
} from "../../../MainComponents/Badges/Badge.types";
import { Spacing } from "../../../../config/globalStyles";
import FlowBite from "../../../../assets/icons/FlowBite";

interface NewAddressItemProps {
  name: string;
  houseNo: string;
  streetName: string;
  country: string;
  isSelected?: boolean;
  onSelect?: () => void;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onEdit?: () => void;
}

const AddressInfoRow = memo(
  ({ label, value }: { label: string; value: string }) => (
    <View style={styles.secondSubOne}>
      <Typography
        text={label}
        variant={TypographyVariant.PMEDIUM_REGULAR}
        customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
      />
      <Typography
        text={value}
        variant={TypographyVariant.PMEDIUM_REGULAR}
        customTextStyles={{ color: ColorPalette.TEXT_GREY_300 }}
      />
    </View>
  )
);

const NewAddressItem: React.FC<NewAddressItemProps> = ({
  name,
  houseNo,
  streetName,
  country,
  isSelected = false,
  onSelect,
  testID,
  containerStyle,
  onEdit,
}) => {
  // Memoized badge style
  const badgeStyle = {
    backgroundColor: ColorPalette.WelcomeBack,
    paddingHorizontal: getScreenWidth(1.5),
    paddingVertical: getScreenHeight(1),
    borderRadius: Spacing.XSmall,
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onSelect}
      activeOpacity={0.8}
      testID={testID}
    >
      <View style={styles.firstContainer}>
        <View style={styles.itemRadio}>
          <TouchableOpacity
            style={[
              styles.radioButtonContainer,
              { alignSelf: "flex-start", marginTop: getScreenHeight(0.5) },
              isSelected && styles.selectedRadioButtonContainer,
            ]}
            onPress={onSelect}
            activeOpacity={0.8}
          >
            {isSelected && <View style={styles.radioButtonInner} />}
          </TouchableOpacity>
          <Badge
            text={name}
            variant={BadgeVariant.FILLED}
            type={BadgeType.PRIMARY}
            customContainerStyle={badgeStyle}
            customTextColor={ColorPalette.TEXT_GREY_400}
            textVariant={TypographyVariant.LMEDIUM_MEDIUM}
          />
        </View>
        <TouchableOpacity style={styles.editContainer} onPress={onEdit}>
          <Typography
            text="Edit"
            variant={TypographyVariant.LMEDIUM_BOLD}
            customTextStyles={{ color: ColorPalette.BLUE_200 }}
          />
          <FlowBite
            size={14}
            color={ColorPalette.BLUE_200}
            style={undefined}
            onPress={undefined}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.secondContainer}>
        <AddressInfoRow label="House No. & Floor*" value={houseNo} />
        <AddressInfoRow label="Street Name" value={streetName} />
        <AddressInfoRow label="Country" value={country} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(NewAddressItem);
