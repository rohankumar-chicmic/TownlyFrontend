import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    heroText: {
      fontSize: 15,
      color: Colors.textSecondary,
    },
    heading: {
      fontSize: 20,
      fontWeight: '600',
      color: Colors.textPrimary,
    },
    smallText: {
      fontSize: 12,
      color: Colors.textSecondary,
    },
    containerStyle: {
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      padding: 8,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
    },
  });

export default styles;
