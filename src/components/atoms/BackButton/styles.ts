import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    box: {
      backgroundColor: Colors.border,
      position: 'absolute',
      justifyContent: 'center',
      borderRadius: 5,
      borderColor: Colors.outline, 
      borderWidth: 1,
      alignItems: 'center',
      zIndex: 100,
      margin: 10,
      // top: 10,
      // left: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    symbol: {
      color: Colors.primaryDark,
    },
  });

export default styles;
