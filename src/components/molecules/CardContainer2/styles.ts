import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      aspectRatio: 5 / 3,
      borderColor: Colors.border,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    detailsContainer: {
      padding: 10,
      flex: 1,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 23,
      padding: 2,
      fontWeight: '400',
      color: Colors.textPrimary,
    },
    location: {
      fontSize: 15,
      padding: 5,
      color: Colors.textPrimary,
      alignItems: 'center',
    },
    smallText: {
      fontSize: 12,
      padding: 5,

      color: Colors.textSecondary,
    },
    column: {
      padding: 5,
      paddingVertical: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    fields: {
      fontSize: 15,
      color: Colors.textSecondary,
    },
    values: {
      fontSize: 15,
      fontWeight: '400',
      color: Colors.textPrimary,
    },
  });

export default styles;
