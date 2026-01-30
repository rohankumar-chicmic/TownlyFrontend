import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: Colors.elevated,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
    logoWrapper: {
      alignItems: 'center', // Centers icon and text vertically
      gap: 8, // Adds space between icon and "Townly"
    },
    primaryText: {
      color: Colors.textPrimary,
      fontSize: 25,
      fontWeight: 'bold',
      letterSpacing: -2,
    },
    walletButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(199, 254, 30, 0.08)', // Faint lime background
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(199, 254, 30, 0.3)', // Subtle lime border
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
      fontSize: 13,
      fontWeight: '600',
    },
  });

export default styles;
