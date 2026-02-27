// components/molecules/PropertyDetailsSkeleton/index.tsx
import { View, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '@hooks/useTheme';
import SkeletonBox from '@components/atoms/SkeletonBox';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Matches the horizontal ScrollView with 4 stat pills
function StatBarSkeleton({ border }: Readonly<{ border: string }>) {
  return (
    <ScrollView
      horizontal
      scrollEnabled={false}
      contentContainerStyle={{
        flexDirection: 'row',
        gap: 24,
        padding: 15,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: border,
        marginTop: 10,
      }}
    >
      {[1, 2, 3, 4].map(i => (
        <View key={i} style={{ gap: 8, minWidth: 90 }}>
          <SkeletonBox width={70} height={13} borderRadius={5} />
          <SkeletonBox width={90} height={18} borderRadius={6} />
        </View>
      ))}
    </ScrollView>
  );
}

// Matches InvestmentInfo — 6 cards in a 2-column grid
function InvestmentInfoSkeleton({
  surface,
  border,
}: Readonly<{
  surface: string;
  border: string;
}>) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
      }}
    >
      {[1, 2, 3, 4, 5, 6].map(i => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            width: (SCREEN_WIDTH - 60) / 2,
            backgroundColor: surface,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: border,
            padding: 10,
          }}
        >
          {/* Icon wrapper circle */}
          <SkeletonBox width={36} height={36} borderRadius={18} />
          <View style={{ flex: 1, gap: 6 }}>
            <SkeletonBox width="70%" height={11} borderRadius={5} />
            <SkeletonBox width="90%" height={13} borderRadius={5} />
          </View>
        </View>
      ))}
    </View>
  );
}

// Matches related properties horizontal FlatList
function RelatedPropertiesSkeleton({
  surface,
  border,
}: {
  surface: string;
  border: string;
}) {
  const CARD_WIDTH = SCREEN_WIDTH * 0.8;
  return (
    <View
      style={{
        backgroundColor: surface,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: border,
        paddingVertical: 10,
        marginTop: 15,
      }}
    >
      <SkeletonBox
        width={180}
        height={16}
        borderRadius={6}
        style={{ marginLeft: 20, marginBottom: 4 }}
      />
      <ScrollView
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      >
        {[1, 2].map(i => (
          <View
            key={i}
            style={{
              width: CARD_WIDTH,
              flexDirection: 'row',
              backgroundColor: border,
              borderRadius: 7,
              overflow: 'hidden',
              height: 160,
            }}
          >
            <SkeletonBox width="40%" height={160} borderRadius={0} />
            <View
              style={{
                flex: 1,
                padding: 10,
                gap: 10,
                justifyContent: 'space-between',
              }}
            >
              <SkeletonBox width="80%" height={14} borderRadius={6} />
              <SkeletonBox width="60%" height={12} borderRadius={5} />
              {[1, 2, 3, 4].map(j => (
                <View
                  key={j}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <SkeletonBox width="45%" height={11} borderRadius={5} />
                  <SkeletonBox width="30%" height={11} borderRadius={5} />
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default function PropertyDetailsSkeleton() {
  const { Colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.elevated }}>
      <ScrollView
        style={{ backgroundColor: Colors.background }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        {/* Hero image */}
        <SkeletonBox width="100%" height={260} borderRadius={0} />

        {/* Title + location + tag */}
        <View style={{ padding: 15, gap: 10 }}>
          <SkeletonBox width="70%" height={22} borderRadius={7} />
          <SkeletonBox width="50%" height={14} borderRadius={5} />
          <SkeletonBox width={90} height={26} borderRadius={20} />
        </View>

        {/* Stat bar */}
        <StatBarSkeleton border={Colors.border} />

        {/* Invest button */}
        <SkeletonBox
          width={SCREEN_WIDTH - 30}
          height={48}
          borderRadius={10}
          style={{ margin: 15 }}
        />

        {/* Property Highlights */}
        <View style={{ padding: 15, gap: 10 }}>
          <SkeletonBox width={180} height={16} borderRadius={6} />
          <SkeletonBox width="100%" height={13} borderRadius={5} />
          <SkeletonBox width="100%" height={13} borderRadius={5} />
          <SkeletonBox width="80%" height={13} borderRadius={5} />
        </View>

        {/* Related Properties */}
        <RelatedPropertiesSkeleton
          surface={Colors.surface}
          border={Colors.border}
        />

        {/* Investment Details */}
        <View style={{ padding: 15, gap: 12 }}>
          <SkeletonBox width={160} height={16} borderRadius={6} />
          <InvestmentInfoSkeleton
            surface={Colors.surface}
            border={Colors.border}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
