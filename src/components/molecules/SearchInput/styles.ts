import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: 50,
      marginVertical: 20,
      borderColor: Colors.border,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: Colors.surface,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    input: {
      height: '80%',
      width: '80%',
      backgroundColor: Colors.surface,
    },
  });

export default styles;
