import { ScrollView } from 'react-native';
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

export default function Portfolio() {
  const { dynamicStyles, Colors } = useStyles(styles);
  const navigation = useAppNavigation();

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
        transactions={transactions}
        hasMore={transactionsHasMore}
      />
    </ScrollView>
  );
}
