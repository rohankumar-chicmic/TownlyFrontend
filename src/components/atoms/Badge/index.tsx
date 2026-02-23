import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { View, Text } from 'react-native';
import styles from './styles';

const Badge = ({ status }: { status: number | undefined }) => {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);

  const getBadgeConfig = (status?: number) => {
    switch (status) {
      case 1:
        return { label: 'Pending', color: Colors.warning || '#FFA500' };
      case 2:
        return { label: 'Active', color: Colors.success || '#4CAF50' };
      case 3:
        return { label: 'Sold Out', color: Colors.error || '#F44336' };
      case 4:
        return { label: 'Rejected', color: Colors.textSecondary || '#757575' };
      default:
        return null;
    }
  };

  const config = getBadgeConfig(status);
  if (!config) return null;

  return (
    <View
      style={[dynamicStyles.badgeContainer, { backgroundColor: config.color }]}
    >
      <Text style={[dynamicStyles.badgeText, { color: Colors.background }]}>
        {config.label}
      </Text>
    </View>
  );
};

export default Badge;
