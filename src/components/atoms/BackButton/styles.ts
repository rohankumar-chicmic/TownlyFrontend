import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    box: {
      backgroundColor: Colors.border,
      position: 'absolute',
      justifyContent: 'center',
      borderRadius: 5,
      alignItems: 'center',
      zIndex: 100,
      margin: 10,
      // top: 10,
      // left: 10,
      shadowColor: Colors.background,
    },
    symbol: {
      color: Colors.primaryDark,
    },
  });

export default styles;
