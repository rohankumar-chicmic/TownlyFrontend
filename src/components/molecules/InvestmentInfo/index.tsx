import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface InvestmentData {
  minimumInvestmentShares: number;
  dividendFrequency: string;
  investmentType: string;
  security: string;
  propertyOwnerUserId: string;
  expectedAnnualReturnPercent: number;
  pricePerShareUsd: number;
  pricePerShareEth: number;
}

interface Props {
  data: InvestmentData;
}

const InvestmentInfo = ({ data }: Props) => {
  const { dynamicStyles } = useStyles(styles);

  const infoItems = useMemo(
    () => [
      {
        label: 'Minimum Investment',
        value: `${data.minimumInvestmentShares} Share${
          data.minimumInvestmentShares > 1 ? 's' : ''
        }`,
        icon: 'cash-multiple',
      },
      {
        label: 'Property Owner',
        value: data.propertyOwnerUserId || 'Not Verified',
        icon: 'account-circle-outline',
      },
      {
        label: 'Expected Returns',
        value: `${data.expectedAnnualReturnPercent}% annually`,
        icon: 'chart-line',
      },
      {
        label: 'Dividend Frequency',
        value: data.dividendFrequency,
        icon: 'calendar-month-outline',
      },
      {
        label: 'Investment Type',
        value: data.investmentType || 'Fractional Ownership',
        icon: 'file-document-outline',
      },
      {
        label: 'Security',
        value: data.security,
        icon: 'shield-check-outline',
      },
    ],
    [data],
  );

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.grid}>
        {infoItems.map(item => (
          <View key={item.label} style={dynamicStyles.card}>
            <View style={dynamicStyles.iconWrapper}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={20}
                color={dynamicStyles.iconColor.color}
              />
            </View>

            <View style={dynamicStyles.textWrapper}>
              <Text style={dynamicStyles.label} numberOfLines={1}>
                {item.label}
              </Text>
              <Text style={dynamicStyles.value} numberOfLines={1}>
                {item.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default InvestmentInfo;
