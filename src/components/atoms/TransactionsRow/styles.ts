import { ThemeColors } from '@theme/constants';
import { StyleSheet } from 'react-native';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      width: '100%',
      padding: 15,
      borderRadius: 8,
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderWidth: 1,
      borderColor: Colors.border,
      backgroundColor: Colors.background + '5',
    },
    incomeBadge: {
      backgroundColor: '#064e3b',
    },
    purchaseBadge: {
      backgroundColor: '#1e40af',
    },
    typeText: {
      color: '#a7f3d0',
      fontWeight: '600',
      fontSize: 12,
    },

    /* PROPERTY */
    propertyContainer: {
      width: '30%',
    },
    propertyTitle: {
      color: Colors.textPrimary,
      width: '100%',
      fontSize: 15,
      fontWeight: '600',
    },
    tokenText: {
      color: '#9ca3af',
      fontSize: 12,
      marginTop: 2,
    },

    /* AMOUNT */
    amount: {
      width: '30%',
      textAlign: 'right',
      fontWeight: '600',
    },
    incomeAmount: {
      color: Colors.success,
    },
    purchaseAmount: {
      color: Colors.textSecondary,
    },

    /* DATE */
    date: {
      width: 110,
      textAlign: 'right',
      color: Colors.textMuted,
    },

    /* STATUS */
    statusBadge: {
      marginLeft: 12,
      backgroundColor: '#84cc16',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 999,
    },
    statusText: {
      color: '#052e16',
      fontWeight: '700',
      fontSize: 12,
    },
  });

export default styles;
