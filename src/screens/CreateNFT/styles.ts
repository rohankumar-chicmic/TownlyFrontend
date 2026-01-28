import {  StyleSheet } from 'react-native';

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
      margin: 30,
      marginBottom: 10,
      color: Colors.textPrimary,
    },
    heroText: {
      fontSize: 15,
      color: Colors.textSecondary,
    },
    heading: {
      fontSize: 20,
      fontWeight: '400',
      color: Colors.textPrimary,
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
    label: {
    marginBottom: 6,
    fontSize: 14,
    paddingHorizontal: 5,
  },
  input: {
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    borderWidth: 1,
  },
  counter: {
    alignSelf: 'flex-end',
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4,
  },
  });

export default styles;
