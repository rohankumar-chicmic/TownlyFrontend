import React, { useState } from 'react';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';

import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { Icons } from '@utils/icons';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import { InvestmentCardType } from '@utils/types';

import styles from './styles';
import InvestedPropertyCardProps from './InvestedPropertyCard.type';

export default function InvestedPropertyCard(
  props: Readonly<InvestedPropertyCardProps>,
) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(ROUTES.PROPERTY_DETAILS, { id: props.id })
      }
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        dynamicStyles.container,
        { backgroundColor: isPressed ? Colors.surface : Colors.background },
      ]}
    >
      {/* ===== TOP HALF ===== */}
      <View style={dynamicStyles.topSection}>
        {/* Image */}
        <Image
          src={props.imageUrl}
          width={90}
          height={90}
          style={dynamicStyles.image}
        />

        {/* Meta */}
        <View style={dynamicStyles.metaContainer}>
          <View style={dynamicStyles.titleRow}>
            <Text style={dynamicStyles.title} numberOfLines={2}>
              {props.name}
            </Text>

            <View style={dynamicStyles.badge}>
              <Text style={dynamicStyles.badgeText}>{props.propertyType}</Text>
            </View>
          </View>

          <Text style={dynamicStyles.location} numberOfLines={2}>
            <Icons.Location width={10} height={10} color={Colors.primary} />{' '}
            {props.location}
          </Text>

          <Text style={dynamicStyles.risk}>
            Final Risk Score{' '}
            <Text style={dynamicStyles.riskValue}>{props.riskScore}/10</Text>{' '}
            <Text style={dynamicStyles.riskLabel}>({props.riskLabel})</Text>
          </Text>
        </View>
      </View>

      {/* ===== DIVIDER ===== */}
      <View style={dynamicStyles.divider} />

      {/* ===== BOTTOM HALF ===== */}
      <View style={dynamicStyles.statsGrid}>
        <Stat label="Tokens Owned" value={props.tokensOwned} />
        <Stat label="Total Invested" value={`${props.totalInvestedEth} ETH`} />
        <Stat label="Current Value" value={`${props.currentValueEth} ETH`} />
        <Stat
          label="Total Return"
          value={`+${props.totalReturnEth} ETH`}
          highlight
        />
        <Stat label="Monthly Income" value={`${props.monthlyIncomeEth} ETH`} />
        <Stat label="Annual Yield" value={`${props.annualYield}%`} />
      </View>
    </Pressable>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  const { Colors } = useTheme();

  return (
    <View style={{ width: '33%' }}>
      <Text style={{ fontSize: 12, color: Colors.textSecondary }}>{label}</Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '500',
          color: highlight ? Colors.success : Colors.textPrimary,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
