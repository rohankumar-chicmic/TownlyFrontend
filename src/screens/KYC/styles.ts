import { Dimensions, StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      padding: 20,
      margin: 5,
    },
    heroPrimarytext: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      color: Colors.textPrimary,
    },
    heroText: {
      fontSize: 15,
      color: Colors.textSecondary,
    },
    smallText: {
      fontSize: 12,
      color: Colors.textSecondary,
    },
    containerStyle: {
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      padding: 8,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      width: '49%',
      marginBottom: 8,
    },
    dataPanel: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerSection: {
      paddingBottom: 16,
      marginBottom: 12,
    },
    counter: {
      alignSelf: 'flex-end',
      fontSize: 11,
      opacity: 0.6,
      marginTop: 4,
    },
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
      marginBottom: 5,
      fontSize: 14,
      paddingHorizontal: 5,
      color: Colors.textPrimary,
    },
    input: {
      borderRadius: 10,
      padding: 12,
      marginHorizontal: 1,
      borderWidth: 1,
      marginBottom: 15,
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
