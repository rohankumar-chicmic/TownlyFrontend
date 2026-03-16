import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';

import SearchInput from '@components/molecules/SearchInput';
import BackButton from '@components/atoms/BackButton';
import HoldingPropertyCard from '@components/molecules/HoldingPropertyCard';
import FilterButton from '@components/atoms/FilterButton';

import { useGetMyInvestedPropertiesQuery } from '@redux/PropertyApiReducer';
import { debounce, sanitizeSearch, throttle } from '@utils/utility';
import ListEmptyComponent from '@components/molecules/ListEmptyComponent';
import { InvestmentCardType } from '@utils/types';
import { ROUTES } from 'src/navigation/constants';
import { useAppNavigation } from '@hooks/useNavigation';
import { useInfiniteList } from '@hooks/useInfiniteList';

const PAGE_SIZE = 10;

const InvestedPropertiesScreen = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();

  // ================= STATE =================
  const [filter, setFilter] = useState('');
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // ================= QUERY =================
  const { data, isFetching, isLoading } = useGetMyInvestedPropertiesQuery({
    search,
    page,
    pageSize: PAGE_SIZE,
    propertyType: filter,
  });

  const {
    allItems: list,
    handleEndReached,
    isResetting,
  } = useInfiniteList(data, isFetching, setPage, [search, filter]);

  const hasMore = data?.hasMore ?? false;

  // ================= DEBOUNCED SEARCH =================
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const clean = sanitizeSearch(value);
        setSearch(clean);
      }, 300),
    [],
  );

  const handleTextChange = (val: string) => {
    setText(val);
    const hasIllegalChars = /[^a-zA-Z0-9\s,-]/.test(val);
    if (hasIllegalChars) {
      setSearch('___INVALID_SEARCH___');
      return;
    }
    debouncedSearch(val);
  };

  // ================= NAVIGATION =================
  const handleClicked = throttle((item: InvestmentCardType) => {
    navigation.navigate(ROUTES.PROPERTY_DETAILS, { id: item.propertyId });
  }, 500);

  // ================= FILTER =================
  const handleFilterChange = (newVal: string) => {
    setFilter(newVal);
  };

  // ================= FOOTER =================
  let footerComponent = null;

  if (isFetching && page > 1) {
    footerComponent = (
      <ActivityIndicator
        size="small"
        color={Colors.primary}
        style={{ marginVertical: 15 }}
      />
    );
  } else if (!hasMore && list.length > 0) {
    footerComponent = (
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 15,
          color: Colors.textSecondary,
        }}
      >
        No more properties
      </Text>
    );
  }
  const LoadingComponent = () => {
    return (
      <View style={dynamicStyles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={dynamicStyles.loadingText}>Loading portfolio...</Text>
      </View>
    );
  };

  // ================= RENDER =================
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ position: 'absolute', left: 10, zIndex: 100 }}>
          <BackButton />
        </View>
        <Text
          style={[
            dynamicStyles.heroText,
            { alignSelf: 'center', textAlign: 'center', width: '100%' },
          ]}
        >
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

      {/* LOADING (FIRST PAGE) */}

      <FlatList
        data={list}
        keyExtractor={(item, index) => `${item.investmentId}-${index}`}
        renderItem={({ item }) => (
          <HoldingPropertyCard {...item} onClick={() => handleClicked(item)} />
        )}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        style={{ backgroundColor: Colors.background }}
        ListFooterComponent={footerComponent}
        ListEmptyComponent={
          isFetching || isLoading || isResetting ? (
            <LoadingComponent/>
          ) : (
            <ListEmptyComponent />
          )
        }
      />
    </SafeAreaView>
  );
};

export default InvestedPropertiesScreen;
