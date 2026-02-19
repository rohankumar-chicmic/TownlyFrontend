import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Pressable, ActivityIndicator, FlatList } from 'react-native';
import styles from './styles';
import useStyles from '@hooks/useStyles';
import SearchInput from '@components/molecules/SearchInput';
import PropertyListing from '@components/molecules/PropertyListing';
import useTheme from '@hooks/useTheme';
import { useLazySearchPropertiesQuery } from '@redux/PropertyApiReducer';
import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type';
import CardContainer2 from '@components/molecules/CardContainer2';

const Marketplace = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  // State
  const [filter, setFilter] = useState('');
  const [text, setText] = useState(''); // Immediate UI state
  const [debouncedSearch, setDebouncedSearch] = useState(''); // Debounced state
  const [page, setPage] = useState(1);
  const [allProperties, setAllProperties] = useState<PropertyCardProps[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [triggerSearch, { data, isLoading, isFetching }] =
    useLazySearchPropertiesQuery();

  // 1. Handle Debouncing Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(text);
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [text]);

  // 2. Main Search Trigger (Refactored to be cleaner)
  const fetchProperties = useCallback(
    (currentPage: number, currentSearch: string, currentFilter: string) => {
      triggerSearch({
        search: currentSearch,
        propertyType: currentFilter,
        page: currentPage,
        pageSize: 9,
      });
    },
    [triggerSearch],
  );

  // 3. Effect: Reset and search when Search Text or Filter changes
  useEffect(() => {
    setPage(1);
    setAllProperties([]);
    setHasMore(true);
    fetchProperties(1, debouncedSearch, filter);
  }, [debouncedSearch, filter, fetchProperties]);

  // 4. Effect: Load more when page increments
  useEffect(() => {
    if (page > 1) {
      fetchProperties(page, debouncedSearch, filter);
    }
  }, [page, fetchProperties]); // Removed dependencies that would cause loops

  // 5. Effect: Sync Data to List
  useEffect(() => {
    if (data) {
      setAllProperties(prev =>
        page === 1 ? data.items : [...prev, ...data.items],
      );
      setHasMore(data.hasMore);
    }
  }, [data, page]);

  const handleEndReached = () => {
    if (!isFetching && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // UI Components
  const renderFilterButton = (label: string, value: string) => (
    <Pressable
      style={[
        dynamicStyles.tag,
        {
          borderWidth: 1,
          borderColor: filter === value ? Colors.primary : Colors.border,
        },
      ]}
      onPress={() => setFilter(value)}
    >
      <Text
        style={[
          dynamicStyles.tagText,
          { color: filter === value ? Colors.primary : Colors.textSecondary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  const footer = isFetching ? (
    <View style={dynamicStyles.footerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  ) : !hasMore && allProperties.length > 0 ? (
    <View style={dynamicStyles.footerContainer}>
      <Text style={dynamicStyles.endText}>No more properties to load</Text>
    </View>
  ) : null;

  return (
    <View style={dynamicStyles.container}>
      <SearchInput text={text} setText={setText} />

      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
        }}
      >
        {renderFilterButton('All', '')}
        {renderFilterButton('Land', 'land')}
        {renderFilterButton('Commercial', 'commercial')}
        {renderFilterButton('Residential', 'residential')}
      </View>

      {/* Main Content */}
      {isLoading && page === 1 ? (
        <View style={dynamicStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={dynamicStyles.loadingText}>Loading properties...</Text>
        </View>
      ) : (
        <FlatList
          data={allProperties}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <CardContainer2 {...item} />}
          ListFooterComponent={footer}
          // ListEmptyComponent={<ListEmptyComponent />}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          style={{ backgroundColor: Colors.background }}
        />
      )}
    </View>
  );
};

export default Marketplace;
