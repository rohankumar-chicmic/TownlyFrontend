import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
    },

    sheet: {
      backgroundColor: Colors.background,
      padding: 20,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },

    title: {
      color: Colors.textPrimary,
      fontSize: 20,
      fontWeight: '700',
    },

    close: {
      color: Colors.primary,
      fontSize: 18,
    },

    subtitle: {
      color: Colors.textSecondary,
      marginTop: 6,
      marginBottom: 20,
      fontSize: 15,
      lineHeight: 22,
    },

    card: {
      backgroundColor: Colors.surface,
      borderRadius: 16,
      padding: 16,
      marginTop: 8,
    },

    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 6,
    },

    bullet: {
      color: Colors.primary,
      fontSize: 16,
      marginRight: 8,
      fontWeight: '700',
    },

    listText: {
      color: Colors.textPrimary,
      fontSize: 15,
      flex: 1,
      lineHeight: 22,
    },

    info: {
      backgroundColor: Colors.surface,
      borderRadius: 14,
      padding: 16,
      marginTop: 16,
    },

    infoTitle: {
      color: Colors.textPrimary,
      fontWeight: '600',
      fontSize: 15,
      marginBottom: 4,
    },

    infoSub: {
      color: Colors.textSecondary,
      fontSize: 14,
      marginTop: 4,
      lineHeight: 20,
    },

    errorText: {
      color: Colors.error || '#FF4444',
    },

    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 24,
      gap: 12,
    },

    footerSingle: {
      marginTop: 24,
    },
  });

export default styles;
