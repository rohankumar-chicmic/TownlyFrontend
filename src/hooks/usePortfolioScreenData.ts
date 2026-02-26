import { useEffect, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useNetInfo } from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';

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

import {
  usePortfolioData,
  savePortfolioSummary,
  savePortfolioSnapshots,
  savePortfolioAllocation,
  saveProperties,
  saveTransactions,
  saveUserInvestments,
} from 'src/db/hooks/usePortfolioData';

export const usePortfolioScreenData = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useNetInfo();

  const userToken = useAppSelector(state => state.auth.userToken);
  const address = useAppSelector(state => state.auth.userData?.walletAddress);
  const kycStatus = useAppSelector(state => state.kyc.status);

  const dbData = usePortfolioData();

  /**
   * ==============================
   * RTK Queries
   * ==============================
   */

  const { data: investmentDetails, error: investmentDetailsError } =
    useGetMyInvestmentDetailsQuery(undefined, { skip: !userToken });

  const { data: lineData, error: lineDataError } = useGetLineGraphDataQuery(
    undefined,
    { skip: !userToken },
  );

  const { data: donutData, error: donutDataError } = useGetDonutGraphDataQuery(
    undefined,
    { skip: !userToken },
  );

  const { data: myPropertiesResult, error: myPropertiesError } =
    useGetMyPropertiesQuery(
      { page: 1, pageSize: 4, search: '', status: '' },
      { skip: !userToken, refetchOnMountOrArgChange: true },
    );

  const { data: investedResult, error: investedError } =
    useGetMyInvestedPropertiesQuery(
      { page: 1, pageSize: 3, search: '', propertyType: '' },
      { skip: !userToken, refetchOnMountOrArgChange: true },
    );

  const { data: transactionsResult, error: transactionsError } =
    useGetTransactionsQuery(
      { page: 1, pageSize: 4 },
      {
        skip: !userToken,
      },
    );

  useGetKYCStatusQuery(undefined, { skip: !userToken });

  /**
   * ==============================
   * Focus Refetch
   * ==============================
   */

  useFocusEffect(
    useCallback(() => {
      dispatch(propertyApi.util.invalidateTags(['MyProperties']));
      dispatch(propertyApi.util.invalidateTags(['MyInvestedProperties']));
    }, [dispatch]),
  );

  /**
   * ==============================
   * Persist To Local DB
   * ==============================
   */

  useEffect(() => {
    if (investmentDetails && !investmentDetailsError) {
      savePortfolioSummary(investmentDetails);
    }
  }, [investmentDetails, investmentDetailsError]);

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
    if (myPropertiesResult && !myPropertiesError) {
      saveProperties(myPropertiesResult.items);
    }
  }, [myPropertiesResult, myPropertiesError]);

  useEffect(() => {
    if (transactionsResult && !transactionsError) {
      saveTransactions(transactionsResult.items);
    }
  }, [transactionsResult, transactionsError]);

  useEffect(() => {
    if (investedResult && !investedError) {
      saveUserInvestments(investedResult.items);
    }
  }, [investedResult, investedError]);

  /**
   * ==============================
   * Derived / Offline Data
   * ==============================
   */

  const lineGraphData = useMemo(() => {
    if (isConnected) return lineData ?? dbData.valueHistory ?? [];
    return dbData.valueHistory ?? [];
  }, [isConnected, lineData, dbData.valueHistory]);

  const summaryData = isConnected ? investmentDetails : dbData.summary;

  const investedItems =
    (isConnected ? investedResult?.items : dbData.holdings)?.slice(0, 3) ?? [];

  const listedItems =
    (isConnected ? myPropertiesResult?.items : dbData.properties)?.slice(
      0,
      4,
    ) ?? [];

  const transactions = isConnected
    ? transactionsResult?.items
    : dbData.txHistory;

  return {
    userToken,
    address,
    kycStatus,
    isConnected,

    summaryData,
    donutData: donutData ?? dbData.allocation,
    lineGraphData,
    investedItems,
    listedItems,
    transactions,

    investedHasMore: investedResult?.hasMore ?? false,
    listedHasMore: myPropertiesResult?.hasMore ?? false,
    transactionsHasMore: isConnected && transactionsResult?.hasMore,
  };
};
