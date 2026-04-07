import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CheckIcon from '../../assets/icons/CheckIcon';
import CloseIcon from '../../assets/icons/CloseIcon';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../MainComponents/Button';
import { SearchBox } from '../CustomComponents/SearchBox/SearchBox';
import { Typography } from '../MainComponents/Typography/Typography';
import { TypographyVariant } from '../MainComponents/Typography/Typography.types';
import ColorPalette from '../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../helpers/screenSize';
import MicrophoneIcon from '../../assets/icons/MicrophoneIcon';
import { BorderRadius, Spacing } from '../../config/globalStyles';

export interface CategoryOption {
  value: string;
  label: string;
  isSelected: boolean;
}

export interface CategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (selectedCategories: string[]) => void;
  initialCategories?: string[];
  options?: CategoryOption[];
  title?: string;
  searchable?: boolean;
}

const DEFAULT_CATEGORIES: CategoryOption[] = [
  { value: 'Men Jewellery', label: 'Men Jewellery', isSelected: false },
  { value: 'Sunglasses', label: 'Sunglasses', isSelected: false },
  { value: 'Party Supplies', label: 'Party Supplies', isSelected: false },
  { value: 'Hair accessories', label: 'Hair accessories', isSelected: false },
  { value: 'Wallet', label: 'Wallet', isSelected: false },
  { value: 'Motorcycle Covers', label: 'Motorcycle Covers', isSelected: false },
  { value: 'Analog Watches', label: 'Analog Watches', isSelected: false },
  { value: 'Hair Oil', label: 'Hair Oil', isSelected: false },
  {
    value: 'Bangles & Bracelets',
    label: 'Bangles & Bracelets',
    isSelected: false,
  },
  { value: 'Bedsheets', label: 'Bedsheets', isSelected: false },
  { value: 'Bike Covers', label: 'Bike Covers', isSelected: false },
];

const CategoryModal: React.FC<CategoryModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  initialCategories = [],
  options = DEFAULT_CATEGORIES,
  title = 'Categories',
  searchable = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOptions, setModalOptions] = useState<CategoryOption[]>(options);
  const [filteredOptions, setFilteredOptions] =
    useState<CategoryOption[]>(options);

  // Reset and initialize options when modal becomes visible
  useEffect(() => {
    if (isVisible) {
      // Update options based on initial categories
      const updatedOptions = options.map(option => ({
        ...option,
        isSelected: initialCategories.includes(option.value),
      }));

      setModalOptions(updatedOptions);
      setFilteredOptions(updatedOptions);
      setSearchQuery(''); // Reset search text
    }
  }, [isVisible, options, initialCategories]);

  // Filter options based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOptions(modalOptions);
    } else {
      const filtered = modalOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredOptions(filtered);
    }
  }, [searchQuery, modalOptions]);

  // Handle individual category selection
  const handleCategoryPress = useCallback((selectedValue: string) => {
    setModalOptions(prevOptions =>
      prevOptions.map(option => ({
        ...option,
        isSelected:
          option.value === selectedValue
            ? !option.isSelected
            : option.isSelected,
      })),
    );
  }, []);

  // Handle clear all selections
  const handleClearSelections = useCallback(() => {
    setModalOptions(prevOptions =>
      prevOptions.map(option => ({ ...option, isSelected: false })),
    );
  }, []);

  // Handle modal submission
  const handleApplySelections = useCallback(() => {
    const selectedCategories = modalOptions
      .filter(option => option.isSelected)
      .map(option => option.value);

    onSubmit(selectedCategories);
    onClose();
  }, [modalOptions, onSubmit, onClose]);

  const renderSelectionIndicator = useCallback((isSelected: boolean) => {
    return isSelected ? (
      <CheckIcon size={20} />
    ) : (
      <View
        style={{
          width: getScreenWidth(5.5),
          height: getScreenHeight(2.6),
          borderWidth: 1,
          borderRadius: BorderRadius.XXSmall,
          borderColor: ColorPalette.BACKGROUND_GREY_200,
          backgroundColor: ColorPalette.WHITE,
        }}
      />
    );
  }, []);

  return (
    <RNModal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContentWithButtons}>
              <View style={styles.modalHeader}>
                <Typography
                  variant={TypographyVariant.H5_SEMIBOLD}
                  text={title}
                  customTextStyles={styles.modalHeaderTitle}
                />
                <TouchableOpacity onPress={onClose}>
                  <CloseIcon style={undefined} />
                </TouchableOpacity>
              </View>

              <View style={styles.filterOptionsContainer}>
                {searchable && (
                  <View style={{ position: 'relative' }}>
                    <SearchBox
                      placeholder="Search"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        right: getScreenWidth(2),
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MicrophoneIcon
                        size={20}
                        color={ColorPalette.BACKGROUND_GREY_300}
                      />
                    </View>
                  </View>
                )}

                <ScrollView>
                  {filteredOptions.map(option => (
                    <TouchableOpacity
                      key={option.value}
                      style={styles.filterOptionItem}
                      onPress={() => handleCategoryPress(option.value)}>
                      <View style={styles.filterOptionContainer}>
                        <Typography
                          variant={TypographyVariant.PMEDIUM_REGULAR}
                          text={option.label}
                          customTextStyles={styles.filterOptionText}
                        />
                        {renderSelectionIndicator(option.isSelected)}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.filterButtonsContainer}>
                <Button
                  text="Clear Filters"
                  onPress={handleClearSelections}
                  variant={ButtonVariant.PRIMARY}
                  type={ButtonType.OUTLINED}
                  size={ButtonSize.MEDIUM}
                  customStyles={styles.clearFiltersButton}
                  customTextStyles={{ color: ColorPalette.ROSE_PURPLE_300 }}
                />
                <Button
                  text="Apply"
                  onPress={handleApplySelections}
                  variant={ButtonVariant.PRIMARY}
                  type={ButtonType.PRIMARY}
                  size={ButtonSize.MEDIUM}
                  customStyles={styles.applyFiltersButton}
                  bgColor={ColorPalette.ROSE_PURPLE_300}
                  withShadow
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: ColorPalette.OPACITY_24,
    justifyContent: 'flex-end',
  },
  modalContentWithButtons: {
    backgroundColor: ColorPalette.WHITE,
    borderTopLeftRadius: BorderRadius.Large,
    borderTopRightRadius: BorderRadius.Large,
    maxHeight: getScreenHeight(80),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getScreenWidth(4),
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.WelcomeBack,
    paddingVertical: getScreenHeight(1.5),
    marginTop: getScreenHeight(1),
  },
  modalHeaderTitle: {
    color: ColorPalette.TEXT_GREY_500,
  },
  filterOptionsContainer: {
    maxHeight: getScreenHeight(50),
    paddingHorizontal: getScreenWidth(4),
    marginTop: getScreenHeight(1.5),
  },
  filterOptionItem: {
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
  },
  filterOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterOptionText: {
    color: ColorPalette.TEXT_GREY_500,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenWidth(2),
    backgroundColor: ColorPalette.WHITE,
    shadowColor: ColorPalette.BACKGROUND_GREY_400,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 10,
  },
  clearFiltersButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: ColorPalette.ROSE_PURPLE_300,
    borderRadius: Spacing.Medium,
  },
  applyFiltersButton: {
    flex: 1,
    borderRadius: Spacing.Medium,
  },
});

export default CategoryModal;
