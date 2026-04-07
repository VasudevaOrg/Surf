import React, { useMemo } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
  TextStyle,
} from "react-native";
import { getScreenHeight, getScreenWidth } from "../../../helpers/screenSize";
import { Spacing } from "../../../config/globalStyles";
import { Typography } from "../../MainComponents/Typography/Typography";
import { TypographyVariant } from "../../MainComponents/Typography/Typography.types";
import ColorPalette from "../../../config/ColorPalette";

interface CategoryBoxProps {
  title: string;
  imageSource: ImageSourcePropType | string;
  onPress?: () => void;
  size?: number;
  containerStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  titleVariant?: TypographyVariant;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  title,
  imageSource,
  onPress,
  size = getScreenWidth(15),
  containerStyle,
  imageContainerStyle,
  titleStyle,
  titleVariant = TypographyVariant.LMEDIUM_MEDIUM,
}) => {
  const imageProps = useMemo(
    () => ({
      source:
        typeof imageSource === "string" ? { uri: imageSource } : imageSource,
      style: styles.image,
    }),
    [imageSource]
  );

  const containerSizeStyle = useMemo(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  const defaultTextStyle = useMemo(
    () => ({
      color: ColorPalette.TEXT_GREY_500,
      textAlign: "center",
      width: size,
      lineHeight: 20,
    }),
    [size]
  );

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[styles.imageContainer, containerSizeStyle, imageContainerStyle]}
      >
        <Image {...imageProps} />
      </View>
      <View style={styles.textWrapper}>
        <Typography
          text={title}
          variant={titleVariant}
          numberOfLines={2}
          ellipsizeMode="tail"
          customTextStyles={[styles.titleText, defaultTextStyle, titleStyle]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: getScreenWidth(1.5),
    paddingHorizontal: getScreenWidth(1),
  },
  imageContainer: {
    borderRadius: Spacing.XXXLarge,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPalette.PRIMARY_WHITE,
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleText: {
    flexWrap: "wrap",
    textAlign: "center",
  },
});

export default React.memo(CategoryBox);
