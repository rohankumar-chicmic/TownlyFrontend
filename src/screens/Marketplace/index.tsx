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
import { useInfiniteList } from '@hooks/useInfiniteList';

const SKELETON_COUNT = 6;
const SKELETONS = new Array(SKELETON_COUNT).fill(null);

const Marketplace = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const { isConnected } = useNetInfo();

  const [filter, setFilter] = useState('');
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading } = useSearchPropertiesQuery(
    { search, page, pageSize: 9, propertyType: filter },
    { skip: !isConnected },
  );

  const { allItems, handleEndReached, isResetting } = useInfiniteList(
    data,
    isFetching,
    setPage,
    [search, filter],
  );

  const { data: localData } = useFeaturedProperties();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const clean = sanitizeSearch(value);
        setSearch(clean);
      }, 200),
    [],
  );

  const throttledHandlePressed = throttle((id: string) => {
    navigation.push(ROUTES.PROPERTY_DETAILS, { id });
  }, 500);

  const handleTextChange = (val: string) => {
    setText(val);
    const hasIllegalChars = /[^a-zA-Z0-9\s,-]/.test(val);
    if (hasIllegalChars) {
      setSearch('___INVALID_SEARCH___');
      return;
    }
    debouncedSearch(val);
  };

  const handleFilterChange = (newVal: string) => {
    setFilter(newVal);
  };

  const showSkeleton = isLoading;

  const listData = useMemo(() => {
    if (!isConnected) return localData;
    if (showSkeleton) return SKELETONS;
    return allItems;
  }, [isConnected, showSkeleton, allItems, localData]);

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
        <ScrollView
          horizontal
          style={{ overflow: 'visible' }}
          showsHorizontalScrollIndicator={false}
        >
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
        ListEmptyComponent={
          isLoading || isFetching || isResetting ? null : <ListEmptyComponent />
        }
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
