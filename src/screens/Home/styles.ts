import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 20,
    },
    heroPrimarytext: {
      fontSize: 30,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    heroText: {
      fontSize: 18,
      marginVertical: 5,
      color: Colors.textSecondary,
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    smallText: {
      fontSize: 15,
      color: Colors.textSecondary,
    },
    containerStyle: {
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      padding: 10,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    headingSection: {
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: Colors.border,
      borderTopWidth: 1,
      paddingBottom: 10,
    },
  });

export default styles;
