import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      padding: 16,
      borderRadius: 16,
      marginVertical: 12,
    },

    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    card: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },

    iconWrapper: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: Colors.elevated,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },

    iconColor: {
      color: Colors.primary,
    },

    textWrapper: {
      flex: 1,
      justifyContent: 'center',
    },

    label: {
      fontSize: 12,
      color: Colors.textSecondary,
      marginBottom: 2,
    },

    value: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.textPrimary,
    },
  });

export default styles;
