import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import useStyles from '@hooks/useStyles';

interface TransactionProps {
  type: string; // e.g., "Income"
  amount: string; // e.g., "+0.0057 ETH"
  status: string; // e.g., "COMPLETED"
  isPositive?: boolean;
}

const TransactionRow = ({
  type,
  amount,
  status,
  isPositive = false,
}: TransactionProps) => {
  const { Colors } = useTheme();
    const {dynamicStyles} = useStyles(styles);
  return (
    <View style={[dynamicStyles.container, { borderBottomColor: Colors.border }]}>
      {/* 1. Type Badge (Left) */}
      <View
        style={[
          dynamicStyles.typeBadge,
          { backgroundColor: Colors.elevated, borderColor: Colors.success },
        ]}
      >
        <Text style={[dynamicStyles.typeText, { color: Colors.success }]}>{type}</Text>
      </View>

      {/* 2. Amount (Center) */}
      <Text
        style={[
          dynamicStyles.amountText,
          { color: isPositive ? Colors.success : Colors.textPrimary },
        ]}
      >
        {amount}
      </Text>

      {/* 3. Status Badge (Right) */}
      <View style={[dynamicStyles.statusBadge, { backgroundColor: Colors.border }]}>
        <Text style={[dynamicStyles.statusText, { color: Colors.textMuted }]}>{status}</Text>
      </View>
    </View>
  );
};


export default TransactionRow;
