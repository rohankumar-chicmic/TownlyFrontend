import { ScrollView } from 'react-native';
import { useCallback, useEffect } from 'react';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
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
import { useGetKYCStatusQuery } from '@redux/KYCApiReducer';
import { useFocusEffect } from '@react-navigation/native';
import { useAppNavigation } from '@hooks/useNavigation';
import Button from '@components/atoms/Button';

import KYCpendingPortfolio from './KYCpendingPortfolio';
import PortfolioWithoutAuth from './PortfolioWithoutAuth';
import DonutGraph from '@components/molecules/DonutGraph';
import LineGraph from '@components/molecules/LineGraph';
import InvestedPropertiesSection from '@components/molecules/InvestedPropertiesSection';
import InvestmentSummaryBar from '@components/molecules/InvestmentSummaryBar';
import ListedPropertiesSection from '@components/molecules/ListedPropertiesSection';
import PortfolioHeader from '@components/molecules/PortfolioHeader';
import RecentTransactionsSection from '@components/molecules/RecentTransactionsSection';
import {
  usePortfolioData,
  savePortfolioSummary,
  savePortfolioSnapshots,
  savePortfolioAllocation,
} from 'src/db/hooks/usePortfolioData';
import { useNetInfo } from '@react-native-community/netinfo';

export default function Portfolio() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(state => state.auth.userToken);
  const address = useAppSelector(state => state.auth.userData?.walletAddress);
  const kycStatus = useAppSelector(state => state.kyc.status);
  const { isConnected } = useNetInfo();
  const dbData = usePortfolioData();

  const { data: transactionsResult } = useGetTransactionsQuery(
    { page: 1, pageSize: 4 },
    { skip: !userToken },
  );
  const { data: InvestmentDetails, error: InvestmentDetailsError } =
    useGetMyInvestmentDetailsQuery(undefined, {
      skip: !userToken,
    });
  const { data: lineData, error: lineDataError } = useGetLineGraphDataQuery(
    undefined,
    {
      skip: !userToken,
    },
  );
  const { data: donutData, error: donutDataError } = useGetDonutGraphDataQuery(
    undefined,
    {
      skip: !userToken,
    },
  );
  const { data: myPropertiesResult } = useGetMyPropertiesQuery(
    { page: 1, pageSize: 4, search: '', status: '' },
    { skip: !userToken, refetchOnMountOrArgChange: true },
  );
  const { data: investedResult } = useGetMyInvestedPropertiesQuery(
    { page: 1, pageSize: 3, search: '', propertyType: '' },
    { skip: !userToken, refetchOnMountOrArgChange: true },
  );

  useGetKYCStatusQuery(undefined, { skip: !userToken });

  useFocusEffect(
    useCallback(() => {
      dispatch(propertyApi.util.invalidateTags(['MyProperties']));
      dispatch(propertyApi.util.invalidateTags(['MyInvestedProperties']));
    }, [dispatch]),
  );

  useEffect(() => {
    if (InvestmentDetails && !InvestmentDetailsError) {
      savePortfolioSummary(InvestmentDetails);
    }
  }, [InvestmentDetails, InvestmentDetailsError]);

  useEffect(() => {
    if (lineData && !lineDataError) {
      savePortfolioSnapshots(lineData);
    }
  }, [lineData, lineDataError]);

  useEffect(() => {
    if (donutData && !donutDataError) {
      savePortfolioAllocation(donutData);
    }
  }, [donutData, donutDataError]);

  useEffect(() => {
    if (InvestmentDetails && !InvestmentDetailsError) {
      savePortfolioSummary(InvestmentDetails);
    }
  }, [InvestmentDetails, InvestmentDetailsError]);

  if (!userToken) return <PortfolioWithoutAuth />;
  if (kycStatus !== 2) return <KYCpendingPortfolio />;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={dynamicStyles.container}
    >
      <PortfolioHeader address={address} />
      <InvestmentSummaryBar
        data={isConnected ? InvestmentDetails : dbData.summary}
      />
      {donutData && (
        <DonutGraph data={isConnected ? donutData : dbData.allocation} />
      )}
      {lineData && (
        <LineGraph data={isConnected ? lineData : dbData.valueHistory} />
      )}
      <Button
        title="Create Property"
        onPress={() => navigation.navigate('CreateNft')}
        style={{ marginVertical: 5 }}
      />
      <InvestedPropertiesSection
        items={investedResult?.items?.slice(0, 3) ?? []}
        showViewAll={investedResult?.hasMore ?? false}
      />
      <ListedPropertiesSection
        items={myPropertiesResult?.items?.slice(0, 4) ?? []}
        showViewAll={myPropertiesResult?.hasMore ?? false}
      />
      <RecentTransactionsSection
        transactions={isConnected ? transactionsResult : dbData.txHistory}
      />
    </ScrollView>
  );
}
