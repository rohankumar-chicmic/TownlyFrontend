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
    },

    label: {
      color: Colors.textPrimary,
      fontWeight: '600',
    },

    required: {
      color: Colors.primary,
    },

    input: {
      backgroundColor: Colors.surface,
      color: Colors.textPrimary,
      borderRadius: 12,
      padding: 14,
      marginTop: 8,
      fontSize: 16,
    },

    hint: {
      color: Colors.textPrimary,
      marginTop: 6,
      fontSize: 12,
    },

    card: {
      backgroundColor: Colors.surface,
      borderRadius: 16,
      padding: 16,
      marginTop: 20,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 4,
    },

    rowLabel: {
      color: Colors.textSecondary,
    },

    rowValue: {
      color: Colors.textPrimary,
    },

    bold: {
      fontWeight: '700',
    },

    large: {
      fontSize: 20,
    },

    divider: {
      height: 1,
      backgroundColor: Colors.border,
      marginVertical: 12,
    },

    info: {
      backgroundColor: Colors.surface,
      borderRadius: 14,
      padding: 14,
      marginTop: 16,
    },

    infoText: {
      color: '#4DA3FF',
      fontWeight: '600',
    },

    infoSub: {
      color: '#AAA',
      fontSize: 12,
      marginTop: 4,
    },

    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 24,
    },

    cancel: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#333',
      borderRadius: 14,
      padding: 14,
      alignItems: 'center',
    },

    cancelText: {
      color: '#AAA',
    },

    primary: {
      flex: 1,
      backgroundColor: '#C7F000',
      borderRadius: 14,
      padding: 14,
      alignItems: 'center',
    },

    primaryText: {
      color: '#000',
      fontWeight: '700',
    },
  });

export default styles;
