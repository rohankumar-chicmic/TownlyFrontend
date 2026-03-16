import { ThemeColors } from '@theme/constants';
import { StyleSheet } from 'react-native';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    heroPrimarytext: {
      fontSize: 25,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    heroText: {
      fontSize: 15,
      color: Colors.textSecondary,
    },
    smallText: {
      fontSize: 12,
      color: Colors.textSecondary,
    },
    headerSection: {
      paddingBottom: 5,
      marginBottom: 5,
    },
    filterContainer: {
      flexDirection: 'row',
      borderColor: Colors.border,
      marginVertical: 5,
      paddingVertical: 5,
    },
    tag: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: Colors.surface,
    },
    tagText: {
      fontSize: 14,
      fontWeight: '400',
    },
    notificationsContainer: {
      marginHorizontal: 20,
      height: '80%',
      marginBottom: 10,
      borderWidth: 1,
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      borderRadius: 4,
    },
    loadingContainer: {
      width: '100%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      width: '100%',
      top: '20%',
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },

    emptyTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 6,
      color: Colors.textMuted,
    },

    emptyDescription: {
      fontSize: 13,
      textAlign: 'center',
      opacity: 0.7,
      maxWidth: 240,
      color: Colors.textMuted,
    },
  });

export default styles;
