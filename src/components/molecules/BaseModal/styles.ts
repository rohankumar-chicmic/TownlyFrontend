import { ThemeColors } from '@theme/constants';
import { StyleSheet } from 'react-native';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
    },

    container: {
      backgroundColor: Colors.elevated,
      borderRadius: 30,
      width: '100%',
      padding: 20,
      paddingHorizontal: 40,
      alignSelf: 'center',
    },

    bottom: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },

    center: {
      position: 'absolute',
      top: '50%',
      transform: [{ translateY: -100 }],
    },
    closeButton: {
      height: 20,
      width: 20,
      borderRadius: 10,
      margin: 20,
      borderWidth: 1,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
  });

export default styles;
