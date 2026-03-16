import React, { useState, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';

import BackButton from '@components/atoms/BackButton';
import FilterButton from '@components/atoms/FilterButton';
import { useGetTransactionsQuery } from '@redux/ApiReducer';
import TransactionRow from '@components/atoms/TransactionsRow';
import EmptyState from '@components/molecules/EmptyState';
import { useInfiniteList } from '@hooks/useInfiniteList';

const PAGE_SIZE = 20;

const TransactionsScreen = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  const flatListRef = useRef<FlatList>(null);
  const [type, setType] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);

  const { data, isFetching, isLoading } = useGetTransactionsQuery(
    { page, type, pageSize: PAGE_SIZE },
    { refetchOnMountOrArgChange: true },
  );

  const {
    allItems: transactions,
    handleEndReached,
    isResetting,
  } = useInfiniteList(data, isFetching, setPage, [type]);

  const handleTypeChange = (newType?: number) => {
    setType(newType);
    setOpenId(null);
  };

  const handleToggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const LoadingComponent = () => (
    <View style={dynamicStyles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={dynamicStyles.loadingText}>Loading Transactions...</Text>
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
          Transactions
        </Text>
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
        <FilterButton
          label="All"
          currentValue={type}
          onPress={() => handleTypeChange()}
        />
        <FilterButton
          label="Purchase"
          value={1}
          currentValue={type}
          onPress={() => handleTypeChange(1)}
        />
        <FilterButton
          label="Income"
          value={2}
          currentValue={type}
          onPress={() => handleTypeChange(2)}
        />
      </View>

      {/* LIST */}
      <FlatList
        ref={flatListRef}
        data={transactions}
        keyExtractor={item => item.transactionId.toString()}
        renderItem={({ item }) => <TransactionRow item={item} />}
        contentContainerStyle={{ padding: 10, gap: 12 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={8}
        windowSize={10} 
        initialNumToRender={10}
        getItemLayout={(_, index) => ({
          length: 64, 
          offset: 64 * index,
          index,
        })}
        ListFooterComponent={
          isFetching && page > 1 ? (
            <Text
              style={{
                textAlign: 'center',
                padding: 10,
                color: Colors.textMuted,
              }}
            >
              Loading more...
            </Text>
          ) : null
        }
        ListEmptyComponent={
          isFetching || isLoading || isResetting ? (
            <LoadingComponent />
          ) : (
            <EmptyState message="No transactions are available" />
          )
        }
        style={{ backgroundColor: Colors.background }}
      />
    </SafeAreaView>
  );
};

export default TransactionsScreen;
