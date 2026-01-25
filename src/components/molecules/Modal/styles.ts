import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    container: {
      width: '100%',
      borderRadius: 16,
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: Colors.textPrimary,
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: Colors.textSecondary,
      marginBottom: 20,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
  });

export default styles;
