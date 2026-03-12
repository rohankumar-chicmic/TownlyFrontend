import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    label: {
      marginBottom: 6,
      fontSize: 14,
      paddingHorizontal: 5,
      color: Colors.textPrimary,
    },
    input: {
      // marginBottom: 2,
      textAlignVertical: 'center',
      borderRadius: 10,
      padding: 12,
      fontSize: 13,
      borderWidth: 1,
      width: '100%',
      backgroundColor: Colors.background,
    },
  });

export default styles;
