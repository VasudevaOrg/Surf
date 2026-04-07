import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import FilterIcon from '../../../assets/icons/FilterIcon';
import SortIcon from '../../../assets/icons/SortIcon';
import ColorPalette from '../../../config/ColorPalette';
import {Badge} from '../../MainComponents/Badges/Badge';
import {BadgeVariant} from '../../MainComponents/Badges/Badge.types';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';
import {FilterModal} from './FilterModal';
import {StatusModal} from '../StatusModal/StatusModal';
import CategoryModal from '../CategoryModal';
import {styles} from './FilterModalStyles.styles';
import StarIcon from '../../../assets/icons/StarIcon';
import FlameIcon from '../../../assets/icons/FlameIcon';
import FlameOutlineIcon from '../../../assets/icons/FlameOutlineIcon';
import StarOutlineIcon from '../../../assets/icons/StarOutlineIcon';

type FilterSection = {
  name: string;
  type: 'radio' | 'checkbox' | 'range';
  options: string[];
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

type FilterBadgesProps = {
  filterSections?: FilterSection[];
  sortOptions?: Array<{
    value: string;
    label: string;
    isSelected: boolean;
  }>;
  categoryOptions?: string[];
  selectedSort?: string;
  onSortSubmit?: (selectedValue: string) => void;
  onCategorySubmit?: (categories: string[]) => void;
  onFilterApply?: (filters: Record<string, string[]>) => void;
  activeFilters?: Record<string, string[]>;
  horizontalScroll?: boolean; // new prop to toggle scroll mode
};

const FilterBadges: React.FC<FilterBadgesProps> = React.memo(
  ({
    filterSections = [],
    sortOptions = [],
    categoryOptions = [],
    selectedSort = 'newest',
    activeFilters = {},
    onSortSubmit,
    onCategorySubmit,
    onFilterApply,
    horizontalScroll = 'false',
  }) => {
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [isSortModalVisible, setSortModalVisible] = useState(false);
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
      if (
        filterSections.length > 0 &&
        (!activeTab || !filterSections.find(s => s.name === activeTab))
      ) {
        setActiveTab(filterSections[0].name);
      }
    }, [filterSections, activeTab]);
    const badgeData = useMemo(
      () => [
        {
          text: 'Sort',
          leftIcon: SortIcon,
          rightIcon: ArrowDownIcon,
          onPress: () => setSortModalVisible(true),
          iconColor: ColorPalette.TEXT_GREY_350,
        },
        {
          text: 'Filters',
          leftIcon: FilterIcon,
          rightIcon: ArrowDownIcon,
          onPress: () => setFilterModalVisible(true),
          iconColor: ColorPalette.TEXT_GREY_350,
        },
        {
          text: 'Latest Trends',
          leftIcon: FlameOutlineIcon,
          rightIcon: ArrowDownIcon,
          onPress: () => {
            onSortSubmit?.('timestamp-desc');
          },
          iconColor: ColorPalette.ORANGE_700,
        },
        {
          text: 'Top Rated',
          leftIcon: StarOutlineIcon,
          rightIcon: ArrowDownIcon,
          onPress: () => {
            onSortSubmit?.('popularity-desc');
          },
          iconColor: ColorPalette.YELLOW_300,
        },
        // {
        //   text:
        //     selectedCategories.length > 0
        //       ? `Category (${selectedCategories.length})`
        //       : 'Category',
        //   rightIcon: ArrowDownIcon,
        //   needsEllipsis: true,
        //   onPress: () => setCategoryModalVisible(true),
        // },
      ],
      [onSortSubmit],
    );

    const handleFilterModalClose = useCallback(() => {
      setFilterModalVisible(false);
    }, []);

    const handleSortModalClose = useCallback(() => {
      setSortModalVisible(false);
    }, []);

    const handleCategoryModalClose = useCallback(() => {
      setCategoryModalVisible(false);
    }, []);

    const handleSortSubmit = useCallback(
      (selectedValue: string) => {
        setSortModalVisible(false);
        onSortSubmit?.(selectedValue);
      },
      [onSortSubmit],
    );

    const handleCategorySubmit = useCallback(
      (categories: string[]) => {
        setCategoryModalVisible(false);
        onCategorySubmit?.(categories);
      },
      [onCategorySubmit],
    );

    const renderBadges = () =>
      badgeData.map((badge, index) => (
        <View
          key={`badge-${index}`}
          style={
            horizontalScroll
              ? {marginRight: 8}
              : {flex: 1, paddingHorizontal: 2}
          }>
          <Badge
            text={badge.text}
            variant={BadgeVariant.OUTLINE}
            customContainerStyle={
              horizontalScroll
                ? styles.badgeTwoContainerScroll
                : styles.badgeTwoContainer
            }
            textVariant={TypographyVariant.LMEDIUM_MEDIUM}
            leftIcon={badge.leftIcon}
            customIconColor={badge.iconColor}
            customBorderColor={ColorPalette.WelcomeBack}
            iconSize={16}
            customTextColor={ColorPalette.TEXT_GREY_400}
            onPress={badge.onPress}
          />
        </View>
      ));

    return (
      <View style={styles.filtersContainer}>
        {horizontalScroll ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            decelerationRate="fast">
            {renderBadges()}
          </ScrollView>
        ) : (
          <View style={{flexDirection: 'row'}}>{renderBadges()}</View>
        )}

        {/* Modals here unchanged */}
        <FilterModal
          isVisible={isFilterModalVisible}
          onClose={handleFilterModalClose}
          selectedFilters={activeFilters}
          onApply={onFilterApply || (() => {})}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filterSections={filterSections}
        />
        <StatusModal
          isVisible={isSortModalVisible}
          onClose={handleSortModalClose}
          onSubmit={handleSortSubmit}
          initialStatus={selectedSort}
          options={sortOptions}
          title="Sort By"
          showSearch={false}
          selectionType="radio"
        />
        <CategoryModal
          isVisible={isCategoryModalVisible}
          onClose={handleCategoryModalClose}
          onSubmit={handleCategorySubmit}
          initialCategories={activeFilters.Category || []}
          options={categoryOptions.map(category => ({
            value: category,
            label: category,
            isSelected: (activeFilters.Category || []).includes(category),
          }))}
          title="Categories"
        />
      </View>
    );
  },
);

export default FilterBadges;
