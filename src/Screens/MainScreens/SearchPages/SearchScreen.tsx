import React, { useMemo, useCallback } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  addSearch,
  clearHistory,
  removeSearch,
} from '../../../store/slices/searchSlice';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './SearchScreen.styles';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeft';
import { goBack, navigate } from '../../../utils/navigationref';
import MicrophoneIcon from '../../../assets/icons/MicrophoneIcon';
import { SearchBox } from '../../../components/CustomComponents/SearchBox/SearchBox';
import { MenuItem } from '../../../components/CustomComponents/MenuItem/MenuItem';
import HistoryIcon from '../../../assets/icons/HistoryIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import GoArrow from '../../../assets/icons/GoArrow';
import { CartIcon } from '../../../assets/icons/BottomNavIcons';
import ColorPalette from '../../../config/ColorPalette';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { Badge } from '../../../components/MainComponents/Badges/Badge';
import {
  BadgeType,
  BadgeVariant,
} from '../../../components/MainComponents/Badges/Badge.types';
import { SUGGESTED_TAGS, DEFAULT_HISTORY_ITEMS } from './SearchScreen.constants';
import VoiceSearchModal from '../../../components/CustomComponents/VoiceSearch/VoiceSearchModal';
import ScreenWrapper from '../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

const MemoizedMenuItem = React.memo(MenuItem);
const MemoizedBadge = React.memo(Badge);

const SearchScreen = () => {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.search.history);
  const [isVoiceModalVisible, setIsVoiceModalVisible] = React.useState(false);
  const handleNavigateToSearchResult = useCallback(
    (searchQuery = '') => {
      if (searchQuery.trim()) {
        dispatch(addSearch(searchQuery));
      }
      navigate('MainScreens', {
        screen: 'Search',
        params: {
          screen: 'SearchResultScreen',
          params: { searchQuery },
        },
      });
    },
    [dispatch],
  );

  const handleItemPress = useCallback(
    (item: string) => {
      handleNavigateToSearchResult(item);
    },
    [handleNavigateToSearchResult],
  );

  const handleTagPress = useCallback(
    (tag: string) => {
      handleNavigateToSearchResult(tag);
    },
    [handleNavigateToSearchResult],
  );

  const historyItems = useMemo(
    () =>
      history.map(label => ({
        label,
        onPress: () => handleItemPress(label),
        leftIcon: <HistoryIcon style={undefined} size={24} />,
        rightIcon: (
          <TouchableOpacity onPress={() => dispatch(removeSearch(label))}>
            <CloseIcon
              style={undefined}
              size={16}
              color={ColorPalette.TEXT_GREY_100 as string}
            />
          </TouchableOpacity>
        ),
      })),
    [history, handleItemPress, dispatch],
  );

  return (
    // <SafeAreaView style={{flex: 1}} edges={['bottom']}>
    <ScreenWrapper
      backgroundColor={ColorPalette.WelcomeBack}
      edges={['top', 'bottom']}>
      <View style={styles.searchContainer}>
        <ArrowLeftIcon style={undefined} onPress={goBack} />
        <TouchableOpacity
          style={styles.searchBoxContainer}
          onPress={() => handleNavigateToSearchResult('')}
          activeOpacity={0.8}>
          <SearchBox
            value=""
            onChangeText={() => { }}
            placeholder="Search Products"
            customContainerStyle={styles.searchInput}
            editable={false}
          />
          <View style={styles.micIconContainer}>
            <MicrophoneIcon
              size={20}
              color="#606060"
              style={undefined}
              onPress={() => setIsVoiceModalVisible(true)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Cart' as never)}>
          <CartIcon style={undefined} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View>
          {history.length > 0 && (
            <View style={styles.historyHeader}>
              <Typography
                text="Recent Searches"
                variant={TypographyVariant.PMEDIUM_MEDIUM}
                customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
              />
              <TouchableOpacity onPress={() => dispatch(clearHistory())}>
                <Typography
                  text="Clear All"
                  variant={TypographyVariant.LSMALL_REGULAR}
                  customTextStyles={{ color: ColorPalette.HOME_BLUE }}
                />
              </TouchableOpacity>
            </View>
          )}
          {historyItems.map((item, index) => (
            <MemoizedMenuItem
              key={`history-${index}`}
              label={item.label}
              leftIcon={item.leftIcon}
              rightIcon={item.rightIcon}
              onPress={item.onPress}
              textStyle={{ color: ColorPalette.TEXT_GREY_500 }}
              variant={TypographyVariant.PMEDIUM_REGULAR}
              contentStyle={{ gap: getScreenWidth(3) }}
              showBottomBorder={true}
              isLastItem={index === historyItems.length - 1}
              containerStyle={styles.historyItem}
            />
          ))}
        </View>

        <View style={styles.discoverContainer}>
          <Typography
            text="Discover More"
            variant={TypographyVariant.PMEDIUM_MEDIUM}
            customTextStyles={{ color: ColorPalette.TEXT_GREY_500 }}
          />
          <SuggestionTags tags={SUGGESTED_TAGS} onTagPress={handleTagPress} />
        </View>
      </ScrollView>
      <VoiceSearchModal
        isVisible={isVoiceModalVisible}
        onClose={() => setIsVoiceModalVisible(false)}
        onResult={text => handleNavigateToSearchResult(text)}
      />
      {/* </SafeAreaView> */}
    </ScreenWrapper>
  );
};

const SuggestionTags = React.memo(
  ({ tags, onTagPress }: { tags: string[]; onTagPress: (tag: string) => void }) => {
    return (
      <View style={styles.badgeContainer}>
        {tags.map((tag, index) => (
          <MemoizedBadge
            key={`badge-${index}`}
            text={tag}
            variant={BadgeVariant.FILLED}
            type={BadgeType.PRIMARY}
            onPress={() => onTagPress(tag)}
            textVariant={TypographyVariant.LMEDIUM_REGULAR}
            customTextColor={ColorPalette.TEXT_GREY_400}
            customContainerStyle={styles.singleBadge}
          />
        ))}
      </View>
    );
  },
);

export default React.memo(SearchScreen);
