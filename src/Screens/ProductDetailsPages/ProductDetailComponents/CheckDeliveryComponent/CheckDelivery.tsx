import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import {
  getScreenHeight,
  getScreenWidth,
} from "../../../../helpers/screenSize";
import ColorPalette from "../../../../config/ColorPalette";
import { Typography } from "../../../../components/MainComponents/Typography/Typography";
import { TypographyVariant } from "../../../../components/MainComponents/Typography/Typography.types";
import CarIcon from "../../../../assets/icons/CarIcon";
import CalendarIcon from "../../../../assets/icons/CalendarIcon";
import { Spacing } from "../../../../config/globalStyles";

interface CheckDeliveryProps {
  check: () => void;
}

const CheckDelivery = ({ check }: CheckDeliveryProps) => {
  const [pincode, setPincode] = useState("");

  return (
    <View style={styles.container}>
      <Typography
        text="Check Delivery Date"
        variant={TypographyVariant.H6_MEDIUM}
        customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Delivery Pin code"
          placeholderTextColor="#8E8E8E"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.checkButton} onPress={check}>
          <Typography
            text="CHECK"
            variant={TypographyVariant.LMEDIUM_BOLD}
            customTextStyles={{ color: ColorPalette.BLUE_200 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.iconText}>
          <CarIcon
            style={undefined}
            size={18}
            color={ColorPalette.ROSE_PURPLE_200}
          />
          <Typography
            text="Enter Pin code for Estimated Delivery Date"
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
        </View>
        <View style={styles.iconText}>
          <CalendarIcon
            style={undefined}
            size={18}
            color={ColorPalette.ROSE_PURPLE_200}
          />
          <Typography
            text="Dispatch in 2 day"
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: getScreenHeight(1.5),
    backgroundColor: ColorPalette.WHITE,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(4),
    borderRadius: Spacing.Small,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  input: {
    flex: 1,
    height: getScreenHeight(5),
    paddingVertical: getScreenHeight(0.5),
    fontFamily: "System",
    fontSize: getScreenHeight(1.8),
    borderBottomWidth: 0,
    color: ColorPalette.TEXT_GREY_100,
  },
  checkButton: {
    marginLeft: getScreenWidth(2),
    paddingHorizontal: getScreenWidth(2),
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: getScreenHeight(1),
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    gap: getScreenWidth(2),
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default CheckDelivery;
