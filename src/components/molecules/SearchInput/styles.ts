import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginVertical: 15,
      borderColor: Colors.border,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: Colors.surface,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    input: {
      backgroundColor: Colors.surface,
    },
  });

export default styles;
