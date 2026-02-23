import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import DonutGraph from '@components/molecules/DonutGraph';
import React, { useCallback } from 'react';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import useTheme from '@hooks/useTheme';
import LineGraph from '@components/molecules/LineGraph';
import Button from '@components/atoms/Button';
import { useAppNavigation } from '@hooks/useNavigation';

import { useAppDispatch, useAppSelector } from '@redux/store';
import {
  useGetMyPropertiesQuery,
  useGetMyInvestedPropertiesQuery,
  propertyApi,
} from '@redux/PropertyApiReducer';
import {
  useGetDonutGraphDataQuery,
  useGetLineGraphDataQuery,
  useGetMyInvestmentDetailsQuery,
  useGetTransactionsQuery,
} from '@redux/ApiReducer';
import KYCpendingPortfolio from './KYCpendingPortfolio';
import PortfolioWithoutAuth from './PortfolioWithoutAuth';
import { useGetKYCStatusQuery } from '@redux/KYCApiReducer';

import HoldingPropertyCard from '@components/molecules/HoldingPropertyCard';
import CardContainer2 from '@components/molecules/CardContainer2';
import { ROUTES } from 'src/navigation/constants';
import TransactionsRow from '@components/atoms/TransactionsRow';
import { useFocusEffect } from '@react-navigation/native';

const CARD_WIDTH = Dimensions.get('window').width * 0.75;

