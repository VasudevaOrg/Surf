import React, {useEffect, useState, useCallback, useRef, memo} from 'react';
import {View, StyleSheet, InteractionManager} from 'react-native';
import MainContent from './MainContent';
import {transformHomeData} from '../../../helpers/homeDataAdaptor';
import axios from 'axios';
import {API_ENDPOINTS} from '../../../config/ApiConfig';
import {useDispatch} from 'react-redux';
import {setSupportInfo, setPageIds} from '../../../store/slices/appSlice';
import HomeErrorState from '../../../components/CustomComponents/HomeComponents/HomeErrorState/HomeErrorState';

interface CategoryPageProps {
  categoryId: string;
  userId: string | number;
  initialData?: any;
  onDataFetched?: (categoryId: string, data: any) => void;
  onLoadingUpdate?: (isLoading: boolean) => void;
  isActive: boolean;
  [key: string]: any; // Allow all other props for MainContent
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  userId,
  initialData,
  onDataFetched,
  onLoadingUpdate,
  isActive,
  ...mainContentProps
}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const isFetchingRef = useRef(false);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    async (isRefresh = false) => {
      if (isFetchingRef.current) {
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else if (!data) {
        setLoading(true);
      }

      setError(false);
      isFetchingRef.current = true;
      try {
        const response = await axios.get(
          API_ENDPOINTS.HOME_LAYOUT(400, userId || '', categoryId),
        );

        if (response.data) {
          if (response.data.nt_support_whatsapp !== undefined) {
            dispatch(
              setSupportInfo({
                whatsapp: response.data.nt_support_whatsapp,
                email: response.data.nt_support_email,
              }),
            );
          }
          if (response.data.page_ids) {
            dispatch(setPageIds(response.data.page_ids));
          }

          const transformed = transformHomeData(response.data);
          setData(transformed);
          if (onDataFetched) {
            onDataFetched(categoryId, transformed);
          }
        }
      } catch (error) {
        console.error(`Error fetching data for category ${categoryId}:`, error);
        setError(true);
      } finally {
        setLoading(false);
        setRefreshing(false);
        isFetchingRef.current = false;
      }
    },
    [categoryId, userId, data, onDataFetched, dispatch],
  );

  useEffect(() => {
    if (!initialData && isActive && categoryId !== '') {
      fetchData();
    }

    // Defer heavy rendering until after tab animation
    if (isActive) {
      const task = InteractionManager.runAfterInteractions(() => {
        setContentReady(true);
      });
      return () => task.cancel();
    }
  }, [initialData, isActive, fetchData, categoryId]);

  // Sync loading state with parent progress bar
  useEffect(() => {
    if (isActive && onLoadingUpdate) {
      onLoadingUpdate(loading || refreshing);
    }
  }, [isActive, loading, refreshing, onLoadingUpdate]);

  // Handle cross-tab refresh or external updates
  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setLoading(false);
    }
  }, [initialData]);

  const MainContentComponent = MainContent as any;

  return (
    <View style={styles.pageContainer}>
      {error && !data ? (
        <HomeErrorState onRetry={() => fetchData()} />
      ) : contentReady || initialData ? (
        <MainContentComponent
          {...mainContentProps}
          isLoading={loading}
          refreshing={refreshing}
          onRefresh={() => fetchData(true)}
          layout={data?.layout}
          categories={data?.categories || mainContentProps.categories}
          bestSellerProducts={data?.bestSellerProducts}
          newArrivalProducts={data?.newArrivalProducts}
          rocketDealProducts={data?.rocketDealProducts}
          sponsoredBrands={data?.brands}
          discountBanners={data?.discountBanners}
          // These might come from global state or parent
          popularPicksData={
            data?.popularPicksData || mainContentProps.popularPicksData
          }
          rocketDealsData={
            data?.rocketDealsData || mainContentProps.rocketDealsData
          }
        />
      ) : (
        <View style={{flex: 1, backgroundColor: 'white'}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
});

export default memo(CategoryPage);
