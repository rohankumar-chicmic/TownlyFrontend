import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    /* ---------- Base ---------- */
    base: {
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },

    /* ---------- Sizes ---------- */
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

    /* ---------- Variants ---------- */
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

    /* ---------- Pressed States ---------- */
    pressedPrimary: {
      opacity: 0.85,
    },
    pressedSecondary: {
      opacity: 0.85,
    },
    pressedOutline: {
      backgroundColor: Colors.primary + '10',
    },
    pressedGhost: {
      backgroundColor: Colors.primary + '10',
    },

    /* ---------- Text ---------- */
    text: {
      fontSize: 15,
      fontWeight: '600',
      color: Colors.background,
    },

    /* ---------- Disabled ---------- */
    disabled: {
      opacity: 0.5,
    },
  });

export default styles;
