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
      backgroundColor: Colors.elevated,
      paddingVertical: 5,
      height: 40,
      overflow: 'hidden',
      paddingHorizontal: 10,
      borderRadius: 20,
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
