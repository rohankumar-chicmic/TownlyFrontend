import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import useTheme from '@hooks/useTheme';
import { Icons } from '@utils/icons';

interface PropertyPortfolioData {
  propertyId: string;
  propertyName: string;
  imageUrl: string;
  location: string;
  tokensOwned: number;
  investedEth: number;
  currentValueEth: number;
  unrealizedPnLEth: number;
  unrealizedPnLPercent: number;
  monthlyIncomeEth: number;
  riskScore: number;
}

const HoldingPropertyCard = (data: PropertyPortfolioData) => {
  const { Colors } = useTheme();

  const DataItem = ({ label, value, isSuccess, isSecondary }) => (
    <View style={styles.dataItem}>
      <Text style={[styles.label, { color: Colors.textSecondary }]}>
        {label}
      </Text>
      <Text
        style={[
          styles.value,
          { color: isSuccess ? Colors.success : Colors.textPrimary },
          isSecondary && { fontSize: 12, fontWeight: '500' },
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
          width: Dimensions.get('screen').width * 0.8,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Image source={{ uri: data.imageUrl }} style={styles.propertyImage} />

        <View style={styles.mainInfoColumn}>
          {/* 1. Title */}
          <Text
            style={[styles.title, { color: Colors.textPrimary }]}
            numberOfLines={1}
          >
            {data.propertyName}
          </Text>

          {/* 2. Location */}
          <View style={styles.locationRow}>
            <Icons.Location width={12} height={12} color={Colors.primary} />
            <Text
              style={[styles.locationText, { color: Colors.textMuted }]}
              numberOfLines={1}
            >
              {data.location}
            </Text>
          </View>

          {/* 3. Tag (Hardcoded 'Commercial' for Burger King or logic based on ID) */}
          <View style={[styles.badge, { backgroundColor: Colors.background }]}>
            <Text style={[styles.badgeText, { color: Colors.textPrimary }]}>
              COMMERCIAL
            </Text>
          </View>

          {/* 4. Risk Score */}
          <View style={styles.riskRow}>
            <Text style={[styles.riskLabel, { color: Colors.textMuted }]}>
              Final Risk Score
            </Text>
            <Text style={[styles.riskValue, { color: Colors.textPrimary }]}>
              {data.riskScore.toFixed(1)}/10
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: Colors.border }]} />

      {/* Data Grid mapped to your API fields */}
      <View style={styles.grid}>
        <DataItem
          label="Tokens Owned"
          value={data.tokensOwned.toLocaleString()}
        />
        <DataItem
          label="Total Invested"
          value={`${data.investedEth.toFixed(2)} ETH`}
        />
        <DataItem
          label="Current Value"
          value={`${data.currentValueEth.toFixed(2)} ETH`}
        />
        <DataItem
          label="Unrealized PnL"
          value={`+${data.unrealizedPnLEth.toFixed(3)} ETH`}
          isSuccess={data.unrealizedPnLEth > 0}
        />
        <DataItem
          label="PnL %"
          value={`${data.unrealizedPnLPercent.toFixed(2)}%`}
          isSuccess={data.unrealizedPnLPercent > 0}
        />
        <DataItem
          label="Monthly Income"
          value={`${data.monthlyIncomeEth.toFixed(4)} ETH`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  propertyImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  mainInfoColumn: {
    flex: 1,
    paddingLeft: 16,
    height: 100, // Matches image height to allow space-between
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
    fontSize: 13,
    marginLeft: 4,
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    width: '32%',
    marginBottom: 12,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
  },
});
export default HoldingPropertyCard;
