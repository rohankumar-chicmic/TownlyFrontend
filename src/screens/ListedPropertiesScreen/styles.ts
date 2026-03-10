import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      paddingHorizontal: 20,
    },
    heroPrimarytext: {
      fontSize: 40,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    heroText: {
      fontSize: 20,
      color: Colors.textPrimary,
    },
    heading: {
      fontSize: 30,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    smallText: {
      fontSize: 15,
      color: Colors.textSecondary,
    },
    tag: {
      margin: 10,
      alignSelf: 'flex-start',
      backgroundColor: Colors.surface,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
    },
    loadingContainer: {
      width: '100%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    loadingText: {
      textAlign: 'center',
      color: Colors.textSecondary,
    },
    tagText: {
      color: Colors.textSecondary,
      fontSize: 12,
    },
  });

export default styles;
