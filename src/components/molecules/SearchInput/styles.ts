import { StyleSheet, Dimensions } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: 50,
      width: Dimensions.get('window').width * 0.8,
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
      borderBottomColor: Colors.primary,
      backgroundColor: Colors.surface,
      borderBottomWidth: 1,
    },
  });

export default styles;
