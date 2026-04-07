import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {
  Modal as RNModal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MicrophoneIcon from '../../../assets/icons/MicrophoneIcon';
import ColorPalette from '../../../config/ColorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../../MainComponents/Button';
import {Typography} from '../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';
import {SearchBox} from '../SearchBox/SearchBox';
import {styles} from './FilterModalStyles.styles';
import CheckIcon from '../../../assets/icons/CheckIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import {BorderRadius} from '../../../config/globalStyles';

type FilterSectionType = 'radio' | 'checkbox' | 'range';

type FilterSection = {
  name: string;
  options: string[];
  type: FilterSectionType;
  searchable?: boolean;
  colors?: Record<string, string>;
  filter_id?: string;
  range?: {
    min: string;
    max: string;
    field_type: string;
    prefix: string;
    currency_code: string;
  };
};

type FilterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedFilters: Record<string, string[]>;
  onApply: (filters: Record<string, string[]>) => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  filterSections: FilterSection[];
};

export const FilterModal: React.FC<FilterModalProps> = React.memo(
  ({
    isVisible,
    onClose,
    selectedFilters,
    onApply,
    activeTab,
    setActiveTab,
    filterSections,
  }) => {
    const [searchQuery, setSearchQuery] = useState<Record<string, string>>({});
    const [internalFilters, setInternalFilters] =
      useState<Record<string, string[]>>(selectedFilters);

    useEffect(() => {
      setInternalFilters(selectedFilters);
    }, [selectedFilters, isVisible]);

    const handleFilterSelection = useCallback(
      (sectionName: string, option: string) => {
        setInternalFilters((prev: Record<string, string[]>) => {
          const currentSection = prev[sectionName] || [];
          const currentSectionType = filterSections.find(
            section => section.name === sectionName,
          )?.type;

          if (currentSectionType === 'radio') {
            return {...prev, [sectionName]: [option]};
          }

          const isSelected = currentSection.includes(option);
          const updatedSection = isSelected
            ? currentSection.filter((item: string) => item !== option)
            : [...currentSection, option];

          return {...prev, [sectionName]: updatedSection};
        });
      },
      [filterSections],
    );

    const handleSearchChange = useCallback(
      (sectionName: string, text: string) => {
        setSearchQuery(prev => ({
          ...prev,
          [sectionName]: text,
        }));
      },
      [],
    );

    const getFilteredOptions = useCallback(
      (section: FilterSection) => {
        if (!section.searchable || !searchQuery[section.name]) {
          return section.options;
        }

        const query = searchQuery[section.name].toLowerCase();
        return section.options.filter(option =>
          option.toLowerCase().includes(query),
        );
      },
      [searchQuery],
    );

    const renderSelectionIndicator = useCallback(
      (option: string) => {
        const currentSection = filterSections.find(
          section => section.name === activeTab,
        );
        const isSelected = internalFilters[activeTab]?.includes(option);

        if (currentSection?.type === 'radio') {
          return (
            <View
              style={{
                width: getScreenWidth(5.5),
                height: getScreenHeight(2.6),
                borderRadius: BorderRadius.Full,
                borderWidth: 2,
                borderColor: isSelected
                  ? ColorPalette.ROSE_PURPLE_300
                  : ColorPalette.BACKGROUND_GREY_300,
                backgroundColor: ColorPalette.WHITE,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isSelected && (
                <View
                  style={{
                    width: getScreenWidth(2.7),
                    height: getScreenHeight(1.3),
                    borderRadius: BorderRadius.Full,
                    backgroundColor: ColorPalette.ROSE_PURPLE_300,
                  }}
                />
              )}
            </View>
          );
        }

        return isSelected ? (
          <CheckIcon size={20} />
        ) : (
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderRadius: BorderRadius.XXSmall,
              borderColor: ColorPalette.BACKGROUND_GREY_300,
              backgroundColor: ColorPalette.WHITE,
            }}
          />
        );
      },
      [activeTab, internalFilters, filterSections],
    );

    const handleClearFilters = useCallback(() => {
      setInternalFilters({});
      setSearchQuery({});
    }, []);

    const handleApplyFilters = useCallback(() => {
      onApply(internalFilters);
      onClose();
    }, [onApply, internalFilters, onClose]);

    const renderSearchBox = useMemo(() => {
      const currentSection = filterSections.find(
        section => section.name === activeTab,
      );

      return currentSection?.searchable ? (
        <View style={{position: 'relative'}}>
          <SearchBox
            placeholder={`Search ${activeTab}...`}
            value={searchQuery[activeTab] || ''}
            onChangeText={text => handleSearchChange(activeTab, text)}
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
              color={ColorPalette.BACKGROUND_GREY_300 as string}
              onPress={undefined}
              style={undefined}
            />
          </View>
        </View>
      ) : null;
    }, [activeTab, searchQuery, handleSearchChange, filterSections]);

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
                    text="Filters"
                    customTextStyles={styles.modalHeaderTitle}
                  />
                  <TouchableOpacity onPress={onClose}>
                    <CloseIcon style={undefined} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBodyContainer}>
                  <View style={styles.tabNavigation}>
                    {filterSections.map(section => (
                      <TouchableOpacity
                        key={section.name}
                        style={styles.tabItem(activeTab === section.name)}
                        onPress={() => setActiveTab(section.name)}>
                        <Typography
                          variant={
                            activeTab === section.name
                              ? TypographyVariant.H6_MEDIUM
                              : TypographyVariant.PMEDIUM_REGULAR
                          }
                          text={section.name}
                          customTextStyles={styles.tabItemText(
                            activeTab === section.name,
                          )}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.filterOptionsContainer}>
                    {renderSearchBox}

                    <ScrollView>
                      {(() => {
                        const currentSection = filterSections.find(
                          section => section.name === activeTab,
                        );

                        if (currentSection?.type === 'range') {
                          const currentRange = internalFilters[activeTab] || [];
                          const minVal = currentRange[0] || '';
                          const maxVal = currentRange[1] || '';

                          return (
                            <View style={{padding: 16}}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginTop: 10,
                                }}>
                                <TextInput
                                  style={{
                                    borderWidth: 1,
                                    borderColor:
                                      ColorPalette.BACKGROUND_GREY_300,
                                    borderRadius: BorderRadius.XSmall,
                                    padding: 12,
                                    width: '45%',
                                    color: ColorPalette.TEXT_BLACK,
                                  }}
                                  placeholder={`Min (${
                                    currentSection.range?.prefix || ''
                                  }${currentSection.range?.min || '0'})`}
                                  placeholderTextColor={
                                    ColorPalette.TEXT_GREY_300 as string
                                  }
                                  keyboardType="numeric"
                                  value={minVal}
                                  onChangeText={text => {
                                    setInternalFilters(prev => ({
                                      ...prev,
                                      [activeTab]: [text, maxVal],
                                    }));
                                  }}
                                />
                                <Typography
                                  variant={TypographyVariant.PMEDIUM_REGULAR}
                                  text="-"
                                />
                                <TextInput
                                  style={{
                                    borderWidth: 1,
                                    borderColor:
                                      ColorPalette.BACKGROUND_GREY_300,
                                    borderRadius: BorderRadius.XSmall,
                                    padding: 12,
                                    width: '45%',
                                    color: ColorPalette.TEXT_BLACK,
                                  }}
                                  placeholder={`Max (${
                                    currentSection.range?.prefix || ''
                                  }${currentSection.range?.max || '1000'})`}
                                  placeholderTextColor={
                                    ColorPalette.TEXT_GREY_300 as string
                                  }
                                  keyboardType="numeric"
                                  value={maxVal}
                                  onChangeText={text => {
                                    setInternalFilters(prev => ({
                                      ...prev,
                                      [activeTab]: [minVal, text],
                                    }));
                                  }}
                                />
                              </View>
                            </View>
                          );
                        }

                        return (
                          currentSection
                            ? getFilteredOptions(currentSection)
                            : []
                        ).map((option, optionIndex) => {
                          return (
                            <TouchableOpacity
                              key={optionIndex}
                              style={styles.filterOptionItem}
                              onPress={() =>
                                handleFilterSelection(activeTab, option)
                              }>
                              <View style={styles.filterOptionContainer}>
                                {currentSection?.name === 'Color' &&
                                  currentSection.colors?.[option] && (
                                    <View
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        marginRight: 10,
                                        backgroundColor:
                                          currentSection.colors[option],
                                        borderWidth: 1,
                                        borderColor:
                                          ColorPalette.BACKGROUND_GREY_300,
                                      }}
                                    />
                                  )}
                                <Typography
                                  variant={TypographyVariant.PMEDIUM_REGULAR}
                                  text={option}
                                  customTextStyles={styles.filterOptionText}
                                />
                                {renderSelectionIndicator(option)}
                              </View>
                            </TouchableOpacity>
                          );
                        });
                      })()}
                    </ScrollView>
                  </View>
                </View>

                <View style={styles.filterButtonsContainer}>
                  <Button
                    text="Clear Filters"
                    onPress={handleClearFilters}
                    variant={ButtonVariant.PRIMARY}
                    type={ButtonType.OUTLINED}
                    size={ButtonSize.MEDIUM}
                    customStyles={styles.clearFiltersButton}
                    customTextStyles={{color: ColorPalette.ROSE_PURPLE_300}}
                  />
                  <Button
                    text="Apply"
                    onPress={handleApplyFilters}
                    variant={ButtonVariant.PRIMARY}
                    type={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    customStyles={styles.applyFiltersButton}
                    bgColor={ColorPalette.ROSE_PURPLE_300 as string}
                    withShadow
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>
    );
  },
);
