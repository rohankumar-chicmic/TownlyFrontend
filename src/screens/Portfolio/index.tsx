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
} from '@redux/PropertyApiReducer';
import {
  useGetDonutGraphDataQuery,
  useGetLineGraphDataQuery,
  useGetMyInvestmentDetailsQuery,
} from '@redux/ApiReducer';
import KYCpendingPortfolio from './KYCpendingPortfolio';
import PortfolioWithoutAuth from './PortfolioWithoutAuth';
import { useFocusEffect } from '@react-navigation/native';
import { useGetKYCStatusQuery } from '@redux/KYCApiReducer';

import HoldingPropertyCard from '@components/molecules/HoldingPropertyCard';
import CardContainer2 from '@components/molecules/CardContainer2';
import { ROUTES } from 'src/navigation/constants';
import TransactionRow from '@components/atoms/TransactionsRow';

const InvestPropertyData = {
  id: 'property-001',
  imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  name: 'Suburban Family Home',
  location: '9943 Marlowe St, Detroit, MI',

  tokensOwned: 501,
  totalInvestedEth: 0.8203,
  currentValueEth: 0.8398,
  totalReturnEth: 0.0195,
  monthlyIncomeEth: 0.0057,
  annualYield: 8.5,

  riskScore: 3.4,
  riskLabel: 'Low Moderate Risk',
};

export const DUMMY_PORTFOLIO = [
  {
    propertyId: 'ab35368b-b41a-41cb-bdaa-d6e2afe47c0f',
    propertyName: 'Burger King',
    imageUrl:
      'https://curb360.com/wp-content/uploads/2024/09/A_serene_real_estate_scene_captured_during_sunset_converted.jpg',
    location: 'Rajpura, PB',
    tokensOwned: 900,
    investedEth: 3053.57,
    currentValueEth: 3078.1066,
    unrealizedPnLEth: 24.5366,
    unrealizedPnLPercent: 0.8,
    monthlyIncomeEth: 589.9704,
    riskScore: 6.5,
  },
  {
    propertyId: 'bc22459c-c52b-52dc-cebb-e7f3bfe58d1g',
    propertyName: 'Suburban Villa',
    imageUrl:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
    location: 'Detroit, MI',
    tokensOwned: 501,
    investedEth: 0.8203,
    currentValueEth: 0.8398,
    unrealizedPnLEth: 0.0195,
    unrealizedPnLPercent: 2.37,
    monthlyIncomeEth: 0.0057,
    riskScore: 3.4,
  },
  {
    propertyId: 'de44671e-e74d-74fe-efdd-g9h5ihg70j3i',
    propertyName: 'Skyline Penthouse',
    imageUrl:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    location: 'Downtown Dubai',
    tokensOwned: 120,
    investedEth: 5.42,
    currentValueEth: 5.85,
    unrealizedPnLEth: 0.43,
    unrealizedPnLPercent: 7.93,
    monthlyIncomeEth: 0.045,
    riskScore: 2.1,
  },
];

const CARD_WIDTH = Dimensions.get('window').width * 0.75;

