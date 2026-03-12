import React, { useState, useMemo } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import styles from './styles';
import useStyles from '@hooks/useStyles';
import SearchInput from '@components/molecules/SearchInput';
import useTheme from '@hooks/useTheme';
import { useSearchPropertiesQuery } from '@redux/PropertyApiReducer';
import CardContainer2 from '@components/molecules/CardContainer2';
import CardContainerSkeleton from '@components/molecules/CardContainerSkeleton';
import ListEmptyComponent from '@components/molecules/ListEmptyComponent';
import FilterButton from '@components/atoms/FilterButton';
import { debounce, sanitizeSearch, throttle } from '@utils/utility';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import { useFeaturedProperties } from 'src/db/hooks/useProperties';
import { useNetInfo } from '@react-native-community/netinfo';
const SKELETON_COUNT = 6;
const SKELETONS = new Array(SKELETON_COUNT).fill(null);

const Marketplace = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();

  const [filter, setFilter] = useState('');
  const [text, setText] = useState('');
  const [params, setParams] = useState({ search: '', page: 1 });

  const { data, isFetching, isLoading } = useSearchPropertiesQuery({
    search: params.search,
    page: params.page,
    pageSize: 9,
    propertyType: filter,
  });

  const { data: localData } = useFeaturedProperties();
  const { isConnected } = useNetInfo();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const clean = sanitizeSearch(value);
        setParams({ search: clean, page: 1 });
      }, 200),
    [],
  );

  const handlePressed = (id: string) => {
    navigation.push(ROUTES.PROPERTY_DETAILS, { id });
  };

  const throttledHandlePressed = throttle(handlePressed, 250);

  const handleTextChange = (val: string) => {
    setText(val);
    const hasIllegalChars = /[^a-zA-Z0-9\s,-]/.test(val);
    if (hasIllegalChars) {
      setParams({ search: '___INVALID_SEARCH___', page: 1 });
      return;
    }
    debouncedSearch(val);
  };

  const handleFilterChange = (newVal: string) => {
    setFilter(newVal);
    setParams(prev => ({ ...prev, page: 1 }));
  };

  const handleEndReached = () => {
    if (!isFetching && data?.hasMore) {
      setParams(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const showSkeleton = isLoading;

  const listData = useMemo(() => {
    if (!isConnected) return localData;

    if (showSkeleton) return SKELETONS;

    return data?.items ?? [];
  }, [isConnected, showSkeleton, data?.items, localData]);

  return (
    <View style={dynamicStyles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <SearchInput text={text} onChangeText={handleTextChange} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
          padding: 10,
          paddingTop: 0,
        }}
      >
        <ScrollView horizontal style={{ overflow: 'visible' }}>
          <FilterButton
            label="All"
            value=""
            currentValue={filter}
            onPress={() => handleFilterChange('')}
          />
          <FilterButton
            label="Land"
            value="land"
            currentValue={filter}
            onPress={() => handleFilterChange('land')}
          />
          <FilterButton
            label="Commercial"
            value="commercial"
            currentValue={filter}
            onPress={() => handleFilterChange('commercial')}
          />
          <FilterButton
            label="Residential"
            value="residential"
            currentValue={filter}
            onPress={() => handleFilterChange('residential')}
          />
          <FilterButton
            label="Industrial"
            value="industrial"
            currentValue={filter}
            onPress={() => handleFilterChange('industrial')}
          />
        </ScrollView>
      </View>

      <FlatList
        data={listData}
        keyExtractor={(item, index) =>
          item ? `${item.id}` : `skeleton-${index}`
        }
        renderItem={({ item, index }) =>
          showSkeleton || !item ? (
            <CardContainerSkeleton key={`skeleton-${index}`} />
          ) : (
            <CardContainer2
              {...item}
              onClick={() => throttledHandlePressed(item.id)}
            />
          )
        }
        ListEmptyComponent={isLoading ? null : <ListEmptyComponent />}
        contentContainerStyle={{ gap: 10, paddingVertical: 15 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        style={{ backgroundColor: Colors.background }}
      />
    </View>
  );
};

export default Marketplace;
