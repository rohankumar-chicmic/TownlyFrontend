import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import DonutGraph from '@components/molecules/DonutGraph';
import React, { useCallback } from 'react';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import useTheme from '@hooks/useTheme';
import LineGraph from '@components/molecules/LineGraph';
import Button from '@components/atoms/Button';
import { useAppNavigation } from '@hooks/useNavigation';

import { useAppDispatch, useAppSelector } from '@redux/store';
import { useGetMyPropertiesQuery } from '@redux/PropertyApiReducer';
import PropertyListing from '@components/molecules/PropertyListing';
import {
  useGetDonutGraphDataQuery,
  useGetLineGraphDataQuery,
  useGetMyInvestmentDetailsQuery,
} from '@redux/ApiReducer';
import KYCpendingPortfolio from './KYCpendingPortfolio';
import PortfolioWithoutAuth from './PortfolioWithoutAuth';
import { useFocusEffect } from '@react-navigation/native';
import { resetKyc } from '@redux/KYCReducer';
import { linea } from 'viem/chains';

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
  console.log(data);

  useFocusEffect(
    useCallback(() => {
      if (!userToken) return;
      refetch();
    }, []),
  );

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
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: Colors.border,
            marginVertical: 5,
            paddingVertical: 5,
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
            borderWidth: 1,
            backgroundColor: Colors.surface,
            borderColor: Colors.border,
          }}
        >
          <Text style={dynamicStyles.heading}> Your Property Portfolio</Text>
          <PropertyListing horizontal data={data}></PropertyListing>
        </View>
      </View>
    </ScrollView>
  );
}