export default function Portfolio() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const userToken = useAppSelector(state => state.auth.userToken);

  const { data, isLoading, error, refetch } = useGetMyPropertiesQuery(
    undefined,
    { skip: !userToken },
  );

  const {
    data: investedList,
    isLoading: investedLoading,
    error: investedError,
    refetch: investedRefetch,
  } = useGetMyInvestedPropertiesQuery(undefined, { skip: !userToken });

  const InvestmentDetails = useGetMyInvestmentDetailsQuery(undefined, {
    skip: !userToken,
  });

  const {
    data: lineData,
    isLoading: lineLoading,
    error: lineError,
  } = useGetLineGraphDataQuery(undefined, {
    skip: !userToken,
  });

  const {
    data: donutData,
    isLoading: donutLoading,
    error: donutError,
  } = useGetDonutGraphDataQuery(undefined, {
    skip: !userToken,
  });

  const address = useAppSelector(state => state.auth.userData?.walletAddress);
  const kycStatus = useAppSelector(state => state.kyc.status);

  useFocusEffect(
    useCallback(() => {
      if (!userToken) return;
      refetch();
    }, []),
  );

  useGetKYCStatusQuery(undefined, {
    skip: !userToken,
  });

  if (!userToken) {
    return <PortfolioWithoutAuth />;
  }

  if (kycStatus !== 2) {
    return <KYCpendingPortfolio />;
  }
  console.log(data);
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
          {/* <View style={dynamicStyles.dataPanel}> */}
          <View style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Total Invested</Text>
            <Text style={dynamicStyles.heading}>
              {InvestmentDetails.data?.totalInvestedEth.toFixed(3)}
            </Text>
            {/* <Text style={dynamicStyles.smallText}></Text> */}
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Current Value</Text>
            <Text style={dynamicStyles.heading}>
              {InvestmentDetails.data?.currentValueEth.toFixed(3)}
            </Text>
            {/* <Text
              style={[dynamicStyles.smallText, { color: Colors.primary }]}
            ></Text> */}
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Total Returns</Text>
            <Text style={dynamicStyles.heading}>
              {InvestmentDetails.data?.totalReturnEth.toFixed(3)}
            </Text>
            {/* <Text style={dynamicStyles.smallText}></Text> */}
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Monthly Income</Text>
            <Text style={dynamicStyles.heading}>
              {InvestmentDetails.data?.monthlyIncomeEth.toFixed(3)}
            </Text>
            {/* <Text style={dynamicStyles.smallText}></Text> */}
            {/* </View> */}
          </View>
        </ScrollView>
        {donutData && <DonutGraph data={donutData}></DonutGraph>}
        {lineData && <LineGraph data={lineData}></LineGraph>}
        <Button
          title="Create Property"
          onPress={() => navigation.navigate('CreateNft')}
          style={{ marginVertical: 5 }}
        ></Button>

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
            keyExtractor={item => item.id}
            data={data?.items}
            horizontal
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 10,
            }}
            renderItem={({ item }) => (
              <View style={{ width: CARD_WIDTH }}>
                <CardContainer2 userOwned {...item} />
              </View>
            )}
            ListFooterComponent={() =>
              data?.hasMore ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    width: Dimensions.get('screen').width * 0.5,
                    aspectRatio: 1 / 1,
                    borderRadius: 8,

                    backgroundColor: Colors.elevated,
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
            Properties you&apos;ve created and tokenized
          </Text>
          <FlatList
            data={investedList?.items}
            horizontal
            initialNumToRender={3}
            keyExtractor={item => item.investmentId.toString()}
            renderItem={({ item }) => <HoldingPropertyCard {...item} />}
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 10,
              paddingHorizontal: 5,
            }}
            ListFooterComponent={() =>
              investedList?.hasMore ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    height: Dimensions.get('screen').width * 0.45,
                    borderRadius: 8,
                    aspectRatio: 1 / 1,
                    marginVertical: 20,
                    backgroundColor: Colors.elevated,
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
              alignItems: 'center',
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
            <Button
              title="View All transactions"
              textStyle={{
                fontWeight: '400',
              }}
              size="sm"
              onPress={function (): void {
                console.log('Function not implemented.');
              }}
            ></Button>
          </View>
          <ScrollView
          nestedScrollEnabled
            contentContainerStyle={{ gap: 10 }}
            showsVerticalScrollIndicator
            style={{ maxHeight: Dimensions.get('screen').height * 0.3 }}
          >
            <TransactionRow type={'Income'} amount={'+34758 ETH'} status={'Completed'} />
            <TransactionRow type={''} amount={''} status={''} />
            <TransactionRow type={''} amount={''} status={''} />
            <TransactionRow type={''} amount={''} status={''} />
            <TransactionRow type={''} amount={''} status={''} />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
