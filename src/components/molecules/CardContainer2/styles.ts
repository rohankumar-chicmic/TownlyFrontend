import { Dimensions, StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      minWidth: Dimensions.get('screen').width * 0.86,
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
    badgeContainer: {
      position: 'absolute',
      top: 8,
      left: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    // detailsContainer: {
    //   flex: 1,
    //   padding: 12,
    //   justifyContent: 'space-between',
    // },
    // column: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    //   marginTop: 4,
    // },
  });

export default styles;
