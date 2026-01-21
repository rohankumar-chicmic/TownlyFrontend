import { Dimensions, StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('screen').width * 0.55,
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      padding: 10,
    },
    title: {
      fontSize: 23,
      fontWeight: '400',
      width: 150,
      color: Colors.textPrimary,
    },
    location: {
      width: 150,
      fontSize: 15,
      color: Colors.textSecondary,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottomColor: Colors.border,
      borderBottomWidth: 2,
      paddingBottom: 10,
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
    fields:{
      fontSize: 15,
      color: Colors.textSecondary,
    }, 
    values:{
        fontSize: 20,
      fontWeight: '400',
      color: Colors.primary,
    }
  });

export default styles;
