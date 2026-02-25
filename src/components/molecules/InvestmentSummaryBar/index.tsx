import { View, Text, ScrollView } from 'react-native';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import styles from './styles';

interface InvestmentData {
  totalInvestedEth?: number;
  currentValueEth?: number;
  totalReturnEth?: number;
  monthlyIncomeEth?: number;
}

interface Props {
  data?: InvestmentData;
}

export default function InvestmentSummaryBar({ data }: Readonly<Props>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 4,
      }}
      style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.border,
        marginVertical: 6,
      }}
    >
      {[
        {
          label: 'Total Invested',
          value: data?.totalInvestedEth,
          color: undefined,
        },
        {
          label: 'Current Value',
          value: data?.currentValueEth,
          color: undefined,
        },
        {
          label: 'Total Returns',
          value: data?.totalReturnEth,
          prefix: '+',
          color: Colors.success,
        },
        {
          label: 'Monthly Income',
          value: data?.monthlyIncomeEth,
          color: undefined,
        },
      ].map(({ label, value, prefix = '', color }) => (
        <View key={label} style={dynamicStyles.containerStyle}>
          <Text style={dynamicStyles.heroText}>{label}</Text>
          <Text style={[dynamicStyles.heading, color ? { color } : {}]}>
            {prefix}
            {value?.toFixed(3)} ETH
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
