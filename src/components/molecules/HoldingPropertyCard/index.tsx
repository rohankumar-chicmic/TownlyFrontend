import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import useTheme from '@hooks/useTheme';
import { Icons } from '@utils/icons';
import { PropertyPortfolioData } from '@utils/types';
import styles from './styles';
import useStyles from '@hooks/useStyles';
import { debounce } from '@utils/utility';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';

const DataItem = ({ label, value, isSuccess, isNegative }: any) => {
  const { dynamicStyles, Colors } = useStyles(styles);

  let valueColor = Colors.textPrimary;

  if (isNegative) {
    valueColor = '#ff4d16';
  } else if (isSuccess) {
    valueColor = Colors.success;
  }

  return (
    <View style={dynamicStyles.dataItem}>
      <Text style={[dynamicStyles.label, { color: Colors.textSecondary }]}>
        {label}
      </Text>
      <Text
        style={[
          dynamicStyles.value,
          {
            color: valueColor,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const HoldingPropertyCard = (data: Readonly<PropertyPortfolioData>) => {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const navigation = useAppNavigation();

  const success = data?.totalReturnEth > 0;
  const negative = data?.totalReturnEth < 0;

  

  return (
    <Pressable style={[dynamicStyles.card]} onPress={data?.onClick}>
      <View style={dynamicStyles.headerRow}>
        <Image
          source={{ uri: data?.propertyImageUrl }}
          style={dynamicStyles.propertyImage}
          resizeMode="cover"
        />

        <View style={dynamicStyles.mainInfoColumn}>
          <Text
            style={[dynamicStyles.title, { color: Colors.textPrimary }]}
            numberOfLines={1}
          >
            {data?.propertyName || 'Unknown Property'}
          </Text>

          <View style={dynamicStyles.locationRow}>
            <Icons.Location width={12} height={12} color={Colors.primary} />
            <Text
              style={[
                dynamicStyles.locationText,
                { color: Colors.textPrimary },
              ]}
              numberOfLines={1}
            >
              {data?.location}
            </Text>
          </View>

          <View
            style={[
              dynamicStyles.badge,
              { backgroundColor: Colors.background },
            ]}
          >
            <Text
              style={[dynamicStyles.badgeText, { color: Colors.textPrimary }]}
            >
              {data.propertyType}
            </Text>
          </View>

          <View style={dynamicStyles.riskRow}>
            <Text
              style={[dynamicStyles.riskLabel, { color: Colors.textSecondary }]}
            >
              Shares Owned
            </Text>
            <Text
              style={[dynamicStyles.riskValue, { color: Colors.textPrimary }]}
            >
              {data?.sharesPurchased}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[dynamicStyles.divider, { backgroundColor: Colors.border }]}
      />

      {/* 2. Grid now uses the correct JSON fields */}
      <View style={dynamicStyles.grid}>
        <DataItem
          label="Invested"
          value={`${data?.totalInvestedEth?.toFixed(3)} ETH`}
        />
        <DataItem
          label="Current Value"
          value={`${data.currentValueEth?.toFixed(3)} ETH`}
        />
        <DataItem
          isNegative={negative}
          isSuccess={success}
          label="Total Return"
          value={(success ? '+' : '') + data.totalReturnEth.toFixed(3)}
        />
      </View>

      <View style={dynamicStyles.grid}>
        <DataItem
          label="Monthly Income"
          value={`${data?.monthlyIncomeEth.toFixed(3)} ETH`}
        />
        <DataItem label="Annual Yield" value={`${data?.annualYieldPercent}%`} />
        <DataItem label="Final Risk Score" value={`${data?.riskScore}/10`} />
      </View>
    </Pressable>
  );
};

export default HoldingPropertyCard;