export default function Portfolio() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(state => state.auth.userToken);

  const { data: transactionsResult } = useGetTransactionsQuery({
    page: 1,
    pageSize: 4,
  });

  const InvestmentDetails = useGetMyInvestmentDetailsQuery(undefined, {
    skip: !userToken,
  });

  const { data: lineData } = useGetLineGraphDataQuery(undefined, {
    skip: !userToken,
  });

  const { data: donutData } = useGetDonutGraphDataQuery(undefined, {
    skip: !userToken,
  });

  const { data: myPropertiesResult } = useGetMyPropertiesQuery(
    { page: 1, pageSize: 4, search: '', status: '' },
    { skip: !userToken, refetchOnMountOrArgChange: true },
  );

  const { data: investedResult } = useGetMyInvestedPropertiesQuery(
    { page: 1, pageSize: 3, search: '', propertyType: '' },
    { skip: !userToken, refetchOnMountOrArgChange: true },
  );

  const previewItems = investedResult?.items?.slice(0, 3) ?? [];
  const listedPreview = myPropertiesResult?.items?.slice(0, 4) ?? [];

  // FIX: items are already sliced so length check never exceeded 4.
  // hasMore from the API is the correct source of truth.
  const showListedViewAll = myPropertiesResult?.hasMore ?? false;
  const showViewAll = investedResult?.hasMore ?? false;

  const address = useAppSelector(state => state.auth.userData?.walletAddress);
  const kycStatus = useAppSelector(state => state.kyc.status);

  useGetKYCStatusQuery(undefined, {
    skip: !userToken,
  });

  // FIX: Invalidate both lists every time Portfolio comes into focus.
  // Back-navigation does not remount the screen in React Navigation, so
  // refetchOnMountOrArgChange never fires. useFocusEffect + invalidateTags
  // forces a fresh fetch every time the screen is focused (including on back).
  useFocusEffect(
    useCallback(() => {
      dispatch(propertyApi.util.invalidateTags(['MyProperties']));
      dispatch(propertyApi.util.invalidateTags(['MyInvestedProperties']));
    }, [dispatch]),
  );

  const EmptyState = ({ message }: { message: string }) => {
    const { Colors } = useTheme();
    return (
      <View
        style={{
          padding: 20,
          alignItems: 'center',
          width: Dimensions.get('window').width * 0.8,
        }}
      >
        <Text style={{ color: Colors.textMuted, fontSize: 14 }}>{message}</Text>
      </View>
    );
  };

  if (!userToken) {
    return <PortfolioWithoutAuth />;
  }

  if (kycStatus !== 2) {
    return <KYCpendingPortfolio />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={dynamicStyles.container}
    >
      <View>
        <View style={[dynamicStyles.headerSection]}>
          <Text style={[dynamicStyles.heroPrimarytext]}>
            Investor Portfolio
          </Text>
          <Text style={[dynamicStyles.heroText]}>
            Track and manage your real-world asset investments
          </Text>
          {address && (
            <Text style={[dynamicStyles.smallText, { marginTop: 10 }]}>
              wallet:
              <Text style={{ color: Colors.primary }}>{address}</Text>
            </Text>
          )}
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            gap: 8,
            paddingVertical: 8,
            paddingHorizontal: 4,
          }}
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: Colors.border,
            marginVertical: 6,
          }}
        >
          <View style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Total Invested</Text>
            <Text style={dynamicStyles.heading}>
              {InvestmentDetails.data?.totalInvestedEth.toFixed(3)}
              {' ETH'}
            </Text>
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Current Value</Text>
            <Text style={dynamicStyles.heading}>
              {InvestmentDetails.data?.currentValueEth.toFixed(3)}
              {' ETH'}
            </Text>
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Total Returns</Text>
            <Text style={[dynamicStyles.heading, { color: Colors.success }]}>
              {'+'}
              {InvestmentDetails.data?.totalReturnEth.toFixed(3)}
              {' ETH'}
            </Text>
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Monthly Income</Text>
            <Text style={dynamicStyles.heading}>
              {InvestmentDetails.data?.monthlyIncomeEth.toFixed(3)}
              {' ETH'}
            </Text>
          </View>
        </ScrollView>
        {donutData && <DonutGraph data={donutData} />}
        {lineData && <LineGraph data={lineData} />}
        <Button
          title="Create Property"
          onPress={() => navigation.navigate('CreateNft')}
          style={{ marginVertical: 5 }}
        />

        {/* Invested Properties */}
        <View
          style={{
            marginVertical: 5,
            padding: 10,
            borderRadius: 4,
            borderWidth: 1,
            backgroundColor: Colors.surface,
            borderColor: Colors.border,
          }}
        >
          <Text style={[dynamicStyles.heading, { fontSize: 15 }]}>
            Your Property Portfolio
          </Text>
          <Text style={[dynamicStyles.smallText, { marginBottom: 10 }]}>
            Active tokenized property holdings
          </Text>
          <FlatList
            data={previewItems}
            horizontal
            initialNumToRender={3}
            keyExtractor={item => item.propertyId.toString()}
            renderItem={({ item }) => (
              <View style={{ width: Dimensions.get('screen').width * 0.7 }}>
                <HoldingPropertyCard {...item} />
              </View>
            )}
            ListEmptyComponent={
              <EmptyState message="No Investments Made yet" />
            }
            style={{ padding: 10 }}
            contentContainerStyle={dynamicStyles.flatListContainerStyle}
            ListFooterComponent={() =>
              showViewAll ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    height: Dimensions.get('screen').width * 0.32,
                    borderRadius: 8,
                    aspectRatio: 1,
                    marginVertical: 20,
                  }}
                >
                  <Button
                    onPress={() =>
                      navigation.navigate(ROUTES.INVESTED_PROPERTIES)
                    }
                    title="View All"
                  />
                </View>
              ) : null
            }
          />
        </View>

        {/* My Listed Properties */}
        <View
          style={{
            marginVertical: 5,
            padding: 10,
            borderRadius: 4,
            borderWidth: 1,
            backgroundColor: Colors.surface,
            borderColor: Colors.border,
          }}
        >
          <Text style={[dynamicStyles.heading, { fontSize: 15 }]}>
            My Listed Properties
          </Text>
          <Text style={[dynamicStyles.smallText, { marginBottom: 10 }]}>
            Properties you&apos;ve created and tokenized
          </Text>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={listedPreview}
            horizontal
            contentContainerStyle={dynamicStyles.flatListContainerStyle}
            ListEmptyComponent={<EmptyState message="No Properties Here" />}
            style={{ width: '100%', padding: 8 }}
            renderItem={({ item }) => (
              <View style={{ width: CARD_WIDTH }}>
                <CardContainer2
                  userOwned
                  {...item}
                  onClick={() => {
                    navigation.navigate(ROUTES.OWNED_PROPERTY, {
                      id: item.id,
                      status: item.status,
                    });
                  }}
                />
              </View>
            )}
            ListFooterComponent={() =>
              showListedViewAll ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    width: Dimensions.get('screen').width * 0.5,
                    aspectRatio: 1,
                    borderRadius: 8,
                  }}
                >
                  <Button
                    title="View All"
                    onPress={() =>
                      navigation.navigate(ROUTES.LISTED_PROPERTIES)
                    }
                  />
                </View>
              ) : null
            }
          />
        </View>

        {/* Recent Transactions */}
        <View
          style={{
            marginVertical: 5,
            padding: 10,
            borderRadius: 4,
            borderWidth: 1,
            backgroundColor: Colors.surface,
            borderColor: Colors.border,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <View>
              <Text style={[dynamicStyles.heading, { fontSize: 15 }]}>
                Recent Transactions
              </Text>
              <Text style={[dynamicStyles.smallText, { marginBottom: 10 }]}>
                Your latest investment activity
              </Text>
            </View>
            {transactionsResult?.hasMore && (
              <Button
                title="View all"
                textStyle={{ fontWeight: '400' }}
                size="sm"
                onPress={() => navigation.navigate(ROUTES.TRANSACTIONS)}
              />
            )}
          </View>

          {transactionsResult?.items && transactionsResult.items.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                paddingVertical: 5,
              }}
            >
              <Text style={[dynamicStyles.smallText, { width: '30%' }]}>
                Property Name
              </Text>
              <Text style={[dynamicStyles.smallText, { width: '30%' }]}>
                Amount
              </Text>
              <Text style={dynamicStyles.smallText}>Date</Text>
            </View>
          )}

          <View style={{ gap: 5, alignItems: 'center' }}>
            {transactionsResult?.items &&
            transactionsResult.items.length > 0 ? (
              transactionsResult.items.map((item: any) => (
                <TransactionsRow item={item} key={item.transactionId} />
              ))
            ) : (
              <Text style={{ color: Colors.textMuted, marginVertical: 20 }}>
                No Transactions yet
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
