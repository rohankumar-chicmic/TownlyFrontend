import { View, Text } from 'react-native';
import TransactionsRow from '@components/atoms/TransactionsRow';
import Button from '@components/atoms/Button';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import styles from './styles';
import React from 'react';

interface Props {
  transactions?: any[];
  hasMore?: boolean;
}

export default function RecentTransactionsSection({
  transactions,
  hasMore,
}: Readonly<Props>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  console.log(transactions);
  return (
    <View
      style={[
        dynamicStyles.sectionCard,
        { backgroundColor: Colors.surface, borderColor: Colors.border },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <View>
          <Text style={[dynamicStyles.heading, { fontSize: 15 }]}>
            Recent Transactions
          </Text>
          <Text style={[dynamicStyles.smallText, { marginBottom: 10 }]}>
            Your latest investment activity
          </Text>
        </View>
        {hasMore && (
          <Button
            title="View all"
            size="sm"
            onPress={() => navigation.navigate(ROUTES.TRANSACTIONS)}
          />
        )}
      </View>

      {transactions && transactions.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 5,
          }}
        >
          <Text style={[dynamicStyles.smallText, { width: '30%' }]}>
            Property Name
          </Text>
          <Text style={[dynamicStyles.smallText, { width: '30%' }]}>
            Amount
          </Text>
          <Text style={dynamicStyles.smallText}>Date</Text>
        </View>
      )}

      <View style={{ gap: 5, alignItems: 'center' }}>
        {transactions && transactions.length > 0 ? (
          (transactions ?? []).map((item: any) => (
            <TransactionsRow item={item} key={item.transactionId} />
          ))
        ) : (
          <Text style={{ color: Colors.textMuted, marginVertical: 20 }}>
            No Transactions yet
          </Text>
        )}
      </View>
    </View>
  );
}
