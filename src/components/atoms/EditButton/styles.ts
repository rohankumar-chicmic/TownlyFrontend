import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    box: {
      backgroundColor: Colors.surface,
      justifyContent: 'center',
      borderRadius: 5,
      height: 35,
      width: 35,
      borderColor: Colors.border,
      borderWidth: 1,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    symbol: {
      color: Colors.primary,
    },
  });

export default styles;
