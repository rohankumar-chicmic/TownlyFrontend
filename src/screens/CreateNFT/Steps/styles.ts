import { Dimensions, StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    containerSurface: {
      padding: 15,
      borderRadius: 15,
      backgroundColor: Colors.elevated,
      borderColor: Colors.border,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    label: {
      marginBottom: 3,
      fontSize: 14,
      paddingHorizontal: 5,
      marginLeft: 5,
      color: Colors.textPrimary,
    },
    input: {
      borderRadius: 10,
      padding: 12,
      marginHorizontal: 5,
      marginTop: 6,
      borderWidth: 1,
      minHeight: Dimensions.get('screen').height * 0.047,
      backgroundColor: Colors.background,
      borderColor: Colors.border,
    },
    dropdownPlaceholder: {
      fontSize: 13,
      color: Colors.textMuted,
    },
    dropdownSelectedText: {
      fontSize: 13,
      color: Colors.textPrimary,
    },
    dropdownContainer: {
      borderRadius: 10,
      backgroundColor: Colors.background,
      borderWidth: 1,
      borderColor: Colors.border,
      marginTop: 5,
      overflow: 'hidden',
    },
    dropdownItemText: {
      fontSize: 13,
      color: Colors.textPrimary,
    },
    error: {
      color: Colors.warning,
      fontSize: 10,
      marginLeft: 5,
      marginBottom: 4,
    },
  });

export default styles;
