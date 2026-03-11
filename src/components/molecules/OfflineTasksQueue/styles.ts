import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    listContainer: {
      paddingVertical: 10,
    },
    taskWrapper: {
      marginVertical: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.border,
      backgroundColor: Colors.surface,
      overflow: 'hidden',
    },
    taskHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 12,
    },
    taskHeaderClosed: {
      // Optional: subtle shadow or background when closed
    },
    taskLabel: {
      fontWeight: 'bold',
      fontSize: 14,
      color: Colors.textPrimary,
    },
    chevronIcon: {
      fontSize: 16,
      color: Colors.textSecondary,
    },
    detailsContainer: {
      paddingHorizontal: 12,
      paddingBottom: 12,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 2,
    },
    detailLabel: {
      color: Colors.textSecondary,
      fontSize: 12,
    },
    detailValue: {
      color: Colors.textPrimary,
      fontSize: 12,
      maxWidth: '60%',
      textAlign: 'right',
    },
    actions: {
      flexDirection: 'row',
      marginTop: 8,
    },
    actionBtn: {
      backgroundColor: Colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 4,
      marginRight: 6,
    },
    actionText: {
      color: Colors.textPrimary,
      fontSize: 12,
    },
    emptyContainer: {
      padding: 20,
      alignItems: 'center',
    },
    emptyText: {
      color: Colors.textSecondary,
      fontSize: 14,
    },
  });

export default styles;
