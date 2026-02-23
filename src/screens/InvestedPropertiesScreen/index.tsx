import React, { useState, useMemo } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';

//unused comment import InvestedPropertyCard from '@components/molecules/InvestedPropertyCard';
import SearchInput from '@components/molecules/SearchInput';
import BackButton from '@components/atoms/BackButton';
import HoldingPropertyCard from '@components/molecules/HoldingPropertyCard';
import FilterButton from '@components/atoms/FilterButton';

import { useGetMyInvestedPropertiesQuery } from '@redux/PropertyApiReducer';
import { debounce, sanitizeSearch } from '@utils/utility';

const PAGE_SIZE = 10;

const InvestedPropertiesScreen = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  // ================= STATE =================
  const [filter, setFilter] = useState('');
  const [text, setText] = useState('');
  const [params, setParams] = useState({
    search: '',
    page: 1,
  });

  // ================= QUERY =================
  const { data, isFetching, isLoading } = useGetMyInvestedPropertiesQuery({
    search: params.search,
    page: params.page,
    pageSize: PAGE_SIZE,
    propertyType: filter,
  });

  const list = data?.items ?? [];
  const hasMore = data?.hasMore ?? false;

  // ================= DEBOUNCED SEARCH =================
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const clean = sanitizeSearch(value);
        setParams({ search: clean, page: 1 });
      }, 300),
    [],
  );

  const handleTextChange = (val: string) => {
    setText(val);

    const hasIllegalChars = /[^a-zA-Z0-9\s,-]/.test(val);
    if (hasIllegalChars) {
      setParams({ search: '___INVALID_SEARCH___', page: 1 });
      return;
    }

    debouncedSearch(val);
  };

  // ================= FILTER =================
  const handleFilterChange = (newVal: string) => {
    setFilter(newVal);
    setParams(prev => ({ ...prev, page: 1 }));
  };

  // ================= PAGINATION =================
  const handleEndReached = () => {
    if (!isFetching && hasMore) {
      setParams(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  // ================= RENDER =================
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={{ padding: 10 }}>
        <BackButton />
        <Text style={[dynamicStyles.heroText, { alignSelf: 'center' }]}>
          Your Invested Properties
        </Text>
      </View>

      {/* SEARCH */}
      <View style={dynamicStyles.container}>
        <SearchInput text={text} onChangeText={handleTextChange} />
      </View>

      {/* FILTER TABS */}
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
        }}
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
      </View>

      {/* LOADING (FIRST PAGE) */}
      {isLoading && params.page === 1 ? (
        <View style={dynamicStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={dynamicStyles.loadingText}>Loading portfolio...</Text>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item, index) => `${item.investmentId}-${index}`}
          renderItem={({ item }) => <HoldingPropertyCard {...item} />}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          style={{ backgroundColor: Colors.background }}
          ListFooterComponent={
            isFetching && params.page > 1 ? (
              <ActivityIndicator
                size="small"
                color={Colors.primary}
                style={{ marginVertical: 15 }}
              />
            ) : !hasMore && list.length > 0 ? (
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: 15,
                  color: Colors.textSecondary,
                }}
              >
                No more invested properties
              </Text>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default InvestedPropertiesScreen;
