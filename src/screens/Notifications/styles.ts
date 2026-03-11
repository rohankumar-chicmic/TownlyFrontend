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
      height: '80%',
      marginHorizontal: 20,
      marginBottom: 10,
      borderWidth: 1,
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      borderRadius: 4,
    },
    emptyContainer: {
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingContainer: {
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default styles;