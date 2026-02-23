import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const CARD_WIDTH = Dimensions.get('window').width * 0.9;
const PAGE_SIZE = 10;

const ListedProperiesScreen = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  // ================= STATE =================
  const [status, setStatus] = useState('');
  const [text, setText] = useState('');
  const [params, setParams] = useState({
    search: '',
    page: 1,
  });

  // ================= QUERY =================
  const { data, isFetching, isLoading } = useGetMyPropertiesQuery({
    page: params.page,
    pageSize: PAGE_SIZE,
    status,
    search: params.search,
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
  const handleStatusChange = (newStatus: string | number) => {
    setStatus(newStatus as any);
    setParams(prev => ({ ...prev, page: 1 }));
  };

  // ================= PAGINATION =================
  const handleEndReached = () => {
    if (!isFetching && hasMore) {
      setParams(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={{ padding: 10 }}>
        <BackButton />
        <Text style={[dynamicStyles.heroText, { alignSelf: 'center' }]}>
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
          marginTop: 10,
        }}
      >
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
      </View>

      {/* LOADING FIRST PAGE */}
      {isLoading && params.page === 1 ? (
        <Text
          style={[
            dynamicStyles.heroText,
            { textAlign: 'center', width: '100%' },
          ]}
        >
          Loading Properties...
        </Text>
      ) : (
        <FlatList
          data={list}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ width: CARD_WIDTH }}>
              <CardContainer2
                userOwned
                {...item}
                onClick={() => {
                  console.log(item.status);
                  return navigation.navigate(ROUTES.OWNED_PROPERTY, {
                    id: item.id,
                    status: item.status,
                  });
                }}
              />
            </View>
          )}
          contentContainerStyle={{
            padding: 10,
            gap: 12,
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          style={{ backgroundColor: Colors.background }}
          ListFooterComponent={
            isFetching && params.page > 1 ? (
              <Text style={{ textAlign: 'center', padding: 10 }}>
                Loading more...
              </Text>
            ) : (
              !hasMore &&
              list.length > 0 && (
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    color: Colors.textMuted,
                  }}
                >
                  No more properties
                </Text>
              )
            )
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ListedProperiesScreen;
