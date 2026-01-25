import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      padding: 20,
      paddingBottom:0,
    },
    heroPrimarytext: {
      fontSize: 30,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    heroText: {
      fontSize: 15,
      marginBottom:15,
      marginTop:10,
      width: '90%',
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
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: Colors.border,
      borderTopWidth: 1,
      marginBottom: 15,
    },
  });

export default styles;
