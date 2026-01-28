import { Dimensions, StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      minWidth:Dimensions.get('screen').width * 0.86,
      borderColor: Colors.border,
      flexDirection: 'row',
      margin: 5,
      borderRadius: 10,
    },
    detailsContainer: {
      padding: 10,
      flex: 1,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 23,
      padding: 5,
      fontWeight: '400',
      color: Colors.textPrimary,
    },
    location: {
      fontSize: 15,
      padding: 5,
      color: Colors.textSecondary,
      alignItems: 'center',
    },
    smallText: {
      fontSize: 12,
      padding: 5,

      color: Colors.textSecondary,
    },
    column: {
      padding: 5,

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
      color: Colors.primary,
    },
  });

export default styles;
