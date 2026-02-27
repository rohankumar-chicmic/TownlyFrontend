import { View, Text } from 'react-native';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import styles from './styles';

interface Props {
  address?: string;
}

export default function PortfolioHeader({ address }: Readonly<Props>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  return (
    <View style={dynamicStyles.headerSection}>
      <Text style={dynamicStyles.heroPrimarytext}>Investor Portfolio</Text>
      <Text style={dynamicStyles.heroText}>
        Track and manage your real-world asset investments
      </Text>
      {address && (
        <Text style={[dynamicStyles.smallText, { marginTop: 10 }]}>
          Wallet: <Text style={{ color: Colors.primary }}>{address}</Text>
        </Text>
      )}
    </View>
  );
}
