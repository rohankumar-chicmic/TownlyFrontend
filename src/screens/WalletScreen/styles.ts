import { Dimensions, StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      padding: 20,
      margin: 5,
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
    heading: {
      fontSize: 20,
      fontWeight: '400',
      color: Colors.textPrimary,
    },
    smallText: {
      fontSize: 12,
      color: Colors.textSecondary,
    },
    containerStyle: {
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      padding: 8,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      width: Dimensions.get('window').width * 0.4,
      marginRight: 5,
    },
    dataPanel: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerSection: {
      paddingBottom: 5,
      marginBottom: 5,
    },
    containerSurface: {
      padding: 15,
      borderRadius: 15,
      backgroundColor: Colors.elevated,
      borderColor: Colors.border,
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
    },

    sheet: {
      backgroundColor: Colors.border,
      padding: 20,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },

    header: {
      alignItems: 'center',
      height: 100,
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
