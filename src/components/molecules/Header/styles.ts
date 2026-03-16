import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: Colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,

      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    logoWrapper: {
      alignItems: 'center',
      gap: 8,
    },
    primaryText: {
      color: Colors.textPrimary,
      fontSize: 25,
      fontWeight: 'bold',
    },
    walletButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.elevated,
      paddingVertical: 5,
      height: 40,
      overflow: 'hidden',
      paddingHorizontal: 10,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: Colors.primary,
    },
    walletIconCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 6,
    },
    walletIconText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: Colors.textSecondary,
    },
    walletAmount: {
      color: Colors.primary,

      fontSize: 10,
      fontWeight: '600',
    },
  });

export default styles;
