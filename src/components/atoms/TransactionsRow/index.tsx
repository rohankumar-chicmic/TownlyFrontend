import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import useStyles from '@hooks/useStyles';
import { Transaction } from '@utils/types';

const TransactionRow = ({ item }: { item: Transaction }) => {
  const isIncome = item?.type === 2;
  const { dynamicStyles } = useStyles(styles);
  const [isOpen, setIsOpen] = useState(false);

  const details = [
    { label: 'Name', value: item.propertyName },
    { label: 'Type', value: isIncome ? 'Income' : 'Purchase' },
    { label: 'Amount (USD)', value: `$${item.amountUsd?.toLocaleString()}` },
    { label: 'Amount (ETH)', value: `${item.amountEth} ETH` },
    ...(item.tokens ? [{ label: 'Tokens', value: `${item.tokens}` }] : []),
    { label: 'Date', value: item.createdAt.toString().split('T')[0] },
    {
      label: 'Time',
      value: item.createdAt.toString().split('T')[1]?.slice(0, 5) ?? '—',
    },
  ];

  return (
    <View style={dynamicStyles.wrapper}>
      <TouchableOpacity
        style={dynamicStyles.row}
        onPress={() => setIsOpen(prev => !prev)}
        activeOpacity={0.7}
      >
        <View style={dynamicStyles.propertyContainer}>
          <Text style={dynamicStyles.propertyTitle} numberOfLines={1}>
            {item.propertyName}
          </Text>
          {!!item.tokens && (
            <Text style={dynamicStyles.tokenText}>{item.tokens} tokens</Text>
          )}
        </View>

        <Text
          style={[
            dynamicStyles.amount,
            isIncome
              ? dynamicStyles.incomeAmount
              : dynamicStyles.purchaseAmount,
          ]}
        >
          {isIncome ? '+' : ''}
          {item.amountEth?.toFixed(2)} ETH
        </Text>

        <Text style={dynamicStyles.date}>
          {item.createdAt.toString().split('T')[0]}
        </Text>

        <Text
          style={[
            dynamicStyles.chevronIcon,
            isOpen && dynamicStyles.chevronOpen,
          ]}
        >
          ▾
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={dynamicStyles.detailsContainer}>
          {details.map(({ label, value }) => (
            <View key={label} style={dynamicStyles.detailRow}>
              <Text style={dynamicStyles.detailLabel}>{label}</Text>
              <Text style={dynamicStyles.detailValue}>{value}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default TransactionRow;
