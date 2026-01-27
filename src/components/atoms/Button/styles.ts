import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    base: {
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginHorizontal: 6,
    },

    sm: {
      height: 30,
      paddingHorizontal: 10,
    },
    md: {
      height: 44,
      paddingHorizontal: 16,
    },
    lg: {
      height: 52,
      paddingHorizontal: 20,
    },

    primary: {
      backgroundColor: Colors.primary,
    },
    secondary: {
      backgroundColor: Colors.background,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: Colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },

    text: {
      fontSize: 15,
      fontWeight: '600',
      color: Colors.background,
    },

    disabled: {
      opacity: 0.5,
    },
  });

export default styles;
