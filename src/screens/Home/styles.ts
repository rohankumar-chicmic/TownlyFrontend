import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 20,
    },

    card: {
      backgroundColor: Colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: Colors.border,
    },
    button: {
      backgroundColor: Colors.primary,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: Colors.background, // Dark text on light button for contrast
      fontWeight: 'bold',
    },
  });

export default styles;
