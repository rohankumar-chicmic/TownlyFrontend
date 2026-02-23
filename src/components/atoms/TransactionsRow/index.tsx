import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import useStyles from '@hooks/useStyles';

const TransactionRow = ({
  item,
}: {
  item: {
    type?: number;
    propertyName: string;
    tokens?: number;
    amountUsd: number;
    createdAt: string;
  };
}) => {
  const isIncome = item?.type === 2;
  const { dynamicStyles } = useStyles(styles);
  return (
    <View style={dynamicStyles.row}>
      {/* PROPERTY */}
      <View style={dynamicStyles.propertyContainer}>
        <Text style={dynamicStyles.propertyTitle} numberOfLines={1}>
          {item.propertyName}
        </Text>
        {item?.tokens && (
          <Text style={dynamicStyles.tokenText}>{item.tokens} tokens</Text>
        )}
      </View>

      <Text
        style={[
          dynamicStyles.amount,
          isIncome ? dynamicStyles.incomeAmount : dynamicStyles.purchaseAmount,
        ]}
      >
        {isIncome ? '+' : ''}
        {(item.amountUsd / 10000).toFixed(2)} ETH
      </Text>

      <Text style={dynamicStyles.date}>
        {item.createdAt.toString().split('T')[0]}
      </Text>
    </View>
  );
};

export default TransactionRow;
