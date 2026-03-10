import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: Colors.border,
      backgroundColor: Colors.surface,
      padding: 10,
      marginVertical: 5,
    },
    heroText: {
      fontSize: 15,
      color: Colors.textSecondary,
    },
    heading: {
      fontSize: 15,
      fontWeight: '600',
      color: Colors.textPrimary,
    },
    smallText: {
      fontSize: 12,
      color: Colors.textSecondary,
    },
    containerStyle: {
      padding: 8,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      width: '49%',
      marginBottom: 8,
    },
    headerSection: {
      paddingBottom: 16,
      marginBottom: 12,
    },
    tooltipWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      marginBottom: 10,
    },
    tooltipBox: {
      backgroundColor: '#121212',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#333',
      alignItems: 'flex-start',
    },
    tooltipMonth: {
      color: Colors.textSecondary,
      fontSize: 10,
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    tooltipValue: {
      color: Colors.primary,
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

export default styles;
