import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    badgeContainer: {
      position: 'absolute',
      top: 8,
      left: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
  });

export default styles;
