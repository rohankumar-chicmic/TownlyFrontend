import React, { useState, memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import { Transaction } from '@utils/types';

const TransactionRow = memo(({ item }: { item: Transaction }) => {
  const isIncome = item?.type === 2;
  const { dynamicStyles } = useStyles(styles);

  const [isOpen, setIsOpen] = useState(false);
  const rotation = useSharedValue(0);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    rotation.value = withTiming(next ? 180 : 0, { duration: 200 });
  };

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

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
    { label: 'From', value: item.fromWalletAddress ?? 'Not Available' },
  ];

  return (
    // Plain View — no LinearTransition, no layout animation on the wrapper
    <View style={dynamicStyles.wrapper}>
      <TouchableOpacity
        style={[dynamicStyles.row, !isOpen && dynamicStyles.rowClosed]}
        onPress={toggle}
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

        <Animated.Text style={[dynamicStyles.chevronIcon, chevronStyle]}>
          <Text>▾</Text>
        </Animated.Text>
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(120)}
          exiting={FadeOut.duration(80)}
          style={dynamicStyles.detailsContainer}
        >
          {details.map(({ label, value }) => (
            <View key={label} style={dynamicStyles.detailRow}>
              <Text style={dynamicStyles.detailLabel}>{label}</Text>
              <Text style={dynamicStyles.detailValue}>{value}</Text>
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
});

export default TransactionRow;
