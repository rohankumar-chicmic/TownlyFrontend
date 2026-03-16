import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { throttle } from '@utils/utility';
import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';

import BackButton from '@components/atoms/BackButton';
import CardContainer2 from '@components/molecules/CardContainer2';
import FilterButton from '@components/atoms/FilterButton';
import SearchInput from '@components/molecules/SearchInput';

import { useGetMyPropertiesQuery } from '@redux/PropertyApiReducer';
import { debounce, sanitizeSearch } from '@utils/utility';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import ListEmptyComponent from '@components/molecules/ListEmptyComponent';
import { PropertyCardProps } from '@utils/types';
import { useInfiniteList } from '@hooks/useInfiniteList';

const CARD_WIDTH = Dimensions.get('window').width * 0.9;
const PAGE_SIZE = 10;

const ListedPropertiesScreen = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();

  const [status, setStatus] = useState('');
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading } = useGetMyPropertiesQuery({
    page,
    pageSize: PAGE_SIZE,
    status,
    search,
  });

  const {
    allItems: list,
    handleEndReached,
    isResetting,
  } = useInfiniteList(data, isFetching, setPage, [search, status]);

  const hasMore = data?.hasMore ?? false;

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

  const handleStatusChange = (newStatus: string | number) => {
    setStatus(newStatus as string);
  };

  const handleClicked = throttle((item: PropertyCardProps) => {
    navigation.navigate(ROUTES.OWNED_PROPERTY, {
      id: item.id,
      status: item.status ?? undefined,
    });
  }, 500);

  const footer = useMemo(() => {
    if (isFetching && page > 1) {
      return (
        <Text style={{ textAlign: 'center', padding: 10 }}>
          Loading more...
        </Text>
      );
    }
    if (!hasMore && list.length > 0) {
      return (
        <Text
          style={{ textAlign: 'center', padding: 10, color: Colors.textMuted }}
        >
          No more properties
        </Text>
      );
    }
    return null;
  }, [isFetching, page, hasMore, list.length, Colors.textMuted]);

  const LoadingComponent = () => (
    <View style={dynamicStyles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={dynamicStyles.loadingText}>Loading Properties...</Text>
    </View>
  );

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
          My Listed Properties
        </Text>
      </View>

      {/* SEARCH */}
      <View style={{ paddingHorizontal: 10 }}>
        <SearchInput text={text} onChangeText={handleTextChange} />
      </View>

      {/* FILTERS */}
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
          padding: 7,
          paddingTop: 0,
        }}
      >
        <ScrollView horizontal>
          <FilterButton
            label="All"
            value=""
            currentValue={status}
            onPress={() => handleStatusChange('')}
          />
          <FilterButton
            label="Pending"
            value={1}
            currentValue={status}
            onPress={() => handleStatusChange(1)}
          />
          <FilterButton
            label="Active"
            value={2}
            currentValue={status}
            onPress={() => handleStatusChange(2)}
          />
          <FilterButton
            label="Sold out"
            value={3}
            currentValue={status}
            onPress={() => handleStatusChange(3)}
          />
          <FilterButton
            label="Rejected"
            value={4}
            currentValue={status}
            onPress={() => handleStatusChange(4)}
          />
          <FilterButton
            label="Modification Required"
            value={5}
            currentValue={status}
            onPress={() => handleStatusChange(5)}
          />
        </ScrollView>
      </View>

      <FlatList
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ width: CARD_WIDTH }}>
            <CardContainer2
              {...item}
              userOwned
              onClick={() => handleClicked(item)}
            />
          </View>
        )}
        contentContainerStyle={{
          padding: 10,
          gap: 12,
          flexGrow: 1,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        style={{ backgroundColor: Colors.background, height: '100%' }}
        ListFooterComponent={footer}
        ListEmptyComponent={
          isFetching || isLoading || isResetting ? <LoadingComponent/> : <ListEmptyComponent />
        }
      />
    </SafeAreaView>
  );
};

export default ListedPropertiesScreen;
