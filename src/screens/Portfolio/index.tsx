import { ScrollView, Text, View } from 'react-native';
import useStyles from '@hooks/useStyles';
import styles from './styles';
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

import { usePortfolioScreenData } from '@hooks/usePortfolioScreenData';
import PortfolioSkeleton from '@components/molecules/SkeletonPortfolio';
import OfflineTasksQueue from '@components/molecules/OfflineTasksQueue';
import { useGetIncompleteTasks } from 'src/db/hooks/useOfflineQueue';
import { useFocusEffect } from '@react-navigation/native';
import { OfflineTask } from '@utils/types';
import { useCallback, useState } from 'react';

export default function Portfolio() {
  const { dynamicStyles, Colors } = useStyles(styles);
  const navigation = useAppNavigation();
  
  const res = useGetIncompleteTasks();
  const tasks = res.data as OfflineTask[] | undefined;

  const {
    userToken,
    address,
    kycStatus,
    summaryData,
    donutData,
    lineGraphData,
    investedItems,
    listedItems,
    transactions,
    investedHasMore,
    listedHasMore,
    transactionsHasMore,
    isLoading,
  } = usePortfolioScreenData();


  if (isLoading) return <PortfolioSkeleton />;

  if (!userToken) return <PortfolioWithoutAuth />;
  if (kycStatus !== 2) return <KYCpendingPortfolio />;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={dynamicStyles.container}
    >
      <PortfolioHeader address={address} />

      <InvestmentSummaryBar data={summaryData} />

      <DonutGraph data={donutData} />

      <LineGraph data={lineGraphData} />

      <Button
        title="Create Property"
        onPress={() => navigation.navigate('CreateNft')}
        style={{ marginVertical: 5 }}
      />

      <InvestedPropertiesSection
        items={investedItems}
        showViewAll={investedHasMore}
      />

      <ListedPropertiesSection
        items={listedItems}
        showViewAll={listedHasMore}
      />

      <RecentTransactionsSection
        transactions={transactions?.slice(0, 5)}
        hasMore={transactionsHasMore}
      />

      {tasks && tasks.length > 0 && (
        <View style={[dynamicStyles.containerStyle]}>
          <Text style={[dynamicStyles.heading, { fontSize: 15 }]}>
            Offline Tasks
          </Text>
          <Text style={[dynamicStyles.smallText]}>
            These tasks will be performed connect is restored.
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <OfflineTasksQueue
              tasks={tasks}
              onDiscard={taskId => console.log('Discard task', taskId)}
              onRetry={taskId => console.log('Retry task', taskId)}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
