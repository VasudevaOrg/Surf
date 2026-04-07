import React from 'react';
import {TextInput, View} from 'react-native';
import SearchIcon from '../../../assets/icons/SearchIcon';
import ColorPalette from '../../../config/ColorPalette';
import {styles} from './SearchBox.styles';
import {SearchBoxProps} from './SearchBox.types';

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search products...',
  value,
  onChangeText,
  testID,
  customContainerStyle,
  customInputStyle,
  iconColor = ColorPalette.BACKGROUND_GREY_300,
  iconStroke,
  iconSize = 20,
  placeholderColor = ColorPalette.BACKGROUND_GREY_300,
  editable = true,
  autoFocus = false,
  onSubmitEditing,
}) => {
  return (
    <View style={[styles.container, customContainerStyle]} testID={testID}>
      <SearchIcon
        size={iconSize}
        color={iconColor}
        style={styles.searchIcon}
        strokeWidth={iconStroke}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, customInputStyle]}
        editable={editable}
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
      />
    </View>
  );
};
