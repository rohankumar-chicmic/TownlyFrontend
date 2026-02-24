import { ThemeColors } from '@theme/constants';
import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
      marginTop: height * 0.05,
    },
    iconCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      backgroundColor: Colors.surface,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
      color: Colors.textPrimary,
    },
    description: {
      fontSize: 15,
      textAlign: 'center',
      lineHeight: 22,
      color: Colors.textSecondary,
      marginBottom: 24,
    },
    button: {
      minWidth: 150,
    },
  });

export default styles;
