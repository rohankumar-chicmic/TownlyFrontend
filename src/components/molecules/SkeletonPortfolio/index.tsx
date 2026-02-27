// components/molecules/PortfolioSkeleton/index.tsx
import { View, ScrollView, Dimensions } from 'react-native';
import useTheme from '@hooks/useTheme';
import SkeletonBox from '@components/atoms/SkeletonBox';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.7;

// Matches PortfolioHeader
function HeaderSkeleton() {
  return (
    <View style={{ paddingVertical: 12, gap: 8 }}>
      <SkeletonBox width={160} height={14} />
      <SkeletonBox width={220} height={20} borderRadius={10} />
    </View>
  );
}

// Matches InvestmentSummaryBar — horizontal scroll of 4 cards
function SummaryBarSkeleton({
  borderColor,
}: Readonly<{ borderColor: string }>) {
  return (
    <ScrollView
      horizontal
      scrollEnabled={false}
      contentContainerStyle={{
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 4,
      }}
      style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor,
        marginVertical: 6,
      }}
    >
      {[1, 2, 3, 4].map(i => (
        <View key={i} style={{ width: 130, gap: 8, padding: 10 }}>
          <SkeletonBox width={90} height={12} />
          <SkeletonBox width={110} height={18} />
        </View>
      ))}
    </ScrollView>
  );
}

// Matches DonutGraph
function DonutSkeleton({
  surface,
  border,
}: Readonly<{
  surface: string;
  border: string;
}>) {
  return (
    <View
      style={{
        backgroundColor: surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: border,
        padding: 16,
        marginVertical: 6,
      }}
    >
      <SkeletonBox width={180} height={16} style={{ marginBottom: 6 }} />
      <SkeletonBox width={220} height={12} style={{ marginBottom: 16 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Legend */}
        <View style={{ gap: 16 }}>
          {[1, 2, 3].map(i => (
            <View
              key={i}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <SkeletonBox width={10} height={10} borderRadius={5} />
              <SkeletonBox width={100} height={12} />
            </View>
          ))}
        </View>
        {/* Donut circle */}
        <SkeletonBox width={140} height={140} borderRadius={70} />
      </View>
    </View>
  );
}

// Matches LineGraph
function LineGraphSkeleton({
  surface,
  border,
}: Readonly<{
  surface: string;
  border: string;
}>) {
  return (
    <View
      style={{
        backgroundColor: surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: border,
        padding: 16,
        marginVertical: 6,
      }}
    >
      <SkeletonBox width={160} height={16} style={{ marginBottom: 6 }} />
      <SkeletonBox width={200} height={12} style={{ marginBottom: 16 }} />
      <SkeletonBox width="100%" height={160} borderRadius={10} />
    </View>
  );
}

// Matches InvestedPropertiesSection / ListedPropertiesSection
function HorizontalCardsSkeleton({
  surface,
  border,
  cardWidth,
  cardHeight,
}: Readonly<{
  surface: string;
  border: string;
  cardWidth: number;
  cardHeight: number;
}>) {
  return (
    <View
      style={{
        backgroundColor: surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: border,
        padding: 16,
        marginVertical: 6,
      }}
    >
      {/* Section header row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <View style={{ gap: 6 }}>
          <SkeletonBox width={180} height={15} />
          <SkeletonBox width={220} height={12} />
        </View>
        <SkeletonBox width={70} height={30} borderRadius={8} />
      </View>
      {/* Horizontal cards */}
      <ScrollView
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{ gap: 12, padding: 10 }}
      >
        {[1, 2, 3].map(i => (
          <View key={i} style={{ width: cardWidth, gap: 10 }}>
            <SkeletonBox
              width={cardWidth}
              height={cardHeight}
              borderRadius={10}
            />
            <SkeletonBox width={cardWidth * 0.6} height={14} />
            <SkeletonBox width={cardWidth * 0.4} height={12} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Matches RecentTransactionsSection
function TransactionsSkeleton({
  surface,
  border,
}: Readonly<{
  surface: string;
  border: string;
}>) {
  return (
    <View
      style={{
        backgroundColor: surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: border,
        padding: 16,
        marginVertical: 6,
      }}
    >
      <SkeletonBox width={180} height={16} style={{ marginBottom: 6 }} />
      <SkeletonBox width={220} height={12} style={{ marginBottom: 16 }} />
      {[1, 2, 3, 4].map(i => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <SkeletonBox width={40} height={40} borderRadius={20} />
          <View style={{ flex: 1, gap: 8 }}>
            <SkeletonBox width="60%" height={14} />
            <SkeletonBox width="40%" height={12} />
          </View>
          <View style={{ alignItems: 'flex-end', gap: 8 }}>
            <SkeletonBox width={70} height={14} />
            <SkeletonBox width={50} height={12} />
          </View>
        </View>
      ))}
    </View>
  );
}

export default function PortfolioSkeleton() {
  const { Colors } = useTheme();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ padding: 16 }}
      scrollEnabled={false}
    >
      <HeaderSkeleton />
      <SummaryBarSkeleton borderColor={Colors.border} />
      <DonutSkeleton surface={Colors.surface} border={Colors.border} />
      <LineGraphSkeleton surface={Colors.surface} border={Colors.border} />
      <HorizontalCardsSkeleton
        surface={Colors.surface}
        border={Colors.border}
        cardWidth={CARD_WIDTH}
        cardHeight={160}
      />
      <HorizontalCardsSkeleton
        surface={Colors.surface}
        border={Colors.border}
        cardWidth={SCREEN_WIDTH * 0.75}
        cardHeight={180}
      />
      <TransactionsSkeleton surface={Colors.surface} border={Colors.border} />
    </ScrollView>
  );
}
