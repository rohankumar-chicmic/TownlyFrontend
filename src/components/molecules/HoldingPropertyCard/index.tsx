import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import useTheme from '@hooks/useTheme';
import { Icons } from '@utils/icons';

// 1. Updated interface to match your specific JSON keys
interface PropertyPortfolioData {
  propertyId: string;
  propertyName: string;
  propertyImageUrl: string;
  location: string;
  sharesPurchased: number;  
  ethAmountAtExecution: number;
  totalAmountUsd: number;
  ethUsdRateAtExecution: number;
  investedAt: string;
  investmentId: string;
  pricePerShareUsd: number;
}

const HoldingPropertyCard = (data: PropertyPortfolioData) => {
  const { Colors } = useTheme();

  // Helper component for the data grid
  const DataItem = ({ label, value, isSuccess }: any) => (
    <View style={styles.dataItem}>
      <Text style={[styles.label, { color: Colors.textSecondary }]}>
        {label}
      </Text>
      <Text
        style={[
          styles.value,
          { color: isSuccess ? Colors.success : Colors.textPrimary },
        ]}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: Colors.surface,
          borderColor: Colors.border,
        },
      ]}
    >
      <View style={styles.headerRow}>
        {/* Fixed the typo: propertyImageUrl matches your JSON */}
        <Image
          source={{ uri: data?.propertyImageUrl }}
          style={styles.propertyImage}
          resizeMode="cover"
        />

        <View style={styles.mainInfoColumn}>
          <Text
            style={[styles.title, { color: Colors.textPrimary }]}
            numberOfLines={1}
          >
            {data?.propertyName || 'Unknown Property'}
          </Text>

          <View style={styles.locationRow}>
            <Icons.Location width={12} height={12} color={Colors.primary} />
            <Text
              style={[styles.locationText, { color: Colors.textMuted }]}
              numberOfLines={1}
            >
              {data?.location}
            </Text>
          </View>

          <View style={[styles.badge, { backgroundColor: Colors.background }]}>
            <Text style={[styles.badgeText, { color: Colors.textPrimary }]}>
              COMMERCIAL
            </Text>
          </View>

          <View style={styles.riskRow}>
            <Text style={[styles.riskLabel, { color: Colors.textMuted }]}>
              Shares Owned
            </Text>
            <Text style={[styles.riskValue, { color: Colors.textPrimary }]}>
              {data?.sharesPurchased}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: Colors.border }]} />

      {/* 2. Grid now uses the correct JSON fields */}
      <View style={styles.grid}>
        <DataItem
          label="Invested"
          value={`${data?.ethAmountAtExecution?.toFixed(3)} ETH`}
        />
        <DataItem
          label="Value (USD)"
          value={`$${(data?.totalAmountUsd / 1000).toFixed(1)}k`}
        />
        <DataItem
          label="Price/Share"
          value={`$${data?.pricePerShareUsd?.toLocaleString()}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    alignSelf: 'center',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Android Shadow
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  propertyImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  mainInfoColumn: {
    flex: 1,
    paddingLeft: 16,
    height: 90,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  riskLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  riskValue: {
    fontSize: 14,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dataItem: {
    width: '30%',
  },
  label: {
    fontSize: 9,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default HoldingPropertyCard;
