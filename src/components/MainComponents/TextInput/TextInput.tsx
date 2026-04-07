import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  LayoutChangeEvent,
  Pressable,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ColorPalette from '../../../config/ColorPalette';
import {Spacing} from '../../../config/globalStyles';
import {getScreenHeight} from '../../../helpers/screenSize';
import {Typography} from '../Typography/Typography';
import {TypographyVariant} from '../Typography/Typography.types';
import {createStyles} from './TextInput.styles';
import {TextInputProps} from './TextInput.types';
import {validateInput} from './TextInput.utils';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';

const AnimatedTextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  showPlaceholder = false,
  autoFocus = false,
  autoCapitalize = 'none',
  customContainerStyles,
  customInputStyles,
  customPlaceholderStyles,
  customLabelStyles,
  customLabelColorFocused,
  customLabelColorUnfocused,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  showCountrySection = false,
  countryCode,
  countryFlag,
  onCountryPress,
  leftIcons = [],
  leftText,
  rightIcons = [],
  rightText,
  onRightTextPress,
  type = 'default',
  height,
  width,
  customBorderColor,
  customFocusedBorderColor,
  customErrorBorderColor,
  customBorderWidth = 1,
  customFocusedBorderWidth = 2,
  customErrorBorderWidth = 2,
  disabled = false,
  disabledBackgroundColor,
  multiline = false,
  numberOfLines = 1,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [countrySectionWidth, setCountrySectionWidth] = useState(0);
  const inputRef = useRef<RNTextInput>(null);

  // Initialize with label in up position if showPlaceholder is true
  const animatedLabelPosition = useRef(
    new Animated.Value(value || showPlaceholder ? 1 : 0),
  ).current;
  const animatedLabelSize = useRef(
    new Animated.Value(value || showPlaceholder ? 1 : 0),
  ).current;

  const styles = createStyles(
    isFocused,
    Boolean(error || localError),
    Boolean(value),
    height,
    width,
    customBorderColor,
    customFocusedBorderColor,
    customErrorBorderColor,
    customBorderWidth,
    customFocusedBorderWidth,
    customErrorBorderWidth,
  );

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
      animateLabel(1);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const validationError = validateInput(value, type);
    setLocalError(validationError);
    // Only animate label down if there's no value and no placeholder
    if (!value && !showPlaceholder) {
      animateLabel(0);
    }
  };

  const handleCountrySectionLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setCountrySectionWidth(width);
  };

  const animateLabel = (toValue: number) => {
    Animated.parallel([
      Animated.timing(animatedLabelPosition, {
        toValue,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(animatedLabelSize, {
        toValue,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (
      (value || showPlaceholder) &&
      (animatedLabelPosition as any)._value === 0
    ) {
      animateLabel(1);
    } else if (
      !value &&
      !showPlaceholder &&
      !isFocused &&
      (animatedLabelPosition as any)._value === 1
    ) {
      animateLabel(0);
    }
  }, [value, showPlaceholder, isFocused]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleContainerPress = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const baseLabelPosition = showCountrySection
    ? countrySectionWidth + Spacing.Small
    : Spacing.Large;

  const getLabelColor = () => {
    if (isFocused) {
      return customLabelColorFocused || ColorPalette.TEXT_GREY_400;
    }
    return customLabelColorUnfocused || ColorPalette.TEXT_GREY_400;
  };

  const labelStyle = {
    ...styles.label,
    transform: [
      {
        translateX: animatedLabelPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [baseLabelPosition, Spacing.Medium],
        }),
      },
      {
        translateY: animatedLabelPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [getScreenHeight(2.2), -getScreenHeight(1.1)],
        }),
      },
    ],
    fontSize: animatedLabelSize.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [
        customLabelColorUnfocused || (ColorPalette.TEXT_GREY_00 as any),
        getLabelColor(),
      ],
    }),
    ...customLabelStyles,
  };

  const renderLeftSection = () => {
    if (showCountrySection) {
      return (
        <View
          style={styles.countrySection}
          onLayout={handleCountrySectionLayout}>
          <TouchableOpacity
            style={styles.countryButton}
            onPress={onCountryPress}
            disabled={!onCountryPress}>
            {countryFlag && (
              <>
                {countryFlag.startsWith('http') ? (
                  <Image
                    source={{uri: countryFlag}}
                    style={styles.countryFlag}
                    resizeMode="contain"
                  />
                ) : (
                  <Typography
                    variant={TypographyVariant.PMEDIUM_BOLD}
                    text={countryFlag}
                  />
                )}

                <ArrowDownIcon style={styles.dropdownSymbol} />
              </>
            )}

            {leftText ? (
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                customTextStyles={styles.countryCode}
                text={leftText}
              />
            ) : (
              countryCode && (
                <Typography
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={styles.countryCode}
                  text={countryCode}
                />
              )
            )}
          </TouchableOpacity>
        </View>
      );
    }
    if (leftIcons?.length > 0) {
      return (
        <View style={styles.leftSection}>
          {leftIcons.map((iconConfig, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={iconConfig.onPress}
              disabled={!iconConfig.onPress}>
              {typeof iconConfig.icon === 'string' ? (
                <Image
                  source={{uri: iconConfig.icon}}
                  style={styles.iconSize}
                  resizeMode="contain"
                />
              ) : (
                React.isValidElement(iconConfig.icon) && iconConfig.icon
              )}
            </TouchableOpacity>
          ))}
          {leftText && (
            <Typography
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={styles.leftText}
              text={leftText}
            />
          )}
        </View>
      );
    }

    return null;
  };

  const renderRightSection = () => {
    if (rightIcons?.length > 0 || rightText) {
      return (
        <View style={styles.rightSection}>
          {rightText && (
            <TouchableOpacity onPress={onRightTextPress}>
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                customTextStyles={styles.rightText}
                text={rightText}
              />
            </TouchableOpacity>
          )}
          {rightIcons.map((iconConfig, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={iconConfig.onPress}
              disabled={!iconConfig.onPress}>
              {typeof iconConfig.icon === 'string' ? (
                <Image
                  source={{uri: iconConfig.icon}}
                  style={styles.iconSize}
                  resizeMode="contain"
                />
              ) : (
                React.isValidElement(iconConfig.icon) && iconConfig.icon
              )}
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  const getInputContainerStyle = () => {
    const hasLeftSection =
      showCountrySection || (leftIcons && leftIcons.length > 0) || leftText;
    return {
      ...styles.inputContainer,
      paddingLeft: hasLeftSection ? 0 : Spacing.XSmall,
      backgroundColor: disabled
        ? disabledBackgroundColor || ColorPalette.PRIMARY_WHITE
        : undefined,
    };
  };

  // Show placeholder text if enabled
  const getPlaceholder = () => {
    if (!showPlaceholder) return '';
    return placeholder || '';
  };

  return (
    <Pressable
      onPress={handleContainerPress}
      style={[styles.container, customContainerStyles]}>
      <View
        style={[
          getInputContainerStyle(),
          {
            borderColor:
              error || localError
                ? customErrorBorderColor || ColorPalette.RED_100
                : isFocused
                ? customFocusedBorderColor || ColorPalette.TEXT_GREY_400
                : customBorderColor || ColorPalette.BACKGROUND_GREY_100,
            borderWidth:
              error || localError
                ? customErrorBorderWidth
                : isFocused
                ? customFocusedBorderWidth
                : customBorderWidth,
          },
        ]}>
        {renderLeftSection()}
        <View style={styles.inputWrapper}>
          <RNTextInput
            ref={inputRef}
            style={[styles.input, customInputStyles]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType as any}
            placeholder={getPlaceholder()}
            placeholderTextColor="#B2B2B2"
            editable={!disabled}
            multiline={multiline}
            numberOfLines={numberOfLines}
          />
        </View>
        {renderRightSection()}
      </View>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      {(error || localError) && (
        <Typography
          variant={TypographyVariant.PSMALL_REGULAR}
          customTextStyles={styles.error}
          text={error || localError || ''}
        />
      )}
    </Pressable>
  );
};

export default AnimatedTextInput;
