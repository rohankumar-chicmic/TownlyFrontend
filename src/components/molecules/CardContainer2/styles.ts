import { Dimensions, StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('screen').width * 0.55,
      height: '95%',
      alignSelf: 'flex-start',
      justifyContent: 'space-between',
      padding: 10,
    },
    title: {
      fontSize: 23,
      marginBottom: 3,
      fontWeight: '400',
      color: Colors.textPrimary,
    },
    location: {
      fontSize: 15,
      color: Colors.textSecondary,
    },
    titleContainer: {
      height:'50%',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottomColor: Colors.border,
      borderBottomWidth: 1,
      paddingVertical: 7,
    },
    smallText: {
      fontSize: 12,
      color: Colors.textSecondary,
    },
    column: {
      width: '100%',
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
