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
} from 'src/db/hooks/usePortfolioLocalData';

export const usePortfolioScreenData = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useNetInfo();

  const userToken = useAppSelector(state => state.auth.userToken);
  const address = useAppSelector(state => state.auth.userData?.walletAddress);
  const kycStatus = useAppSelector(state => state.kyc.status);

  const dbData = usePortfolioData();

  const skipFetch = !isConnected || isConnected === null;

  const {
    data: investmentDetails,
    error: investmentDetailsError,
    isLoading: summaryLoading,
  } = useGetMyInvestmentDetailsQuery(undefined, {
    skip: !userToken || skipFetch,
  });

  const {
    data: lineData,
    error: lineDataError,
    isLoading: lineLoading,
  } = useGetLineGraphDataQuery(undefined, {
    skip: !userToken || skipFetch,
  });

  const {
    data: donutData,
    error: donutDataError,
    isLoading: donutLoading,
  } = useGetDonutGraphDataQuery(undefined, {
    skip: !userToken || skipFetch,
  });

  const {
    data: myPropertiesResult,
    error: myPropertiesError,
    isLoading: propertiesLoading,
  } = useGetMyPropertiesQuery(
    { page: 1, pageSize: 5, search: '', status: '' },
    {
      skip: !userToken || skipFetch,
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: investedResult,
    error: investedError,
    isLoading: investedLoading,
  } = useGetMyInvestedPropertiesQuery(
    { page: 1, pageSize: 3, search: '', propertyType: '' },
    {
      skip: !userToken || skipFetch,
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: transactionsResult,
    error: transactionsError,
    isLoading: transactionsLoading,
  } = useGetTransactionsQuery(
    { page: 1, pageSize: 4 },
    {
      skip: !userToken || skipFetch,
    },
  );

  useGetKYCStatusQuery(undefined, {
    skip: !userToken || skipFetch,
  });

  // ==============================
  // Loading State
  // ==============================
  const isLoading =
    !skipFetch &&
    (summaryLoading ||
      lineLoading ||
      donutLoading ||
      propertiesLoading ||
      investedLoading ||
      transactionsLoading) &&
    !dbData.summary;

  // ==============================
  // Refetch on focus — removed duplicate invalidations,
  // combined into single dispatch, only runs when connected
  // ==============================
  useFocusEffect(
    useCallback(() => {
      if (!isConnected) return;
      dispatch(
        propertyApi.util.invalidateTags([
          'MyProperties',
          'MyInvestedProperties',
        ]),
      );
    }, [dispatch, isConnected]),
  );

  // ==============================
  // Save API data to SQLite
  // ==============================
  useEffect(() => {
    if (investmentDetails && !investmentDetailsError)
      savePortfolioSummary(investmentDetails);
  }, [investmentDetails, investmentDetailsError]);

  useEffect(() => {
    if (lineData && !lineDataError) savePortfolioSnapshots(lineData);
  }, [lineData, lineDataError]);

  useEffect(() => {
    if (donutData && !donutDataError) savePortfolioAllocation(donutData);
  }, [donutData, donutDataError]);

  useEffect(() => {
    if (myPropertiesResult && !myPropertiesError)
      saveProperties(myPropertiesResult.items);
  }, [myPropertiesResult, myPropertiesError]);

  useEffect(() => {
    if (transactionsResult && !transactionsError)
      saveTransactions(transactionsResult.items);
  }, [transactionsResult, transactionsError]);

  useEffect(() => {
    if (investedResult && !investedError)
      saveUserInvestments(investedResult.items);
  }, [investedResult, investedError]);

  // ==============================
  // Derived Data — API first → fallback to SQLite
  // ==============================
  const summaryData = useMemo(
    () => investmentDetails ?? dbData.summary,
    [investmentDetails, dbData.summary],
  );

  const lineGraphData = useMemo(
    () => lineData ?? dbData.valueHistory?.[0]?.data ?? [],
    [lineData, dbData.valueHistory],
  );

  const donutGraphData = useMemo(
    () => donutData ?? dbData.allocation,
    [donutData, dbData.allocation],
  );

  const investedItems = useMemo(
    () => (investedResult?.items ?? dbData.holdings ?? []).slice(0, 3),
    [investedResult, dbData.holdings],
  );

  const listedItems = useMemo(
    () => (myPropertiesResult?.items ?? dbData.properties ?? []).slice(0, 4),
    [myPropertiesResult, dbData.properties],
  );

  const transactions = useMemo(
    () => transactionsResult?.items ?? dbData.txHistory,
    [transactionsResult, dbData.txHistory],
  );

  return {
    userToken,
    address,
    kycStatus,
    isConnected,
    isLoading,
    summaryData,
    donutData: donutGraphData,
    lineGraphData,
    investedItems,
    listedItems,
    transactions,
    investedHasMore: investedResult?.hasMore ?? false,
    listedHasMore: myPropertiesResult?.hasMore ?? false,
    transactionsHasMore: transactionsResult?.hasMore ?? false,
  };
};
