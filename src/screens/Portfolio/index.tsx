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
  useLazyGetMyPropertiesQuery,
  useLazyGetMyInvestedPropertiesQuery,
} from '@redux/PropertyApiReducer';
import {
  useGetDonutGraphDataQuery,
  useGetLineGraphDataQuery,
  useGetMyInvestmentDetailsQuery,
  useLazyGetTransactionsQuery,
} from '@redux/ApiReducer';
import KYCpendingPortfolio from './KYCpendingPortfolio';
import PortfolioWithoutAuth from './PortfolioWithoutAuth';
import { useFocusEffect } from '@react-navigation/native';
import { useGetKYCStatusQuery } from '@redux/KYCApiReducer';

import HoldingPropertyCard from '@components/molecules/HoldingPropertyCard';
import CardContainer2 from '@components/molecules/CardContainer2';
import { ROUTES } from 'src/navigation/constants';
import TransactionsRow from '@components/atoms/TransactionsRow';

const CARD_WIDTH = Dimensions.get('window').width * 0.75;

export default function Portfolio() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();

  const userToken = useAppSelector(state => state.auth.userToken);

  const [triggerMyProperties, myPropertiesResult] =
    useLazyGetMyPropertiesQuery();

  const [triggerTransactions, transactionsResult] =
    useLazyGetTransactionsQuery();

  const [triggerInvested, investedResult] =
    useLazyGetMyInvestedPropertiesQuery();

  const InvestmentDetails = useGetMyInvestmentDetailsQuery(undefined, {
    skip: !userToken,
  });

  console.log(investedResult.data);

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

  useGetKYCStatusQuery(undefined, {
    skip: !userToken,
  });

  if (!userToken) {
    return <PortfolioWithoutAuth />;
  }

  if (kycStatus !== 2) {
    return <KYCpendingPortfolio />;
  }

  useFocusEffect(
    useCallback(() => {
      if (!userToken) return;

      triggerMyProperties({
        page: 1,
        pageSize: 5,
      });

      triggerInvested({
        page: 1,
        pageSize: 3,
        propertyType: 'commercial',
      });

      triggerTransactions({
        page: 1,
        pageSize: 4,
      });
    }, [userToken]),
  );

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
            keyExtractor={item => {
              return item.id.toString();
            }}
            data={myPropertiesResult.data?.items}
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
              myPropertiesResult.data?.hasMore ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    width: Dimensions.get('screen').width * 0.5,
                    aspectRatio: 1,
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
            data={investedResult.data?.items}
            horizontal
            initialNumToRender={3}
            keyExtractor={item => item.propertyId.toString()}
            renderItem={({ item }) => (
              <View style={{ width: Dimensions.get('screen').width * 0.7 }}>
                <HoldingPropertyCard {...item} />
              </View>
            )}
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 10,
              paddingHorizontal: 5,
            }}
            ListFooterComponent={() =>
              investedResult.data?.hasMore ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    height: Dimensions.get('screen').width * 0.32,
                    borderRadius: 8,
                    aspectRatio: 1,
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
            <Button
              title="View all"
              textStyle={{
                fontWeight: '400',
              }}
              size="sm"
              onPress={function (): void {
                console.log('Function not implemented.');
              }}
            ></Button>
          </View>

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
            <Text style={dynamicStyles.smallText}> Date</Text>
          </View>

          <View style={{ gap: 5, alignItems: 'center' }}>
            {transactionsResult?.data?.items.map(item => (
              <TransactionsRow
                item={item}
                key={item.transactionId}
              ></TransactionsRow>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
